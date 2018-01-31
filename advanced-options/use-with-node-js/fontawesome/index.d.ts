export as namespace fontawesome;
import {IconDefinition, IconLookup, IconName, IconPrefix, IconPack } from '@fortawesome/fontawesome-common-types';
export {IconDefinition, IconLookup, IconName, IconPrefix, IconPack } from '@fortawesome/fontawesome-common-types';
export const dom: DOM;
export const library: Library;
export const parse: { transform(transformString: string): Transform };
export const config: Config;
export function noAuto():void;
export function findIconDefinition(iconLookup: IconLookup): IconDefinition;
export function text(content: string, params?: Params): Text;
export function layer(
  assembler: (
    addLayerCallback: (layerToAdd: IconLookup | IconLookup[]) => void
  ) => void
): Layer;
export function icon(icon: IconName | IconLookup, params?: IconParams): Icon;

declare const api: {
  dom: DOM;
  library: Library;
  parse: { transform(transformString: string): Transform };
  config: Config;
  noAuto():void;
  findIconDefinition(iconLookup: IconLookup): IconDefinition;
  text(content: string, params?: Params): Text;
  layer(
    assembler: (
      addLayerCallback: (layerToAdd: IconLookup | IconLookup[]) => void
    ) => void
  ): Layer;
  icon(icon: IconName | IconLookup, params?: IconParams): Icon;
}
export default api;

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
export interface Layer extends FontawesomeObject {
  readonly type: "layer";
}
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
  transform?: Transform;
  title?: string;
  classes?: string | string[];
  attributes?: Attributes;
  styles?: Styles;
}
export interface IconParams extends Params {
  symbol?: FaSymbol;
  mask?: IconLookup;
}
export interface DOM {
  i2svg(params: { node: Node; callback: () => void }): void;
  css(): string;
  insertCss(): string;
}
type IconDefinitionOrPack = IconDefinition | IconPack;
export interface Library {
  add(...definitions: IconDefinitionOrPack[]): void;
  reset(): void;
}