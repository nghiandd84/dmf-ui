import React, { AnchorHTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import Ripple from 'material-ripple-effects';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  ripple?: 'dark' | 'light';
  className?: string;
  children: React.ReactNode;
}

export default function NavLink({
  children,
  active = false,
  ripple = 'light',
  className,
  ...rest
}: Props) {
  const rippleEffect = new Ripple();

  return (
    <a
      {...rest}
      tw="px-5 py-4 flex gap-1 items-center text-xs uppercase font-medium leading-normal text-white rounded-lg"
      className={`${
        active ? 'bg-black bg-opacity-20' : 'bg-opacity-20'
      } ${className} `}
      onMouseUp={(e) => {
        ripple === 'dark' && rippleEffect.create(e, 'dark');
        ripple === 'light' && rippleEffect.create(e, 'light');
      }}
    >
      {children}
    </a>
  );
}
