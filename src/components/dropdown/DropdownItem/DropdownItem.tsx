import React, { HTMLAttributes } from 'react';
import tw from 'twin.macro';
import Ripple from 'material-ripple-effects';
import {
  Color,
  HoverBg,
  RippleType,
  HoverShadowLgBg,
  Bg,
  TextColorWithBg,
} from '../../core/Core';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  color?: Color;
  value?: any;
  selected?: boolean;
  ripple?: RippleType;
  onClick?: (e: any, value: any) => void;
}

export default function DropdownItem({
  children,
  color = 'primary',
  ripple,
  selected = false,
  className,
  value = null,
  onClick = () => {},
  ...rest
}: Props) {
  const rippleEffect = new Ripple();

  return (
    <span
      {...rest}
      css={[
        tw`block w-full px-4 py-3 text-sm font-normal text-gray-900 transition-all duration-300 rounded-md cursor-pointer whitespace-nowrap hover:text-white`,
        selected ? Bg[color] : null,
        selected ? TextColorWithBg[color] : null,
        HoverBg[color],
        HoverShadowLgBg[color],
      ]}
      onMouseUp={(e) => {
        console.log(e, value);
        ripple === 'dark' && rippleEffect.create(e, 'dark');
        ripple === 'light' && rippleEffect.create(e, 'light');
        onClick(e, value);
      }}
    >
      {children}
    </span>
  );
}
