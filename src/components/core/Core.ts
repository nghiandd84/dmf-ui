import tw from 'twin.macro';

export type Color =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';

export type RippleType = 'dark' | 'light';

export type BaseSize =  'sm' | 'base' | 'lg' ;

export declare type VariationPlacement = "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end";
export declare type AutoPlacement = "auto" | "auto-start" | "auto-end";
export declare type BasePlacement = "top" | "bottom" | "right" | "left";
export declare type Placement = AutoPlacement | BasePlacement | VariationPlacement;

export const TextColor = {
  primary: tw`text-primary-500`,
  secondary: tw`text-secondary-500`,
  success: tw`text-success-500`,
  danger: tw`text-danger-500`,
  warning: tw`text-warning-500`,
  info: tw`text-info-500`,
};
export const Border = {
  primary: tw`border-primary-500`,
  secondary: tw`border-secondary-500`,
  success: tw`border-success-500`,
  danger: tw`border-danger-500`,
  warning: tw`border-warning-500`,
  info: tw`border-info-500`,
};


export const Bg = {
  primary: tw`bg-primary-500`,
  secondary: tw`bg-secondary-500`,
  success: tw`bg-success-500`,
  danger: tw`bg-danger-500`,
  warning: tw`bg-warning-500`,
  info: tw`bg-info-500`,
};
export const FocusBg = {
  primary: tw`focus:bg-primary-400`,
  secondary: tw`focus:bg-secondary-400`,
  success: tw`focus:bg-success-400`,
  danger: tw`focus:bg-danger-400`,
  warning: tw`focus:bg-warning-400`,
  info: tw`focus:bg-info-400`,
};
export const HoverBg = {
  primary: tw`hover:bg-primary-700`,
  secondary: tw`hover:bg-secondary-700`,
  success: tw`hover:bg-success-700`,
  danger: tw`hover:bg-danger-700`,
  warning: tw`hover:bg-warning-700`,
  info: tw`hover:bg-info-700`,
  none: tw`hover:bg-info-700`,
};
export const OutlineHoverBg = {
  primary: tw`hover:bg-primary-50`,
  secondary: tw`hover:bg-secondary-50`,
  success: tw`hover:bg-success-50`,
  danger: tw`hover:bg-danger-50`,
  warning: tw`hover:bg-warning-50`,
  info: tw`hover:bg-info-50`,
};
export const ActiveBg = {
  primary: tw`active:bg-primary-800`,
  secondary: tw`active:bg-secondary-800`,
  success: tw`active:bg-success-800`,
  danger: tw`active:bg-danger-800`,
  warning: tw`active:bg-warning-800`,
  info: tw`active:bg-info-800`,
};

export const OutlineActiveBg = {
  primary: tw`active:bg-primary-100`,
  secondary: tw`active:bg-secondary-100`,
  success: tw`active:bg-success-100`,
  danger: tw`active:bg-danger-100`,
  warning: tw`active:bg-warning-100`,
  info: tw`active:bg-info-100`,
};

export const HoverShadowLgBg = {
  primary: tw`hover:shadow-lg hover:bg-primary-500`,
  secondary: tw`hover:shadow-lg hover:bg-secondary-500`,
  success: tw`hover:shadow-lg hover:bg-success-500`,
  danger: tw`hover:shadow-lg hover:bg-danger-500`,
  warning: tw`hover:shadow-lg hover:bg-warning-500`,
  info: tw`hover:shadow-lg hover:bg-info-500`
};

export const OutlineHoverBorder = {
  primary: tw`hover:border-primary-700`,
  secondary: tw`hover:border-secondary-700`,
  success: tw`hover:border-success-700`,
  danger: tw`hover:border-danger-700`,
  warning: tw`hover:border-warning-700`,
  info: tw`hover:border-info-700`,
};

export const TextHoverColor = {
  primary: tw`hover:text-primary-700`,
  secondary: tw`hover:text-secondary-700`,
  success: tw`hover:text-success-700`,
  danger: tw`hover:text-danger-700`,
  warning: tw`hover:text-warning-700`,
  info: tw`hover:text-info-700`,
};


