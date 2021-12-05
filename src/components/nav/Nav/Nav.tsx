import React from 'react';

type Props = {
  leftSide: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function Nav({
  children,
  leftSide = false,
  className = '',
}: Props) {
  return (
    <ul
      tw="flex lg:items-center flex-col lg:flex-row list-none"
      className={`${leftSide ? 'mr-auto' : 'ml-auto'} ${className}`}
    >
      {children}
    </ul>
  );
}
