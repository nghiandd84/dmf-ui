import React from 'react';
type Props = {
  children?: React.ReactNode;
  toggler: (e: any) => void
};

export default function ModalHeader({ children, toggler }: Props) {
  return (
    <div tw="flex items-center justify-between mb-6 relative">
      <h5 tw="text-gray-900 text-2xl font-bold mt-0 mb-0">{children}</h5>
      <button
        tw="p-1 bg-transparent absolute -top-3 right-0 text-gray-900 text-3xl leading-none outline-none focus:outline-none"
        onClick={toggler}
      >
        <span tw="text-gray-900 text-3xl block">&times;</span>
      </button>
    </div>
  );
}

