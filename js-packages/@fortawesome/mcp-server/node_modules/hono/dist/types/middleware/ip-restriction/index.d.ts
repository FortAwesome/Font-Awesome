/**
 * IP Restriction Middleware for Hono
 * @module
 */
import type { Context, MiddlewareHandler } from '../..';
import type { AddressType, GetConnInfo } from '../../helper/conninfo';
/**
 * Function to get IP Address
 */
type GetIPAddr = GetConnInfo | ((c: Context) => string);
export type IPRestrictionRule = string | ((addr: {
    addr: string;
    type: AddressType;
}) => boolean);
/**
 * Rules for IP Restriction Middleware
 */
export interface IPRestrictionRules {
    denyList?: IPRestrictionRule[];
    allowList?: IPRestrictionRule[];
}
/**
 * IP Restriction Middleware for Hono.
 *
 * @see {@link https://hono.dev/docs/middleware/builtin/ip-restriction}
 *
 * @param {GetConnInfo | ((c: Context) => string)} getIP - A function to retrieve the client IP address. Use `getConnInfo` from the appropriate runtime adapter.
 * @param {IPRestrictionRules} rules - An object with optional `denyList` and `allowList` arrays of IP rules. Each rule can be a static IP, a CIDR range, or a custom function.
 * @param {(remote: { addr: string; type: AddressType }, c: Context) => Response | Promise<Response>} [onError] - Optional custom handler invoked when a request is blocked. Defaults to returning a 403 Forbidden response.
 * @returns {MiddlewareHandler} The middleware handler function.
 *
 * @example
 * ```ts
 * import { Hono } from 'hono'
 * import { ipRestriction } from 'hono/ip-restriction'
 * import { getConnInfo } from 'hono/cloudflare-workers'
 *
 * const app = new Hono()
 *
 * app.use(
 *   '*',
 *   ipRestriction(getConnInfo, {
 *     // Block a specific IP and an entire subnet
 *     denyList: ['192.168.0.5', '10.0.0.0/8'],
 *     // Only allow requests from localhost and a private range
 *     allowList: ['127.0.0.1', '::1', '192.168.1.0/24'],
 *   })
 * )
 *
 * // With a custom error handler
 * app.use(
 *   '/admin/*',
 *   ipRestriction(
 *     getConnInfo,
 *     { allowList: ['203.0.113.0/24'] },
 *     (remote, c) => c.text(`Access denied for ${remote.addr}`, 403)
 *   )
 * )
 *
 * app.get('/', (c) => c.text('Hello!'))
 * ```
 */
export declare const ipRestriction: (getIP: GetIPAddr, { denyList, allowList }: IPRestrictionRules, onError?: (remote: {
    addr: string;
    type: AddressType;
}, c: Context) => Response | Promise<Response>) => MiddlewareHandler;
export {};
