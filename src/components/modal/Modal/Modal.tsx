import React from 'react';
import { BaseSize } from '../../core/Core';
import tw from 'twin.macro';
type Props = {
  children: React.ReactNode;
  size?: BaseSize;
  active?: boolean;
  className?: string;
  toggler?: (event: any) => void;
};

export default function Modal({
  children,
  size = 'base',
  active = false,
  className = null,
  toggler,
}: Props) {
  const modalSize = {
      sm: tw`max-w-sm`,
      base: tw`max-w-3xl`,
      lg: tw`max-w-6xl`
  }


  return (
    <>
      <div
        css={[
          tw`fixed inset-0 z-50 grid overflow-x-hidden overflow-y-auto transition-all duration-500 outline-none place-items-center focus:outline-none`,
          active && tw`opacity-100 pointer-events-auto`,
          !active && tw`opacity-0 pointer-events-none`,
        ]}
        className={className}
        onClick={toggler}
      >
        <div
            css={[
                tw`w-auto mx-auto my-6 transition-all duration-500 transform p-0.5`,
                modalSize[size],
                active && tw`translate-y-0 opacity-100`,
                !active && tw`-translate-y-10 opacity-0`
            ]}
        >
          <div
            css={[
                tw`flex flex-col w-full p-6 bg-white border-0 outline-none focus:outline-none`,
                size === 'lg' && tw`shadow-xl rounded-xl`,
                size !== 'lg' && tw`rounded-lg shadow-lg`
            ]}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </div>
      <div
        css={[
          tw`fixed inset-0 z-40 transition-all duration-500 bg-black`,
          active && tw`opacity-25 pointer-events-auto`,
          !active && tw`opacity-0 pointer-events-none`,
        ]}
      />
    </>
  );
}

