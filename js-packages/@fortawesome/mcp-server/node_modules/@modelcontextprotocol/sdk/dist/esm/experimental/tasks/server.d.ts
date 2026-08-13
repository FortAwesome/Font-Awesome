/**
 * Experimental server task features for MCP SDK.
 * WARNING: These APIs are experimental and may change without notice.
 *
 * @experimental
 */
import type { Server } from '../../server/index.js';
import type { RequestOptions } from '../../shared/protocol.js';
import type { ResponseMessage } from '../../shared/responseMessage.js';
import type { AnySchema, SchemaOutput } from '../../server/zod-compat.js';
import type { ServerRequest, Notification, Request, Result, GetTaskResult, ListTasksResult, CancelTaskResult, CreateMessageRequestParams, CreateMessageResult, ElicitRequestFormParams, ElicitRequestURLParams, ElicitResult } from '../../types.js';
/**
 * Experimental task features for low-level MCP servers.
 *
 * Access via `server.experimental.tasks`:
 * ```typescript
 * const stream = server.experimental.tasks.requestStream(request, schema, options);
 * ```
 *
 * For high-level server usage with task-based tools, use `McpServer.experimental.tasks` instead.
 *
 * @experimental
 */
export declare class ExperimentalServerTasks<RequestT extends Request = Request, NotificationT extends Notification = Notification, ResultT extends Result = Result> {
    private readonly _server;
    constructor(_server: Server<RequestT, NotificationT, ResultT>);
    /**
     * Sends a request and returns an AsyncGenerator that yields response messages.
     * The generator is guaranteed to end with either a 'result' or 'error' message.
     *
     * This method provides streaming access to request processing, allowing you to
     * observe intermediate task status updates for task-augmented requests.
     *
     * @param request - The request to send
     * @param resultSchema - Zod schema for validating the result
     * @param options - Optional request options (timeout, signal, task creation params, etc.)
     * @returns AsyncGenerator that yields ResponseMessage objects
     *
     * @experimental
     */
    requestStream<T extends AnySchema>(request: ServerRequest | RequestT, resultSchema: T, options?: RequestOptions): AsyncGenerator<ResponseMessage<SchemaOutput<T>>, void, void>;
    /**
     * Sends a sampling request and returns an AsyncGenerator that yields response messages.
     * The generator is guaranteed to end with either a 'result' or 'error' message.
     *
     * For task-augmented requests, yields 'taskCreated' and 'taskStatus' messages
     * before the final result.
     *
     * @example
     * ```typescript
     * const stream = server.experimental.tasks.createMessageStream({
     *     messages: [{ role: 'user', content: { type: 'text', text: 'Hello' } }],
     *     maxTokens: 100
     * }, {
     *     onprogress: (progress) => {
     *         // Handle streaming tokens via progress notifications
     *         console.log('Progress:', progress.message);
     *     }
     * });
     *
     * for await (const message of stream) {
     *     switch (message.type) {
     *         case 'taskCreated':
     *             console.log('Task created:', message.task.taskId);
     *             break;
     *         case 'taskStatus':
     *             console.log('Task status:', message.task.status);
     *             break;
     *         case 'result':
     *             console.log('Final result:', message.result);
     *             break;
     *         case 'error':
     *             console.error('Error:', message.error);
     *             break;
     *     }
     * }
     * ```
     *
     * @param params - The sampling request parameters
     * @param options - Optional request options (timeout, signal, task creation params, onprogress, etc.)
     * @returns AsyncGenerator that yields ResponseMessage objects
     *
     * @experimental
     */
    createMessageStream(params: CreateMessageRequestParams, options?: RequestOptions): AsyncGenerator<ResponseMessage<CreateMessageResult>, void, void>;
    /**
     * Sends an elicitation request and returns an AsyncGenerator that yields response messages.
     * The generator is guaranteed to end with either a 'result' or 'error' message.
     *
     * For task-augmented requests (especially URL-based elicitation), yields 'taskCreated'
     * and 'taskStatus' messages before the final result.
     *
     * @example
     * ```typescript
     * const stream = server.experimental.tasks.elicitInputStream({
     *     mode: 'url',
     *     message: 'Please authenticate',
     *     elicitationId: 'auth-123',
     *     url: 'https://example.com/auth'
     * }, {
     *     task: { ttl: 300000 } // Task-augmented for long-running auth flow
     * });
     *
     * for await (const message of stream) {
     *     switch (message.type) {
     *         case 'taskCreated':
     *             console.log('Task created:', message.task.taskId);
     *             break;
     *         case 'taskStatus':
     *             console.log('Task status:', message.task.status);
     *             break;
     *         case 'result':
     *             console.log('User action:', message.result.action);
     *             break;
     *         case 'error':
     *             console.error('Error:', message.error);
     *             break;
     *     }
     * }
     * ```
     *
     * @param params - The elicitation request parameters
     * @param options - Optional request options (timeout, signal, task creation params, etc.)
     * @returns AsyncGenerator that yields ResponseMessage objects
     *
     * @experimental
     */
    elicitInputStream(params: ElicitRequestFormParams | ElicitRequestURLParams, options?: RequestOptions): AsyncGenerator<ResponseMessage<ElicitResult>, void, void>;
    /**
     * Gets the current status of a task.
     *
     * @param taskId - The task identifier
     * @param options - Optional request options
     * @returns The task status
     *
     * @experimental
     */
    getTask(taskId: string, options?: RequestOptions): Promise<GetTaskResult>;
    /**
     * Retrieves the result of a completed task.
     *
     * @param taskId - The task identifier
     * @param resultSchema - Zod schema for validating the result
     * @param options - Optional request options
     * @returns The task result
     *
     * @experimental
     */
    getTaskResult<T extends AnySchema>(taskId: string, resultSchema?: T, options?: RequestOptions): Promise<SchemaOutput<T>>;
    /**
     * Lists tasks with optional pagination.
     *
     * @param cursor - Optional pagination cursor
     * @param options - Optional request options
     * @returns List of tasks with optional next cursor
     *
     * @experimental
     */
    listTasks(cursor?: string, options?: RequestOptions): Promise<ListTasksResult>;
    /**
     * Cancels a running task.
     *
     * @param taskId - The task identifier
     * @param options - Optional request options
     *
     * @experimental
     */
    cancelTask(taskId: string, options?: RequestOptions): Promise<CancelTaskResult>;
}
//# sourceMappingURL=server.d.ts.map