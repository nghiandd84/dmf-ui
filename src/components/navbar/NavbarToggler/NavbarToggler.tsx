import React, { ButtonHTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import Ripple from 'material-ripple-effects';
import { Bg, Color, HoverBg } from '../../core/Core';
import tw from 'twin.macro';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: Color;
  ripple: 'dark' | 'light';
  className?: string;
  children?: React.ReactNode;
}

export default function NavbarToggler({
  color,
  ripple,
  className,
  ...rest
}: Props) {
  const rippleEffect = new Ripple();

  return (
    <button
      {...rest}
      css={[
        tw`cursor-pointer text-xl leading-none py-1 px-1.5 rounded-full border border-solid border-transparent bg-transparent block lg:hidden outline-none focus:outline-none transition-all duration-300`,
        HoverBg[color],
      ]}
      type="button"
      onMouseUp={(e) => {
        ripple === 'dark' && rippleEffect.create(e, 'dark');
        ripple === 'light' && rippleEffect.create(e, 'light');
      }}
      className={className}
    >
      <span css={[tw`relative block w-6 h-px bg-white rounded-sm`]}></span>
      <span
        css={[tw`relative block w-6 h-px mt-1 bg-white rounded-sm`]}
      ></span>
      <span
        css={[tw`relative block w-6 h-px mt-1 bg-white rounded-sm`]}
      ></span>
    </button>
  );
}
