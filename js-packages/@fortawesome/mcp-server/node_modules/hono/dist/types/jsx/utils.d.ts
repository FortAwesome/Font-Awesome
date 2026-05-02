export declare const normalizeIntrinsicElementKey: (key: string) => string;
export declare const isValidTagName: (name: unknown) => name is string;
export declare const isValidAttributeName: (name: string) => boolean;
export declare const styleObjectForEach: (style: Record<string, string | number>, fn: (key: string, value: string | null) => void) => void;
