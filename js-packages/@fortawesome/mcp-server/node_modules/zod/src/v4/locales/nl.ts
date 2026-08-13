import type { $ZodStringFormats } from "../core/checks.js";
import type * as errors from "../core/errors.js";
import * as util from "../core/util.js";

const error: () => errors.$ZodErrorMap = () => {
  const Sizable: Record<string, { unit: string; verb: string }> = {
    string: { unit: "tekens", verb: "heeft" },
    file: { unit: "bytes", verb: "heeft" },
    array: { unit: "elementen", verb: "heeft" },
    set: { unit: "elementen", verb: "heeft" },
  };

  function getSizing(origin: string): { unit: string; verb: string } | null {
    return Sizable[origin] ?? null;
  }

  const FormatDictionary: {
    [k in $ZodStringFormats | (string & {})]?: string;
  } = {
    regex: "invoer",
    email: "emailadres",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum en tijd",
    date: "ISO datum",
    time: "ISO tijd",
    duration: "ISO duur",
    ipv4: "IPv4-adres",
    ipv6: "IPv6-adres",
    cidrv4: "IPv4-bereik",
    cidrv6: "IPv6-bereik",
    base64: "base64-gecodeerde tekst",
    base64url: "base64 URL-gecodeerde tekst",
    json_string: "JSON string",
    e164: "E.164-nummer",
    jwt: "JWT",
    template_literal: "invoer",
  };

  const TypeDictionary: {
    [k in errors.$ZodInvalidTypeExpected | (string & {})]?: string;
  } = {
    nan: "NaN",
    number: "getal",
  };

  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = util.parsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Ongeldige invoer: verwacht instanceof ${issue.expected}, ontving ${received}`;
        }
        return `Ongeldige invoer: verwacht ${expected}, ontving ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1) return `Ongeldige invoer: verwacht ${util.stringifyPrimitive(issue.values[0])}`;
        return `Ongeldige optie: verwacht één van ${util.joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        const longName = issue.origin === "date" ? "laat" : issue.origin === "string" ? "lang" : "groot";

        if (sizing)
          return `Te ${longName}: verwacht dat ${issue.origin ?? "waarde"} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elementen"} ${sizing.verb}`;
        return `Te ${longName}: verwacht dat ${issue.origin ?? "waarde"} ${adj}${issue.maximum.toString()} is`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        const shortName = issue.origin === "date" ? "vroeg" : issue.origin === "string" ? "kort" : "klein";

        if (sizing) {
          return `Te ${shortName}: verwacht dat ${issue.origin} ${adj}${issue.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
        }

        return `Te ${shortName}: verwacht dat ${issue.origin} ${adj}${issue.minimum.toString()} is`;
      }
      case "invalid_format": {
        const _issue = issue as errors.$ZodStringFormatIssues;
        if (_issue.format === "starts_with") {
          return `Ongeldige tekst: moet met "${_issue.prefix}" beginnen`;
        }
        if (_issue.format === "ends_with") return `Ongeldige tekst: moet op "${_issue.suffix}" eindigen`;
        if (_issue.format === "includes") return `Ongeldige tekst: moet "${_issue.includes}" bevatten`;
        if (_issue.format === "regex") return `Ongeldige tekst: moet overeenkomen met patroon ${_issue.pattern}`;
        return `Ongeldig: ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Ongeldig getal: moet een veelvoud van ${issue.divisor} zijn`;
      case "unrecognized_keys":
        return `Onbekende key${issue.keys.length > 1 ? "s" : ""}: ${util.joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Ongeldige key in ${issue.origin}`;
      case "invalid_union":
        return "Ongeldige invoer";
      case "invalid_element":
        return `Ongeldige waarde in ${issue.origin}`;
      default:
        return `Ongeldige invoer`;
    }
  };
};

export default function (): { localeError: errors.$ZodErrorMap } {
  return {
    localeError: error(),
  };
}
