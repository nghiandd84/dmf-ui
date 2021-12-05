import React from 'react';
import PropTypes from 'prop-types';
type Props = {
  className?: string;
  children: React.ReactNode;
};
export default function Tab({ children, className }: Props) {
  return (
    <div
      tw="relative flex flex-col items-center justify-center bg-white rounded-lg shadow-md w-full p-4 my-8"
      className={className}
    >
      {children}
    </div>
  );
}

