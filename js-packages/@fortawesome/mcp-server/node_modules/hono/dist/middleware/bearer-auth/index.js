// src/middleware/bearer-auth/index.ts
import { HTTPException } from "../../http-exception.js";
import { timingSafeEqual } from "../../utils/buffer.js";
var TOKEN_STRINGS = "[A-Za-z0-9._~+/-]+=*";
var PREFIX = "Bearer";
var HEADER = "Authorization";
var bearerAuth = (options) => {
  if (!("token" in options || "verifyToken" in options)) {
    throw new Error('bearer auth middleware requires options for "token"');
  }
  if (!options.realm) {
    options.realm = "";
  }
  if (options.prefix === void 0) {
    options.prefix = PREFIX;
  }
  const realm = options.realm?.replace(/"/g, '\\"');
  const prefix = options.prefix;
  const tokenRegexp = new RegExp(`^${TOKEN_STRINGS}$`);
  const wwwAuthenticatePrefix = prefix === "" ? "" : `${prefix} `;
  const throwHTTPException = async (c, status, wwwAuthenticateHeader, messageOption) => {
    const wwwAuthenticateHeaderValue = typeof wwwAuthenticateHeader === "function" ? await wwwAuthenticateHeader(c) : wwwAuthenticateHeader;
    const headers = {
      "WWW-Authenticate": typeof wwwAuthenticateHeaderValue === "string" ? wwwAuthenticateHeaderValue : `${wwwAuthenticatePrefix}${Object.entries(wwwAuthenticateHeaderValue).map(([key, value]) => `${key}="${value}"`).join(",")}`
    };
    const responseMessage = typeof messageOption === "function" ? await messageOption(c) : messageOption;
    const res = typeof responseMessage === "string" ? new Response(responseMessage, { status, headers }) : new Response(JSON.stringify(responseMessage), {
      status,
      headers: {
        ...headers,
        "content-type": "application/json"
      }
    });
    throw new HTTPException(status, { res });
  };
  return async function bearerAuth2(c, next) {
    const headerToken = c.req.header(options.headerName || HEADER);
    if (!headerToken) {
      await throwHTTPException(
        c,
        401,
        options.noAuthenticationHeader?.wwwAuthenticateHeader || `${wwwAuthenticatePrefix}realm="${realm}"`,
        options.noAuthenticationHeader?.message || options.noAuthenticationHeaderMessage || "Unauthorized"
      );
    } else {
      let tokenValue;
      if (prefix === "") {
        tokenValue = headerToken;
      } else {
        const headerLower = headerToken.toLowerCase();
        const prefixLower = prefix.toLowerCase();
        if (headerLower.startsWith(prefixLower) && headerToken[prefix.length] === " ") {
          tokenValue = headerToken.slice(prefix.length).trimStart();
        }
      }
      if (!tokenValue || !tokenRegexp.test(tokenValue)) {
        await throwHTTPException(
          c,
          400,
          options.invalidAuthenticationHeader?.wwwAuthenticateHeader || `${wwwAuthenticatePrefix}error="invalid_request"`,
          options.invalidAuthenticationHeader?.message || options.invalidAuthenticationHeaderMessage || "Bad Request"
        );
      } else {
        let equal = false;
        if ("verifyToken" in options) {
          equal = await options.verifyToken(tokenValue, c);
        } else if (typeof options.token === "string") {
          equal = await timingSafeEqual(options.token, tokenValue, options.hashFunction);
        } else if (Array.isArray(options.token) && options.token.length > 0) {
          for (const token of options.token) {
            if (await timingSafeEqual(token, tokenValue, options.hashFunction)) {
              equal = true;
              break;
            }
          }
        }
        if (!equal) {
          await throwHTTPException(
            c,
            401,
            options.invalidToken?.wwwAuthenticateHeader || `${wwwAuthenticatePrefix}error="invalid_token"`,
            options.invalidToken?.message || options.invalidTokenMessage || "Unauthorized"
          );
        }
      }
    }
    await next();
  };
};
export {
  bearerAuth
};
