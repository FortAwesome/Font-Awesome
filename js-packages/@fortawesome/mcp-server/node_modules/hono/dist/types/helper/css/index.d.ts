/**
 * @module
 * css Helper for Hono.
 */
import type { HtmlEscapedString } from '../../utils/html';
import type { ClassNameSlug, CssClassName as CssClassNameCommon, CssVariableType, OnInvalidSlug } from './common';
export { rawCssString } from './common';
export type { ClassNameSlug, OnInvalidSlug } from './common';
type CssClassName = HtmlEscapedString & CssClassNameCommon;
interface CssType {
    (strings: TemplateStringsArray, ...values: CssVariableType[]): Promise<string>;
}
interface CxType {
    (...args: (CssClassName | Promise<string> | string | boolean | null | undefined)[]): Promise<string>;
}
interface KeyframesType {
    (strings: TemplateStringsArray, ...values: CssVariableType[]): CssClassNameCommon;
}
interface ViewTransitionType {
    (strings: TemplateStringsArray, ...values: CssVariableType[]): Promise<string>;
    (content: Promise<string>): Promise<string>;
    (): Promise<string>;
}
interface StyleType {
    (args?: {
        children?: Promise<string>;
        nonce?: string;
    }): HtmlEscapedString;
}
/**
 * @experimental
 * `createCssContext` is an experimental feature.
 * The API might be changed.
 *
 * @param options.id - The ID for the style element
 * @param options.classNameSlug - Optional function to customize generated CSS class names
 * @param options.onInvalidSlug - Optional callback function called when an invalid slug is returned from ClassNameSlug
 */
export declare const createCssContext: ({ id, classNameSlug, onInvalidSlug, }: {
    id: Readonly<string>;
    classNameSlug?: ClassNameSlug;
    onInvalidSlug?: OnInvalidSlug;
}) => DefaultContextType;
interface DefaultContextType {
    css: CssType;
    cx: CxType;
    keyframes: KeyframesType;
    viewTransition: ViewTransitionType;
    Style: StyleType;
}
/**
 * @experimental
 * `css` is an experimental feature.
 * The API might be changed.
 */
export declare const css: CssType;
/**
 * @experimental
 * `cx` is an experimental feature.
 * The API might be changed.
 */
export declare const cx: CxType;
/**
 * @experimental
 * `keyframes` is an experimental feature.
 * The API might be changed.
 */
export declare const keyframes: KeyframesType;
/**
 * @experimental
 * `viewTransition` is an experimental feature.
 * The API might be changed.
 */
export declare const viewTransition: ViewTransitionType;
/**
 * @experimental
 * `Style` is an experimental feature.
 * The API might be changed.
 */
export declare const Style: StyleType;
