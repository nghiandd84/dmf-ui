import React from 'react';
import tw from 'twin.macro';
import { Color, TextColor } from '../../core/Core';
type Props = {
  color?: Color;
  className?: string;
  children: React.ReactNode;
  onclick?: (event: Event) => void;
};

export default function Paragraph({
  children,
  color = 'info',
  className,
  ...rest
}: Props) {
  return (
    <p
      {...rest}
      className={className}
      css={[
        tw`mt-0 mb-4 text-base font-light leading-relaxed`,
        TextColor[color],
      ]}
    >
      {children}
    </p>
  );
}
