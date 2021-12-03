import React from 'react';
import tw from 'twin.macro';
type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function CardBody({ children, className }: Props) {
  return (
    <div tw="p-4" className={className}>
      {children}
    </div>
  );
}
