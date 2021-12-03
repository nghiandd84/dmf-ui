import React, { forwardRef } from 'react';
import Ripple from 'material-ripple-effects';
import tw from 'twin.macro';

type Props = {
  buttonType?: 'fill' | 'outline' | 'link';
  block?: boolean;
  rounded?: boolean;
  className?: string;
  ripple?: 'dark' | 'light';
  size?: 'md' | 'sm' | 'lg';
  color?: 'primary' | 'secondary';
  iconOnly?: boolean;
  children?: React.ReactNode;
  onClick?: (event: Event) => void;
};

const Button = forwardRef<any, Props>(
  (
    {
      children,
      buttonType,
      block,
      className,
      ripple,
      rounded,
      color,
      size,
      iconOnly,
      ...rest
    }: Props,
    ref
  ) => {
    const rippleEffect = new Ripple();
    const sizeData = size || 'md';
    const buttonTypeData = buttonType || 'fill';
    const colorData = color || 'primary';
    return (
      <>
        <button
          {...rest}
          css={[
            block && tw`w-full`,
            tw`flex items-center justify-center gap-1 font-bold tracking-wider uppercase transition-all duration-300 rounded-lg outline-none focus:outline-none focus:shadow-none`,
            !!rounded && tw`rounded-full`,
            !rounded && tw`rounded-lg`,
            iconOnly &&
              sizeData === 'md' &&
              tw`grid w-10 h-10 p-0 text-xs leading-normal place-items-center`,
            !iconOnly &&
              sizeData === 'md' &&
              tw`py-2.5 px-6 text-xs leading-normal`,
            iconOnly &&
              sizeData === 'lg' &&
              tw`grid w-12 h-12 p-0 text-sm leading-relaxed place-items-center`,
            !iconOnly &&
              sizeData === 'lg' &&
              tw`py-3 text-sm leading-relaxed px-7`,
            iconOnly &&
              sizeData === 'sm' &&
              tw`grid w-8 h-8 p-0 text-xs leading-normal place-items-center`,
            !iconOnly &&
              sizeData === 'sm' &&
              tw`py-1.5 px-4 text-xs leading-normal`,
            buttonTypeData === 'link' &&
              colorData === 'primary' &&
              tw`bg-transparent text-primary-500 hover:bg-primary-50 hover:text-primary-700 active:bg-primary-100`,
            buttonTypeData === 'link' &&
              colorData === 'secondary' &&
              tw`bg-transparent text-secondary-500 hover:bg-secondary-50 hover:text-secondary-700 active:bg-secondary-100`,
            buttonTypeData === 'fill' &&
              colorData === 'primary' &&
              tw`text-white shadow-md bg-primary-500 hover:bg-primary-700 focus:bg-primary-400 active:bg-primary-800 hover:shadow-lg`,
            buttonTypeData === 'fill' &&
              colorData === 'secondary' &&
              tw`text-white shadow-md bg-secondary-500 hover:bg-secondary-700 focus:bg-secondary-400 active:bg-secondary-800 hover:shadow-lg`,
            buttonTypeData === 'outline' &&
              colorData === 'primary' &&
              tw`bg-transparent border border-solid shadow-none text-primary-500 border-primary-500 hover:bg-primary-50 hover:border-primary-700 hover:text-primary-700`,
            buttonTypeData === 'outline' &&
              colorData === 'secondary' &&
              tw`bg-transparent border border-solid shadow-none text-secondary-500 border-secondary-500 hover:bg-secondary-50 hover:border-secondary-700 hover:text-secondary-700`,
          ]}
          className={className}
          onMouseUp={(e) => {
            ripple === 'dark' && rippleEffect.create(e, 'dark');
            ripple === 'light' && rippleEffect.create(e, 'light');
          }}
          ref={ref}
        >
          {children}
        </button>
      </>
    );
  }
);
export default Button;
