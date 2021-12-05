import React, { HTMLAttributes } from 'react';
import tw from 'twin.macro';
import { BaseSize, Color } from '../core/Core';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  family?: 'material-icons' | 'font-awesome' | 'remixicon';
  size?:
    | BaseSize
    | 'xs' 
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl';
  color?: Color;
}

const sizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl',
  '8xl': 'text-8xl',
  '9xl': 'text-9xl',
};

export const IconColor = {
  primary: tw`text-primary-300`,
  secondary: tw`text-secondary-300`,
  success: tw`text-success-300`,
  danger: tw`text-danger-300`,
  warning: tw`text-warning-300`,
  info: tw`text-info-300`,
};
export default function Icon({
  family = 'material-icons',
  name,
  color = 'primary',
  size = 'base',
  ...rest
}: Props) {
  let iconUI;

  if (family === 'material-icons') {
    iconUI = (
      <span
        {...rest}
        css={[IconColor[color]]}
        className={`${family}  ${
          size ? sizes[size] : 'text-base'
        } leading-none`}
      >
        {name}
      </span>
    );
  } else if (family === 'font-awesome') {
    iconUI = (
      <i
        {...rest}
        css={[IconColor[color]]}
        className={`${name} ${sizes[size]}`}
      />
    );
  } else if (family === 'remixicon') {
    iconUI = (
      <i
        {...rest}
        css={[IconColor[color]]}
        className={`ri-${name} ${sizes[size]}`}
      />
    );
  }

  return iconUI;
}
