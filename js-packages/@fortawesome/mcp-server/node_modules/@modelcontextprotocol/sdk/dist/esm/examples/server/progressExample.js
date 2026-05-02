/**
 * Example: Progress notifications over stdio.
 *
 * Demonstrates a tool that reports progress to the client while processing.
 *
 * Run:
 *   npx tsx src/examples/server/progressExample.ts
 *
 * Then connect a client with an `onprogress` callback (see docs/protocol.md).
 */
import { McpServer } from '../../server/mcp.js';
import { StdioServerTransport } from '../../server/stdio.js';
import { z } from 'zod';
const server = new McpServer({ name: 'progress-example', version: '1.0.0' }, { capabilities: { logging: {} } });
server.registerTool('count', {
    description: 'Count to N with progress updates',
    inputSchema: { n: z.number().int().min(1).max(100) }
}, async ({ n }, extra) => {
    for (let i = 1; i <= n; i++) {
        if (extra.signal.aborted) {
            return { content: [{ type: 'text', text: `Cancelled at ${i}` }], isError: true };
        }
        if (extra._meta?.progressToken !== undefined) {
            await extra.sendNotification({
                method: 'notifications/progress',
                params: {
                    progressToken: extra._meta.progressToken,
                    progress: i,
                    total: n,
                    message: `Counting: ${i}/${n}`
                }
            });
        }
        // Simulate work
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    return { content: [{ type: 'text', text: `Counted to ${n}` }] };
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}
main().catch(error => {
    console.error('Server error:', error);
    process.exit(1);
});
//# sourceMappingURL=progressExample.js.map