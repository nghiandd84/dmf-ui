import React from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function NavbarContainer({ children, className }: Props) {
  return (
    <div
      tw="container max-w-7xl px-4 mx-auto flex flex-wrap items-center justify-between"
      className={className}
    >
      {children}
    </div>
  );
}
