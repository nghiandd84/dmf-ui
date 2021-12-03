import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function TooltipsContent({ children, className }: Props) {
  return (
    <div
      tw="px-2.5 py-1.5 bg-black bg-opacity-80 text-white text-sm rounded"
      className={className}
    >
      {children}
    </div>
  );
}
