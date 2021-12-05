import React from 'react';
import { Bg, Color } from '../../core/Core';
import tw from 'twin.macro';
type Props = {
  children: React.ReactNode;
  className?: string;
  color?: Color;
};

export const shadowColors = {
  primary: tw`shadow-lg bg-primary-500`,
  secondary: tw`shadow-lg bg-secondary-500`,
  success: tw`shadow-lg bg-success-500`,
  danger: tw`shadow-lg bg-danger-500`,
  warning: tw`shadow-lg bg-warning-500`,
  info: tw`shadow-lg bg-info-500`,
};

export default function TabList({ children, color = 'primary', className }: Props) {
  return (
    <ul
      css={[
        tw`z-10 flex justify-start w-full p-4 mx-5 mb-6 -mt-12 list-none rounded-lg`,
        Bg[color],
        shadowColors[color],
      ]}
      className={className}
      role="tablist"
    >
      {children}
    </ul>
  );
}
