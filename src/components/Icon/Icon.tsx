import React, { HTMLAttributes } from 'react';
import { BaseSize, Color, TextColor } from '../core/Core';

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
        css={[TextColor[color]]}
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
        css={[TextColor[color]]}
        className={`${name} ${sizes[size]}`}
      />
    );
  } else if (family === 'remixicon') {
    iconUI = (
      <i
        {...rest}
        css={[TextColor[color]]}
        className={`ri-${name} ${sizes[size]}`}
      />
    );
  }

  return iconUI;
}
