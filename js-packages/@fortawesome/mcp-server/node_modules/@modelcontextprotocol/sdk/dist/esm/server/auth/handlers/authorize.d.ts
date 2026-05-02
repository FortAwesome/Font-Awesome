import { RequestHandler } from 'express';
import { OAuthServerProvider } from '../provider.js';
import { Options as RateLimitOptions } from 'express-rate-limit';
export type AuthorizationHandlerOptions = {
    provider: OAuthServerProvider;
    /**
     * Rate limiting configuration for the authorization endpoint.
     * Set to false to disable rate limiting for this endpoint.
     */
    rateLimit?: Partial<RateLimitOptions> | false;
};
/**
 * Validates a requested redirect_uri against a registered one.
 *
 * Per RFC 8252 §7.3 (OAuth 2.0 for Native Apps), authorization servers MUST
 * allow any port for loopback redirect URIs (localhost, 127.0.0.1, [::1]) to
 * accommodate native clients that obtain an ephemeral port from the OS. For
 * non-loopback URIs, exact match is required.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc8252#section-7.3
 */
export declare function redirectUriMatches(requested: string, registered: string): boolean;
export declare function authorizationHandler({ provider, rateLimit: rateLimitConfig }: AuthorizationHandlerOptions): RequestHandler;
//# sourceMappingURL=authorize.d.ts.map