import type { $ZodStringFormats } from "../core/checks.js";
import type * as errors from "../core/errors.js";
import * as util from "../core/util.js";

const error: () => errors.$ZodErrorMap = () => {
  const Sizable: Record<string, { unit: string; verb: string }> = {
    string: { unit: "caractere", verb: "să aibă" },
    file: { unit: "octeți", verb: "să aibă" },
    array: { unit: "elemente", verb: "să aibă" },
    set: { unit: "elemente", verb: "să aibă" },
    map: { unit: "intrări", verb: "să aibă" },
  };

  function getSizing(origin: string): { unit: string; verb: string } | null {
    return Sizable[origin] ?? null;
  }

  const FormatDictionary: {
    [k in $ZodStringFormats | (string & {})]?: string;
  } = {
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

  const TypeDictionary: {
    [k in errors.$ZodInvalidTypeExpected | (string & {})]?: string;
  } = {
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
        if (issue.values.length === 1) return `Intrare invalidă: așteptat ${util.stringifyPrimitive(issue.values[0])}`;
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
        const _issue = issue as errors.$ZodStringFormatIssues;
        if (_issue.format === "starts_with") {
          return `Șir invalid: trebuie să înceapă cu "${_issue.prefix}"`;
        }
        if (_issue.format === "ends_with") return `Șir invalid: trebuie să se termine cu "${_issue.suffix}"`;
        if (_issue.format === "includes") return `Șir invalid: trebuie să includă "${_issue.includes}"`;
        if (_issue.format === "regex") return `Șir invalid: trebuie să se potrivească cu modelul ${_issue.pattern}`;
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

export default function (): { localeError: errors.$ZodErrorMap } {
  return {
    localeError: error(),
  };
}
