import {IconDefinition, IconLookup, IconName, IconPrefix, IconPack } from '@fortawesome/fontawesome-common-types';
export {IconDefinition, IconLookup, IconName, IconPrefix, IconPack } from '@fortawesome/fontawesome-common-types';
export const dom: DOM;
export const library: Library;
export const parse: { transform(transformString: string): Transform };
export const config: Config;
export function noAuto():void;
export function findIconDefinition(iconLookup: IconLookup): IconDefinition;
export function text(content: string, params?: TextParams): Text;
export function counter(content: string | number, params?: CounterParams): Counter;
export function toHtml(content: any): string;
export function toHtml(abstractNodes: AbstractElement): string;
export function layer(
  assembler: (
    addLayerCallback: (layerToAdd: IconOrText | IconOrText[]) => void
  ) => void
): Layer;
export function icon(icon: IconName | IconLookup, params?: IconParams): Icon;
export type IconProp = IconName | [IconPrefix, IconName] | IconLookup;
export type FlipProp = "horizontal" | "vertical" | "both";
export type SizeProp =
  | "xs"
  | "lg"
  | "sm"
  | "1x"
  | "2x"
  | "3x"
  | "4x"
  | "5x"
  | "6x"
  | "7x"
  | "8x"
  | "9x"
  | "10x";
export type PullProp = "left" | "right";
export type RotateProp = 90 | 180 | 270;
export type FaSymbol = string | boolean;
export interface Config {
  familyPrefix: IconPrefix;
  replacementClass: string;
  autoReplaceSvg: boolean | 'nest';
  autoAddCss: boolean;
  autoA11y: boolean;
  searchPseudoElements: boolean;
  observeMutations: boolean;
  keepOriginalSource: boolean;
  measurePerformance: boolean;
  showMissingIcons: boolean;
}
export interface AbstractElement {
  tag: string;
  attributes: any;
  children?: AbstractElement[];
}
export interface FontawesomeObject {
  readonly abstract: AbstractElement[];
  readonly html: string[];
  readonly node: HTMLCollection;
}
export interface Icon extends FontawesomeObject, IconDefinition {
  readonly type: "icon";
}
export interface Text extends FontawesomeObject {
  readonly type: "text";
}
export interface Counter extends FontawesomeObject {
  readonly type: "counter";
}
export interface Layer extends FontawesomeObject {
  readonly type: "layer";
}
type IconOrText = Icon | Text;
export interface Attributes {
  [key: string]: number | string;
}
export interface Styles {
  [key: string]: string;
}
export interface Transform {
  size?: number;
  x?: number;
  y?: number;
  rotate?: number;
  flipX?: boolean;
  flipY?: boolean;
}
export interface Params {
  title?: string;
  classes?: string | string[];
  attributes?: Attributes;
  styles?: Styles;
}
export interface CounterParams extends Params {
}
export interface TextParams extends Params {
  transform?: Transform;
}
export interface IconParams extends Params {
  transform?: Transform;
  symbol?: FaSymbol;
  mask?: IconLookup;
}
export interface DOM {
  i2svg(params?: { node: Node; callback: () => void }): Promise<void>;
  css(): string;
  insertCss(): string;
  watch(): void;
}
type IconDefinitionOrPack = IconDefinition | IconPack;
export interface Library {
  add(...definitions: IconDefinitionOrPack[]): void;
  reset(): void;
}
