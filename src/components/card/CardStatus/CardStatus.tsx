import React from 'react';

type Props = {
  title: string;
  amount: string;
  className?: string;
  children: React.ReactNode;
};

export default function CardStatus({ title, amount, className }: Props) {
  return (
    <div
      tw="w-full pl-4 max-w-full flex-grow flex-1 mb-2 text-right"
      className={className}
    >
      <h5 tw="text-gray-500 font-light tracking-wide text-base mb-1">
        {title}
      </h5>
      <span tw="text-3xl text-gray-900">{amount}</span>
    </div>
  );
}
