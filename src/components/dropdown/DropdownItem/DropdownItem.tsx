import React, { HTMLAttributes } from 'react';
import tw from 'twin.macro';
import Ripple from 'material-ripple-effects';
import {
  Color,
  HoverBg,
  RippleType,
  HoverShadowLgBg,
} from '../../core/Core';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  color?: Color ;
  ripple?: RippleType;
}



export default function DropdownItem({
  children,
  color = 'primary',
  ripple,
  className,
  ...rest
}: Props) {
  const rippleEffect = new Ripple();

  return (
    <span
      {...rest}
      css={[
        tw`block w-full px-4 py-3 text-sm font-normal text-gray-900 transition-all duration-300 rounded-md cursor-pointer whitespace-nowrap hover:text-white`,
        HoverBg[color],
        HoverShadowLgBg[color],
      ]}
      onMouseUp={(e) => {
        ripple === 'dark' && rippleEffect.create(e, 'dark');
        ripple === 'light' && rippleEffect.create(e, 'light');
      }}
    >
      {children}
    </span>
  );
}
