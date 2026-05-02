import * as util from "../core/util.js";
const error = () => {
    const Sizable = {
        string: { unit: "χαρακτήρες", verb: "να έχει" },
        file: { unit: "bytes", verb: "να έχει" },
        array: { unit: "στοιχεία", verb: "να έχει" },
        set: { unit: "στοιχεία", verb: "να έχει" },
        map: { unit: "καταχωρήσεις", verb: "να έχει" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const FormatDictionary = {
        regex: "είσοδος",
        email: "διεύθυνση email",
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
        datetime: "ISO ημερομηνία και ώρα",
        date: "ISO ημερομηνία",
        time: "ISO ώρα",
        duration: "ISO διάρκεια",
        ipv4: "διεύθυνση IPv4",
        ipv6: "διεύθυνση IPv6",
        mac: "διεύθυνση MAC",
        cidrv4: "εύρος IPv4",
        cidrv6: "εύρος IPv6",
        base64: "συμβολοσειρά κωδικοποιημένη σε base64",
        base64url: "συμβολοσειρά κωδικοποιημένη σε base64url",
        json_string: "συμβολοσειρά JSON",
        e164: "αριθμός E.164",
        jwt: "JWT",
        template_literal: "είσοδος",
    };
    const TypeDictionary = {
        nan: "NaN",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type": {
                const expected = TypeDictionary[issue.expected] ?? issue.expected;
                const receivedType = util.parsedType(issue.input);
                const received = TypeDictionary[receivedType] ?? receivedType;
                if (typeof issue.expected === "string" && /^[A-Z]/.test(issue.expected)) {
                    return `Μη έγκυρη είσοδος: αναμενόταν instanceof ${issue.expected}, λήφθηκε ${received}`;
                }
                return `Μη έγκυρη είσοδος: αναμενόταν ${expected}, λήφθηκε ${received}`;
            }
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Μη έγκυρη είσοδος: αναμενόταν ${util.stringifyPrimitive(issue.values[0])}`;
                return `Μη έγκυρη επιλογή: αναμενόταν ένα από ${util.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Πολύ μεγάλο: αναμενόταν ${issue.origin ?? "τιμή"} να έχει ${adj}${issue.maximum.toString()} ${sizing.unit ?? "στοιχεία"}`;
                return `Πολύ μεγάλο: αναμενόταν ${issue.origin ?? "τιμή"} να είναι ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Πολύ μικρό: αναμενόταν ${issue.origin} να έχει ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Πολύ μικρό: αναμενόταν ${issue.origin} να είναι ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with") {
                    return `Μη έγκυρη συμβολοσειρά: πρέπει να ξεκινά με "${_issue.prefix}"`;
                }
                if (_issue.format === "ends_with")
                    return `Μη έγκυρη συμβολοσειρά: πρέπει να τελειώνει με "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Μη έγκυρη συμβολοσειρά: πρέπει να περιέχει "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Μη έγκυρη συμβολοσειρά: πρέπει να ταιριάζει με το μοτίβο ${_issue.pattern}`;
                return `Μη έγκυρο: ${FormatDictionary[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Μη έγκυρος αριθμός: πρέπει να είναι πολλαπλάσιο του ${issue.divisor}`;
            case "unrecognized_keys":
                return `Άγνωστ${issue.keys.length > 1 ? "α" : "ο"} κλειδ${issue.keys.length > 1 ? "ιά" : "ί"}: ${util.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Μη έγκυρο κλειδί στο ${issue.origin}`;
            case "invalid_union":
                return "Μη έγκυρη είσοδος";
            case "invalid_element":
                return `Μη έγκυρη τιμή στο ${issue.origin}`;
            default:
                return `Μη έγκυρη είσοδος`;
        }
    };
};
export default function () {
    return {
        localeError: error(),
    };
}
