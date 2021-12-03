import React from 'react';
import tw from 'twin.macro';
import { TextColor } from '../../core/Core';

type Props = {
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  title: string;
  amount: string;
  date?: string;
  className?: string;
  children: React.ReactNode;
};

export default function CardStatusFooter({
  children,
  color = 'primary',
  amount,
  date,
  className,
}: Props) {
  return (
    <div
      className={className}
      tw="text-sm text-gray-700 pt-4 flex items-center"
    >
      {children}
      <span
        css={[
          tw`ml-1 mr-2`,
          TextColor[color],
        ]}
      >
        {amount}
      </span>
      <span tw="font-light whitespace-nowrap">{date}</span>
    </div>
  );
}
