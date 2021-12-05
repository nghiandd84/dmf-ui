import React from 'react';
import PropTypes from 'prop-types';
import { Bg, Color } from '../../core/Core';
import tw from 'twin.macro';

type Props = {
  color?: Color;
  navbar?: boolean;
  className?: string;
  children: React.ReactNode;
};

const colors = {
  blueGray: 'bg-blue-gray-500',
  gray: 'bg-gray-500',
  brown: 'bg-brown-500',
  deepOrange: 'bg-deep-orange-500',
  orange: 'bg-orange-500',
  amber: 'bg-amber-500',
  yellow: 'bg-yellow-600',
  lime: 'bg-lime-500',
  lightGreen: 'bg-light-green-500',
  green: 'bg-green-500',
  teal: 'bg-teal-500',
  cyan: 'bg-cyan-500',
  lightBlue: 'bg-light-blue-500',
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  deepPurple: 'bg-deep-purple-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  red: 'bg-red-500',
};

export default function Navbar({
  children,
  color = 'primary',
  navbar = false,
  className,
}: Props) {
  return (
    <>
      <nav
        css={[
          tw`flex flex-wrap items-center justify-between py-2.5 px-3 mb-3`,
          !navbar && tw`rounded-lg`,
          Bg[color],
        ]}
        className={className}
      >
        {children}
      </nav>
    </>
  );
}
