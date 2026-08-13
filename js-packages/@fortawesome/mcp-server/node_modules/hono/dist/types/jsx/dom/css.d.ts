/**
 * @module
 * This module provides APIs that enable `hono/jsx/dom` to support.
 */
import type { FC, PropsWithChildren } from '../';
import type { ClassNameSlug, CssClassName, CssVariableType, OnInvalidSlug } from '../../helper/css/common';
export { rawCssString } from '../../helper/css/common';
interface CreateCssJsxDomObjectsType {
    (args: {
        id: Readonly<string>;
    }): readonly [
        {
            toString(this: CssClassName): string;
        },
        FC<PropsWithChildren<void>>
    ];
}
export declare const createCssJsxDomObjects: CreateCssJsxDomObjectsType;
interface CssType {
    (strings: TemplateStringsArray, ...values: CssVariableType[]): string;
}
interface CxType {
    (...args: (string | boolean | null | undefined)[]): string;
}
interface KeyframesType {
    (strings: TemplateStringsArray, ...values: CssVariableType[]): CssClassName;
}
interface ViewTransitionType {
    (strings: TemplateStringsArray, ...values: CssVariableType[]): string;
    (content: string): string;
    (): string;
}
interface DefaultContextType {
    css: CssType;
    cx: CxType;
    keyframes: KeyframesType;
    viewTransition: ViewTransitionType;
    Style: FC<PropsWithChildren<void>>;
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
export declare const Style: FC<PropsWithChildren<void>>;
