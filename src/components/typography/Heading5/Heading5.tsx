import React from 'react';
import tw from 'twin.macro';
import { Color, TextColor } from '../../core/Core';
type Props = {
  color?: Color
  className?: string;
  children: React.ReactNode;
  onclick?: (event: Event) => void;
};

export default function H5({
  children,
  color = 'info',
  className,
  ...rest
}: Props) {
  return (
    <h5
      {...rest}
      className={className}
      css={[
        tw`mt-0 mb-2 font-serif text-2xl font-bold leading-normal `,
        TextColor[color],
      ]}
    >
      {children}
    </h5>
  );
}
