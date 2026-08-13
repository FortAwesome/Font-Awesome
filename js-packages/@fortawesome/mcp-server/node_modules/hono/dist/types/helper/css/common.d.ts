export declare const PSEUDO_GLOBAL_SELECTOR = ":-hono-global";
export declare const isPseudoGlobalSelectorRe: RegExp;
export declare const DEFAULT_STYLE_ID = "hono-css";
export declare const SELECTOR: unique symbol;
export declare const CLASS_NAME: unique symbol;
export declare const STYLE_STRING: unique symbol;
export declare const SELECTORS: unique symbol;
export declare const EXTERNAL_CLASS_NAMES: unique symbol;
declare const CSS_ESCAPED: unique symbol;
export interface CssClassName {
    [SELECTOR]: string;
    [CLASS_NAME]: string;
    [STYLE_STRING]: string;
    [SELECTORS]: CssClassName[];
    [EXTERNAL_CLASS_NAMES]: string[];
}
export declare const IS_CSS_ESCAPED: unique symbol;
interface CssEscapedString {
    [CSS_ESCAPED]: string;
}
/**
 * @experimental
 * `rawCssString` is an experimental feature.
 * The API might be changed.
 */
export declare const rawCssString: (value: string) => CssEscapedString;
export declare const minify: (css: string) => string;
type CssVariableBasicType = CssClassName | CssEscapedString | string | number | boolean | null | undefined;
type CssVariableAsyncType = Promise<CssVariableBasicType>;
type CssVariableArrayType = (CssVariableBasicType | CssVariableAsyncType)[];
export type CssVariableType = CssVariableBasicType | CssVariableAsyncType | CssVariableArrayType;
/**
 * A function that customizes generated CSS class names.
 *
 * @param hash - The default hash-based class name (e.g. `css-1234567890`)
 * @param label - The comment label extracted from the CSS template, may be empty.
 *   Whitespace is trimmed and inner spaces are replaced with hyphens.
 * @param styleString - The minified CSS style string
 * @returns The custom class name to use. Must be a safe CSS identifier;
 *   otherwise, the default hash is used as a fallback.
 */
export type ClassNameSlug = (hash: string, label: string, styleString: string) => string;
/**
 * A callback function called when an invalid slug is returned from ClassNameSlug.
 *
 * @param slug - The invalid slug
 */
export type OnInvalidSlug = (slug: string) => void;
export declare const buildStyleString: (strings: TemplateStringsArray, values: CssVariableType[]) => [string, string, CssClassName[], string[]];
export declare const cssCommon: (strings: TemplateStringsArray, values: CssVariableType[], classNameSlug?: ClassNameSlug, onInvalidSlug?: OnInvalidSlug) => CssClassName;
export declare const cxCommon: (args: (string | boolean | null | undefined | CssClassName)[]) => (string | boolean | null | undefined | CssClassName)[];
export declare const keyframesCommon: (strings: TemplateStringsArray, values: CssVariableType[], classNameSlug?: ClassNameSlug, onInvalidSlug?: OnInvalidSlug) => CssClassName;
type ViewTransitionType = {
    (strings: TemplateStringsArray, values: CssVariableType[], classNameSlug?: ClassNameSlug, onInvalidSlug?: OnInvalidSlug): CssClassName;
    (content: CssClassName): CssClassName;
    (): CssClassName;
};
export declare const viewTransitionCommon: ViewTransitionType;
export {};
