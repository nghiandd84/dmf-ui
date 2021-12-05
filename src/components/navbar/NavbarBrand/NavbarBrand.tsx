import React from 'react';
import { Color, TextColor } from '../../core/Core';
import tw from 'twin.macro';

type Props = {
  color?: Color;
  className?: string;
  children: React.ReactNode;
};

export default function NavbarBrand({ children, className, color = 'none' }: Props) {
  return (
    <span
      css={[
        tw`inline-block py-2 mr-4 text-sm font-bold leading-relaxed uppercase whitespace-nowrap`,
        TextColor[color],
      ]}
      className={className}
    >
      {children}
    </span>
  );
}
