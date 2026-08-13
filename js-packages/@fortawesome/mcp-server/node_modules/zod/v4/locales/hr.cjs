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
        string: { unit: "znakova", verb: "imati" },
        file: { unit: "bajtova", verb: "imati" },
        array: { unit: "stavki", verb: "imati" },
        set: { unit: "stavki", verb: "imati" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const FormatDictionary = {
        regex: "unos",
        email: "email adresa",
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
        datetime: "ISO datum i vrijeme",
        date: "ISO datum",
        time: "ISO vrijeme",
        duration: "ISO trajanje",
        ipv4: "IPv4 adresa",
        ipv6: "IPv6 adresa",
        cidrv4: "IPv4 raspon",
        cidrv6: "IPv6 raspon",
        base64: "base64 kodirani tekst",
        base64url: "base64url kodirani tekst",
        json_string: "JSON tekst",
        e164: "E.164 broj",
        jwt: "JWT",
        template_literal: "unos",
    };
    const TypeDictionary = {
        nan: "NaN",
        string: "tekst",
        number: "broj",
        boolean: "boolean",
        array: "niz",
        object: "objekt",
        set: "skup",
        file: "datoteka",
        date: "datum",
        bigint: "bigint",
        symbol: "simbol",
        undefined: "undefined",
        null: "null",
        function: "funkcija",
        map: "mapa",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type": {
                const expected = TypeDictionary[issue.expected] ?? issue.expected;
                const receivedType = util.parsedType(issue.input);
                const received = TypeDictionary[receivedType] ?? receivedType;
                if (/^[A-Z]/.test(issue.expected)) {
                    return `Neispravan unos: očekuje se instanceof ${issue.expected}, a primljeno je ${received}`;
                }
                return `Neispravan unos: očekuje se ${expected}, a primljeno je ${received}`;
            }
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Neispravna vrijednost: očekivano ${util.stringifyPrimitive(issue.values[0])}`;
                return `Neispravna opcija: očekivano jedno od ${util.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                const origin = TypeDictionary[issue.origin] ?? issue.origin;
                if (sizing)
                    return `Preveliko: očekivano da ${origin ?? "vrijednost"} ima ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemenata"}`;
                return `Preveliko: očekivano da ${origin ?? "vrijednost"} bude ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                const origin = TypeDictionary[issue.origin] ?? issue.origin;
                if (sizing) {
                    return `Premalo: očekivano da ${origin} ima ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Premalo: očekivano da ${origin} bude ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Neispravan tekst: mora započinjati s "${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `Neispravan tekst: mora završavati s "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Neispravan tekst: mora sadržavati "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Neispravan tekst: mora odgovarati uzorku ${_issue.pattern}`;
                return `Neispravna ${FormatDictionary[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Neispravan broj: mora biti višekratnik od ${issue.divisor}`;
            case "unrecognized_keys":
                return `Neprepoznat${issue.keys.length > 1 ? "i ključevi" : " ključ"}: ${util.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Neispravan ključ u ${TypeDictionary[issue.origin] ?? issue.origin}`;
            case "invalid_union":
                return "Neispravan unos";
            case "invalid_element":
                return `Neispravna vrijednost u ${TypeDictionary[issue.origin] ?? issue.origin}`;
            default:
                return `Neispravan unos`;
        }
    };
};
function default_1() {
    return {
        localeError: error(),
    };
}
module.exports = exports.default;
