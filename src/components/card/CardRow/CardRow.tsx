import React from 'react';
type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function CardRow({ children, className }: Props) {
  return (
    <div tw="flex flex-wrap border-b border-gray-200" className={className}>
      {children}
    </div>
  );
}
