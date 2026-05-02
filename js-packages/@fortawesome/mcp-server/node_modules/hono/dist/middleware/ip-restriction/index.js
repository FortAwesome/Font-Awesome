// src/middleware/ip-restriction/index.ts
import { HTTPException } from "../../http-exception.js";
import {
  convertIPv4MappedIPv6ToIPv4,
  convertIPv4ToBinary,
  convertIPv6BinaryToString,
  convertIPv6ToBinary,
  distinctRemoteAddr,
  isIPv4MappedIPv6
} from "../../utils/ipaddr.js";
var IS_CIDR_NOTATION_REGEX = /\/[0-9]{0,3}$/;
var buildMatcher = (rules) => {
  const functionRules = [];
  const staticRules = /* @__PURE__ */ new Set();
  const cidrRules = [];
  for (let rule of rules) {
    if (rule === "*") {
      return () => true;
    } else if (typeof rule === "function") {
      functionRules.push(rule);
    } else {
      if (IS_CIDR_NOTATION_REGEX.test(rule)) {
        const separatedRule = rule.split("/");
        const addrStr = separatedRule[0];
        const type2 = distinctRemoteAddr(addrStr);
        if (type2 === void 0) {
          throw new TypeError(`Invalid rule: ${rule}`);
        }
        let isIPv4 = type2 === "IPv4";
        let prefix = parseInt(separatedRule[1]);
        if (isIPv4 ? prefix === 32 : prefix === 128) {
          rule = addrStr;
        } else {
          let addr = (isIPv4 ? convertIPv4ToBinary : convertIPv6ToBinary)(addrStr);
          if (type2 === "IPv6" && isIPv4MappedIPv6(addr) && prefix >= 96) {
            isIPv4 = true;
            addr = convertIPv4MappedIPv6ToIPv4(addr);
            prefix -= 96;
          }
          const mask = (1n << BigInt(prefix)) - 1n << BigInt((isIPv4 ? 32 : 128) - prefix);
          cidrRules.push([isIPv4, addr & mask, mask]);
          continue;
        }
      }
      const type = distinctRemoteAddr(rule);
      if (type === void 0) {
        throw new TypeError(`Invalid rule: ${rule}`);
      }
      if (type === "IPv4") {
        staticRules.add(rule);
        staticRules.add(`::ffff:${rule}`);
      } else {
        const ipv6binary = convertIPv6ToBinary(rule);
        const ipv6Addr = convertIPv6BinaryToString(ipv6binary);
        staticRules.add(ipv6Addr);
        if (isIPv4MappedIPv6(ipv6binary)) {
          staticRules.add(ipv6Addr.substring(7));
        }
      }
    }
  }
  return (remote) => {
    if (staticRules.has(remote.addr)) {
      return true;
    }
    const remoteAddr = remote.binaryAddr ||= (remote.isIPv4 ? convertIPv4ToBinary : convertIPv6ToBinary)(remote.addr);
    const remoteIPv4Addr = remote.isIPv4 || isIPv4MappedIPv6(remoteAddr) ? remote.isIPv4 ? remoteAddr : convertIPv4MappedIPv6ToIPv4(remoteAddr) : void 0;
    for (const [isIPv4, addr, mask] of cidrRules) {
      if (isIPv4) {
        if (remoteIPv4Addr === void 0) {
          continue;
        }
        if ((remoteIPv4Addr & mask) === addr) {
          return true;
        }
        continue;
      }
      if (remote.isIPv4) {
        continue;
      }
      if ((remoteAddr & mask) === addr) {
        return true;
      }
    }
    for (const rule of functionRules) {
      if (rule({ addr: remote.addr, type: remote.type })) {
        return true;
      }
    }
    return false;
  };
};
var ipRestriction = (getIP, { denyList = [], allowList = [] }, onError) => {
  const allowLength = allowList.length;
  const denyMatcher = buildMatcher(denyList);
  const allowMatcher = buildMatcher(allowList);
  const blockError = (c) => new HTTPException(403, {
    res: c.text("Forbidden", {
      status: 403
    })
  });
  return async function ipRestriction2(c, next) {
    const connInfo = getIP(c);
    const addr = typeof connInfo === "string" ? connInfo : connInfo.remote.address;
    if (!addr) {
      throw blockError(c);
    }
    const type = typeof connInfo !== "string" && connInfo.remote.addressType || distinctRemoteAddr(addr);
    const remoteData = { addr, type, isIPv4: type === "IPv4" };
    if (denyMatcher(remoteData)) {
      if (onError) {
        return onError({ addr, type }, c);
      }
      throw blockError(c);
    }
    if (allowMatcher(remoteData)) {
      return await next();
    }
    if (allowLength === 0) {
      return await next();
    } else {
      if (onError) {
        return await onError({ addr, type }, c);
      }
      throw blockError(c);
    }
  };
};
export {
  ipRestriction
};
