import React, { AnchorHTMLAttributes } from 'react';
import tw from 'twin.macro';
import Ripple from 'material-ripple-effects';
import { Color, RippleType, HoverShadowLgBg, HoverBg } from '../../core/Core';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  color?: Color ;
  ripple?: RippleType;
}

export default function DropdownLink({
  children,
  color = 'primary',
  ripple = 'light',
  ...rest
}: Props) {
  const rippleEffect = new Ripple();

  return (
    <a
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
    </a>
  );
}
