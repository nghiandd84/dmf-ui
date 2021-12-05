import React, { AnchorHTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import Ripple from 'material-ripple-effects';
import tw from 'twin.macro';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  ripple?: 'dark' | 'light';
}

export default function TabItem({
  children,
  active = false,
  ripple = 'light',
  className,
  ...rest
}: Props) {
  const rippleEffect = new Ripple();

  return (
    <li className="text-center">
      <a
        {...rest}
        css={[
          tw`flex items-center justify-center gap-1 px-6 py-4 text-sm font-medium leading-normal text-white transition-all duration-300 rounded-lg`,
          active && tw`bg-white bg-opacity-20`,
        ]}
        className={className}
        role="tablist"
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
