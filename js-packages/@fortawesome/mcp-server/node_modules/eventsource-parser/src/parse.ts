/**
 * EventSource/Server-Sent Events parser
 * @see https://html.spec.whatwg.org/multipage/server-sent-events.html
 */
import {ParseError} from './errors.ts'
import type {EventSourceParser, ParserCallbacks} from './types.ts'

// ASCII codes used in the hot parsing paths.
const LF = 10
const CR = 13
const SPACE = 32

// oxlint-disable-next-line no-unused-vars
function noop(_arg: unknown) {
  // intentional noop
}

/**
 * Creates a new EventSource parser.
 *
 * @param callbacks - Callbacks to invoke on different parsing events:
 *   - `onEvent` when a new event is parsed
 *   - `onError` when an error occurs
 *   - `onRetry` when a new reconnection interval has been sent from the server
 *   - `onComment` when a comment is encountered in the stream
 *
 * @returns A new EventSource parser, with `parse` and `reset` methods.
 * @public
 */
export function createParser(callbacks: ParserCallbacks): EventSourceParser {
  if (typeof callbacks === 'function') {
    throw new TypeError(
      '`callbacks` must be an object, got a function instead. Did you mean `{onEvent: fn}`?',
    )
  }

  const {onEvent = noop, onError = noop, onRetry = noop, onComment} = callbacks

  // Trailing bytes from prior `feed()` calls that did not yet form a complete line.
  // Stored as an array of fragments and only joined when a line terminator arrives.
  // Concatenating per-feed (`prefix + chunk`) is O(N²) when a single SSE line spans
  // many chunks (e.g. a large `data:` payload streamed in tiny slices, or an MCP-style
  // server that emits one giant content block). Buffering as fragments + joining once
  // makes the same workload linear.
  const pendingFragments: string[] = []

  let isFirstChunk = true
  let id: string | undefined
  let data = ''
  let dataLines = 0
  let eventType: string | undefined

  /**
   * Feeds a chunk of the SSE stream to the parser. Any trailing bytes that do
   * not yet form a complete line are held back and prepended to the next chunk,
   * so callers can pass arbitrary slices of the stream without worrying about
   * line boundaries.
   *
   * Per the SSE spec, a UTF-8 BOM (0xEF 0xBB 0xBF) at the start of the very
   * first chunk is stripped before parsing.
   *
   * @see https://html.spec.whatwg.org/multipage/server-sent-events.html#parsing-an-event-stream
   */
  function feed(chunk: string) {
    if (isFirstChunk) {
      isFirstChunk = false
      // Match and strip UTF-8 BOM from the start of the stream, if present.
      // (Per the spec, this is only valid at the very start of the stream)
      if (
        chunk.charCodeAt(0) === 0xef &&
        chunk.charCodeAt(1) === 0xbb &&
        chunk.charCodeAt(2) === 0xbf
      ) {
        chunk = chunk.slice(3)
      }
    }

    // Hot path: no buffered prefix from a prior partial line. Hand the chunk
    // straight to `processLines`, exactly like the original implementation.
    // Zero new work in the common case (every chunk ends with `\n\n`).
    if (pendingFragments.length === 0) {
      const trailing = processLines(chunk)
      if (trailing !== '') pendingFragments.push(trailing)
      return
    }

    // We have a buffered prefix. If this chunk also has no terminator, append
    // to the buffer without concatenating — that's the O(N²) trap we're
    // avoiding (large single `data:` payload split across many tiny chunks).
    if (chunk.indexOf('\n') === -1 && chunk.indexOf('\r') === -1) {
      pendingFragments.push(chunk)
      return
    }

    // Terminator arrived. Join the accumulated fragments + this chunk once,
    // process, and buffer any new trailing partial line.
    pendingFragments.push(chunk)
    const input = pendingFragments.join('')
    pendingFragments.length = 0
    const trailing = processLines(input)
    if (trailing !== '') pendingFragments.push(trailing)
  }

  /**
   * Splits `chunk` into SSE lines and dispatches each to the appropriate handler.
   * Returns any trailing bytes that did not terminate with a line break, so the
   * caller can prepend them to the next chunk.
   *
   * The SSE spec permits three line terminators: `\n`, `\r`, and `\r\n`. Real-world
   * streams almost always use plain `\n`, so we take a fast path when no `\r` is
   * present in the chunk. The slow path is spec-correct but does more work per line.
   */
  function processLines(chunk: string): string {
    let searchIndex = 0

    // Fast path: LF-only chunk (the common case for typical SSE servers).
    // We can scan forward with a single `indexOf('\n')` per line and inline
    // the hot-path branches for `data:` and `event:` without the CR bookkeeping
    // the slow path needs.
    if (chunk.indexOf('\r') === -1) {
      let lfIndex = chunk.indexOf('\n', searchIndex)
      while (lfIndex !== -1) {
        // Blank line: end-of-event marker. Dispatch the accumulated event (if any)
        // and reset the buffered fields. This is hoisted out of `parseLine` because
        // it's the single most common line shape after `data:` lines.
        if (searchIndex === lfIndex) {
          if (dataLines > 0) {
            onEvent({id, event: eventType, data})
          }
          id = undefined
          data = ''
          dataLines = 0
          eventType = undefined
          searchIndex = lfIndex + 1
          lfIndex = chunk.indexOf('\n', searchIndex)
          continue
        }
        const firstCharCode = chunk.charCodeAt(searchIndex)
        if (isDataPrefix(chunk, searchIndex, firstCharCode)) {
          // `data:` line — append the value to the event's data buffer.
          // 'data:'.length === 5, 'data: '.length === 6
          const valueStart =
            chunk.charCodeAt(searchIndex + 5) === SPACE ? searchIndex + 6 : searchIndex + 5
          const value = chunk.slice(valueStart, lfIndex)
          // Fast path within a fast path: if this is the first data line AND the
          // next char is another LF (i.e. `data:foo\n\n`), dispatch immediately
          // without ever writing to the `data` buffer. This is the shape of a
          // typical single-line SSE event (ChatGPT-style streams, etc.) and is
          // hot enough to be worth the duplication.
          if (dataLines === 0 && chunk.charCodeAt(lfIndex + 1) === LF) {
            onEvent({id, event: eventType, data: value})
            id = undefined
            data = ''
            eventType = undefined
            searchIndex = lfIndex + 2
            lfIndex = chunk.indexOf('\n', searchIndex)
            continue
          }
          // Multi-line data: concatenate with newline separator per spec.
          data = dataLines === 0 ? value : `${data}\n${value}`
          dataLines++
        } else if (isEventPrefix(chunk, searchIndex, firstCharCode)) {
          // `event:` line — set the event type for the next dispatch. Per spec,
          // an empty value resets `event type` to its default (undefined here).
          // 'event:'.length === 6, 'event: '.length === 7
          eventType =
            chunk.slice(
              chunk.charCodeAt(searchIndex + 6) === SPACE ? searchIndex + 7 : searchIndex + 6,
              lfIndex,
            ) || undefined
        } else {
          // Everything else: `id:`, `retry:`, comment lines (`:` prefix), unknown
          // fields, or malformed lines. These are rarer and go through the full
          // per-line parser, which handles the SSE field grammar in detail.
          parseLine(chunk, searchIndex, lfIndex)
        }
        searchIndex = lfIndex + 1
        lfIndex = chunk.indexOf('\n', searchIndex)
      }
      return chunk.slice(searchIndex)
    }

    // Slow path: the chunk contains at least one `\r`, so lines may be terminated
    // by `\r`, `\n`, or `\r\n`. We locate the next terminator by looking at both
    // the nearest `\r` and `\n` and picking whichever comes first.
    while (searchIndex < chunk.length) {
      const crIndex = chunk.indexOf('\r', searchIndex)
      const lfIndex = chunk.indexOf('\n', searchIndex)

      let lineEnd = -1
      if (crIndex !== -1 && lfIndex !== -1) {
        lineEnd = crIndex < lfIndex ? crIndex : lfIndex
      } else if (crIndex !== -1) {
        // A trailing `\r` at the very end of the chunk is ambiguous: it could be
        // a bare-CR terminator, or the first half of a `\r\n` whose `\n` arrives
        // in the next chunk. Defer until we see more input.
        if (crIndex === chunk.length - 1) {
          lineEnd = -1
        } else {
          lineEnd = crIndex
        }
      } else if (lfIndex !== -1) {
        lineEnd = lfIndex
      }

      if (lineEnd === -1) {
        break
      }

      parseLine(chunk, searchIndex, lineEnd)
      searchIndex = lineEnd + 1
      // If we just consumed a `\r` and the next char is `\n`, skip it so the
      // pair is treated as a single terminator rather than an empty line.
      if (chunk.charCodeAt(searchIndex - 1) === CR && chunk.charCodeAt(searchIndex) === LF) {
        searchIndex++
      }
    }

    return chunk.slice(searchIndex)
  }

  function parseLine(chunk: string, start: number, end: number) {
    if (start === end) {
      dispatchEvent()
      return
    }

    const firstCharCode = chunk.charCodeAt(start)

    if (isDataPrefix(chunk, start, firstCharCode)) {
      // 'data:'.length === 5, 'data: '.length === 6
      const valueStart = chunk.charCodeAt(start + 5) === SPACE ? start + 6 : start + 5
      const value = chunk.slice(valueStart, end)
      data = dataLines === 0 ? value : `${data}\n${value}`
      dataLines++
      return
    }

    if (isEventPrefix(chunk, start, firstCharCode)) {
      // 'event:'.length === 6, 'event: '.length === 7
      eventType =
        chunk.slice(chunk.charCodeAt(start + 6) === SPACE ? start + 7 : start + 6, end) || undefined
      return
    }

    // Fast path for "id:" — 'i' = 105, 'd' = 100, ':' = 58
    if (
      firstCharCode === 105 &&
      chunk.charCodeAt(start + 1) === 100 &&
      chunk.charCodeAt(start + 2) === 58
    ) {
      // 'id:'.length === 3, 'id: '.length === 4
      const value = chunk.slice(chunk.charCodeAt(start + 3) === SPACE ? start + 4 : start + 3, end)
      id = value.includes('\0') ? undefined : value
      return
    }

    // Comment line — ':' = 58
    if (firstCharCode === 58) {
      if (onComment) {
        const line = chunk.slice(start, end)
        // skip ':' (+1), or ': ' (+2) when a space follows
        onComment(line.slice(chunk.charCodeAt(start + 1) === SPACE ? 2 : 1))
      }
      return
    }

    const line = chunk.slice(start, end)
    const fieldSeparatorIndex = line.indexOf(':')
    if (fieldSeparatorIndex === -1) {
      processField(line, '', line)
      return
    }

    const field = line.slice(0, fieldSeparatorIndex)
    // skip ':' (+1), or ': ' (+2) when a space follows
    const offset = line.charCodeAt(fieldSeparatorIndex + 1) === SPACE ? 2 : 1
    const value = line.slice(fieldSeparatorIndex + offset)
    processField(field, value, line)
  }

  function processField(field: string, value: string, line: string) {
    // Field names must be compared literally, with no case folding performed.
    switch (field) {
      case 'event':
        // Set the `event type` buffer to field value
        eventType = value || undefined
        break
      case 'data':
        data = dataLines === 0 ? value : `${data}\n${value}`
        dataLines++
        break
      case 'id':
        // If the field value does not contain U+0000 NULL, then set the `ID` buffer to
        // the field value. Otherwise, ignore the field.
        id = value.includes('\0') ? undefined : value
        break
      case 'retry':
        // If the field value consists of only ASCII digits, then interpret the field value as an
        // integer in base ten, and set the event stream's reconnection time to that integer.
        // Otherwise, ignore the field.
        if (/^\d+$/.test(value)) {
          onRetry(parseInt(value, 10))
        } else {
          onError(
            new ParseError(`Invalid \`retry\` value: "${value}"`, {
              type: 'invalid-retry',
              value,
              line,
            }),
          )
        }
        break
      default:
        // Otherwise, the field is ignored.
        onError(
          new ParseError(
            `Unknown field "${field.length > 20 ? `${field.slice(0, 20)}…` : field}"`,
            {type: 'unknown-field', field, value, line},
          ),
        )
        break
    }
  }

  function dispatchEvent() {
    if (dataLines > 0) {
      onEvent({
        id,
        event: eventType,
        data,
      })
    }

    id = undefined
    data = ''
    dataLines = 0
    eventType = undefined
  }

  function reset(options: {consume?: boolean} = {}) {
    if (options.consume && pendingFragments.length > 0) {
      const incompleteLine = pendingFragments.join('')
      parseLine(incompleteLine, 0, incompleteLine.length)
    }

    isFirstChunk = true
    id = undefined
    data = ''
    dataLines = 0
    eventType = undefined
    pendingFragments.length = 0
  }

  return {feed, reset}
}

/**
 * Checks if `chunk` starts with the literal `data:` at index `i`.
 *
 * Equivalent to `chunk.startsWith('data:', i)`, but benchmarks show this
 * hand-unrolled char-code comparison is ~20% faster on common event types.
 * The caller passes `firstCharCode` (the code at `i`) so it can be reused
 * across prefix checks.
 *
 * ASCII: 'd' = 100, 'a' = 97, 't' = 116, 'a' = 97, ':' = 58
 */
function isDataPrefix(chunk: string, i: number, firstCharCode: number): boolean {
  return (
    firstCharCode === 100 &&
    chunk.charCodeAt(i + 1) === 97 &&
    chunk.charCodeAt(i + 2) === 116 &&
    chunk.charCodeAt(i + 3) === 97 &&
    chunk.charCodeAt(i + 4) === 58
  )
}

/**
 * Checks if `chunk` starts with the literal `event:` at index `i`.
 *
 * See {@link isDataPrefix} for why this is hand-unrolled rather than using
 * `String.prototype.startsWith`.
 *
 * ASCII: 'e' = 101, 'v' = 118, 'e' = 101, 'n' = 110, 't' = 116, ':' = 58
 */
function isEventPrefix(chunk: string, i: number, firstCharCode: number): boolean {
  return (
    firstCharCode === 101 &&
    chunk.charCodeAt(i + 1) === 118 &&
    chunk.charCodeAt(i + 2) === 101 &&
    chunk.charCodeAt(i + 3) === 110 &&
    chunk.charCodeAt(i + 4) === 116 &&
    chunk.charCodeAt(i + 5) === 58
  )
}
