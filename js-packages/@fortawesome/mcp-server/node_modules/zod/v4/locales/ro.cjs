"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const util = __importStar(require("../core/util.cjs"));
const error = () => {
    const Sizable = {
        string: { unit: "caractere", verb: "să aibă" },
        file: { unit: "octeți", verb: "să aibă" },
        array: { unit: "elemente", verb: "să aibă" },
        set: { unit: "elemente", verb: "să aibă" },
        map: { unit: "intrări", verb: "să aibă" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const FormatDictionary = {
        regex: "intrare",
        email: "adresă de email",
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
        datetime: "dată și oră ISO",
        date: "dată ISO",
        time: "oră ISO",
        duration: "durată ISO",
        ipv4: "adresă IPv4",
        ipv6: "adresă IPv6",
        mac: "adresă MAC",
        cidrv4: "interval IPv4",
        cidrv6: "interval IPv6",
        base64: "șir codat base64",
        base64url: "șir codat base64url",
        json_string: "șir JSON",
        e164: "număr E.164",
        jwt: "JWT",
        template_literal: "intrare",
    };
    const TypeDictionary = {
        nan: "NaN",
        string: "șir",
        number: "număr",
        boolean: "boolean",
        function: "funcție",
        array: "matrice",
        object: "obiect",
        undefined: "nedefinit",
        symbol: "simbol",
        bigint: "număr mare",
        void: "void",
        never: "never",
        map: "hartă",
        set: "set",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type": {
                const expected = TypeDictionary[issue.expected] ?? issue.expected;
                const receivedType = util.parsedType(issue.input);
                const received = TypeDictionary[receivedType] ?? receivedType;
                return `Intrare invalidă: așteptat ${expected}, primit ${received}`;
            }
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Intrare invalidă: așteptat ${util.stringifyPrimitive(issue.values[0])}`;
                return `Opțiune invalidă: așteptat una dintre ${util.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Prea mare: așteptat ca ${issue.origin ?? "valoarea"} ${sizing.verb} ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemente"}`;
                return `Prea mare: așteptat ca ${issue.origin ?? "valoarea"} să fie ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Prea mic: așteptat ca ${issue.origin} ${sizing.verb} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Prea mic: așteptat ca ${issue.origin} să fie ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with") {
                    return `Șir invalid: trebuie să înceapă cu "${_issue.prefix}"`;
                }
                if (_issue.format === "ends_with")
                    return `Șir invalid: trebuie să se termine cu "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Șir invalid: trebuie să includă "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Șir invalid: trebuie să se potrivească cu modelul ${_issue.pattern}`;
                return `Format invalid: ${FormatDictionary[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Număr invalid: trebuie să fie multiplu de ${issue.divisor}`;
            case "unrecognized_keys":
                return `Chei nerecunoscute: ${util.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Cheie invalidă în ${issue.origin}`;
            case "invalid_union":
                return "Intrare invalidă";
            case "invalid_element":
                return `Valoare invalidă în ${issue.origin}`;
            default:
                return `Intrare invalidă`;
        }
    };
};
function default_1() {
    return {
        localeError: error(),
    };
}
module.exports = exports.default;
