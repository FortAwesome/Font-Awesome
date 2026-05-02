import * as util from "../core/util.js";
function getArmenianPlural(count, one, many) {
    return Math.abs(count) === 1 ? one : many;
}
function withDefiniteArticle(word) {
    if (!word)
        return "";
    const vowels = ["ա", "ե", "ը", "ի", "ո", "ու", "օ"];
    const lastChar = word[word.length - 1];
    return word + (vowels.includes(lastChar) ? "ն" : "ը");
}
const error = () => {
    const Sizable = {
        string: {
            unit: {
                one: "նշան",
                many: "նշաններ",
            },
            verb: "ունենալ",
        },
        file: {
            unit: {
                one: "բայթ",
                many: "բայթեր",
            },
            verb: "ունենալ",
        },
        array: {
            unit: {
                one: "տարր",
                many: "տարրեր",
            },
            verb: "ունենալ",
        },
        set: {
            unit: {
                one: "տարր",
                many: "տարրեր",
            },
            verb: "ունենալ",
        },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const FormatDictionary = {
        regex: "մուտք",
        email: "էլ. հասցե",
        url: "URL",
        emoji: "էմոջի",
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
        datetime: "ISO ամսաթիվ և ժամ",
        date: "ISO ամսաթիվ",
        time: "ISO ժամ",
        duration: "ISO տևողություն",
        ipv4: "IPv4 հասցե",
        ipv6: "IPv6 հասցե",
        cidrv4: "IPv4 միջակայք",
        cidrv6: "IPv6 միջակայք",
        base64: "base64 ձևաչափով տող",
        base64url: "base64url ձևաչափով տող",
        json_string: "JSON տող",
        e164: "E.164 համար",
        jwt: "JWT",
        template_literal: "մուտք",
    };
    const TypeDictionary = {
        nan: "NaN",
        number: "թիվ",
        array: "զանգված",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type": {
                const expected = TypeDictionary[issue.expected] ?? issue.expected;
                const receivedType = util.parsedType(issue.input);
                const received = TypeDictionary[receivedType] ?? receivedType;
                if (/^[A-Z]/.test(issue.expected)) {
                    return `Սխալ մուտքագրում․ սպասվում էր instanceof ${issue.expected}, ստացվել է ${received}`;
                }
                return `Սխալ մուտքագրում․ սպասվում էր ${expected}, ստացվել է ${received}`;
            }
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Սխալ մուտքագրում․ սպասվում էր ${util.stringifyPrimitive(issue.values[1])}`;
                return `Սխալ տարբերակ․ սպասվում էր հետևյալներից մեկը՝ ${util.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    const maxValue = Number(issue.maximum);
                    const unit = getArmenianPlural(maxValue, sizing.unit.one, sizing.unit.many);
                    return `Չափազանց մեծ արժեք․ սպասվում է, որ ${withDefiniteArticle(issue.origin ?? "արժեք")} կունենա ${adj}${issue.maximum.toString()} ${unit}`;
                }
                return `Չափազանց մեծ արժեք․ սպասվում է, որ ${withDefiniteArticle(issue.origin ?? "արժեք")} լինի ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    const minValue = Number(issue.minimum);
                    const unit = getArmenianPlural(minValue, sizing.unit.one, sizing.unit.many);
                    return `Չափազանց փոքր արժեք․ սպասվում է, որ ${withDefiniteArticle(issue.origin)} կունենա ${adj}${issue.minimum.toString()} ${unit}`;
                }
                return `Չափազանց փոքր արժեք․ սպասվում է, որ ${withDefiniteArticle(issue.origin)} լինի ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with")
                    return `Սխալ տող․ պետք է սկսվի "${_issue.prefix}"-ով`;
                if (_issue.format === "ends_with")
                    return `Սխալ տող․ պետք է ավարտվի "${_issue.suffix}"-ով`;
                if (_issue.format === "includes")
                    return `Սխալ տող․ պետք է պարունակի "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Սխալ տող․ պետք է համապատասխանի ${_issue.pattern} ձևաչափին`;
                return `Սխալ ${FormatDictionary[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Սխալ թիվ․ պետք է բազմապատիկ լինի ${issue.divisor}-ի`;
            case "unrecognized_keys":
                return `Չճանաչված բանալի${issue.keys.length > 1 ? "ներ" : ""}. ${util.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Սխալ բանալի ${withDefiniteArticle(issue.origin)}-ում`;
            case "invalid_union":
                return "Սխալ մուտքագրում";
            case "invalid_element":
                return `Սխալ արժեք ${withDefiniteArticle(issue.origin)}-ում`;
            default:
                return `Սխալ մուտքագրում`;
        }
    };
};
export default function () {
    return {
        localeError: error(),
    };
}
