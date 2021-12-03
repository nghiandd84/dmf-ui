import React from 'react';
import tw from 'twin.macro';
type Props = {
  className?: string;
  children: React.ReactNode;
};
export default function Card({ children, className }: Props) {
  return (
    <div
      tw="w-full p-4 bg-white shadow-md rounded-xl"
      className={className}
    >
      {children}
    </div>
  );
}
