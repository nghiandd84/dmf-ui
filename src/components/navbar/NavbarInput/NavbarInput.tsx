import React, { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  fontAwesome?: boolean;
  className?: string;
  // children?: React.ReactNode;
}
export default function NavbarInput({ fontAwesome = true, ...rest }: Props) {
  return (
    <div tw="relative flex items-center px-3 py-1 bg-white rounded-lg lg:w-60 sm:w-full bg-opacity-20">
      {fontAwesome ? (
        <i tw="text-white text-xl" className="fas fa-search "></i>
      ) : (
        <span tw="mr-2 text-xl text-white" className=" material-icons">
          search
        </span>
      )}
      <input
        {...rest}
        tw="w-full text-sm font-normal leading-snug text-white placeholder-white placeholder-opacity-50 bg-transparent border-none focus:outline-none focus:ring-0"
      />
    </div>
  );
}
