import React, { AnchorHTMLAttributes } from 'react';
import Ripple from 'material-ripple-effects';
import { Bg, Color, RippleType } from '../../core/Core';
import tw from 'twin.macro';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  color?: Color;
  ripple?: RippleType;
  button?: boolean;
  children: React.ReactNode;
}

export default function PaginationItem({
  children,
  color = undefined,
  button = false,
  ripple = 'light',
  className,
  ...rest
}: Props) {
  const rippleEffect = new Ripple();

  return (
    <li tw="grid place-items-center cursor-pointer">
      <a
        {...rest}
        css={[
          tw`flex items-center justify-center h-8 p-0 mx-1 text-sm leading-none transition-all duration-300`,
          color && Bg[color],
          color && tw`text-white`,
          !color &&
            tw`text-gray-700 bg-transparent hover:bg-gray-500 hover:bg-opacity-20 focus:bg-gray-500 focus:bg-opacity-20 active:bg-gray-500 active:bg-opacity-40`,
          button && tw`tracking-wider rounded-lg w-14`,
          !button && tw`w-8 rounded-full`,
        ]}
        className={className}
        onMouseUp={(e) => {
          ripple === 'dark' && rippleEffect.create(e, 'dark');
          ripple === 'light' && rippleEffect.create(e, 'light');
        }}
      >
        {children}
      </a>
    </li>
  );
}
