import React, {  TextareaHTMLAttributes } from 'react';
import { Color, BaseSize, Border } from '../core/Core';
import tw, { TwStyle } from 'twin.macro';

interface Props extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  placeholder: string;
  color?: Color;
  size?: BaseSize;
  outline?: boolean;
  error?: string;
  success?: string;
  
}

const mtInputColors = {
  primary: `mt-input-primary-500 mt-input`,
  secondary: `mt-input-secondary-500 mt-input`,
  success: `mt-input-success-500 mt-input`,
  danger: `mt-input-danger-500 mt-input`,
  warning: `mt-input-warning-500 mt-input`,
  info: `mt-input-info-500 mt-input`,
};

const mtInputOutlineColors = {
  primary: `mt-input-outline-primary-500 mt-input-outline`,
  secondary: `mt-input-outline-secondary-500 mt-input-outline`,
  success: `mt-input-outline-success-500 mt-input-outline`,
  danger: `mt-input-outline-danger-500 mt-input-outline`,
  warning: `mt-input-outline-warning-500 mt-input-outline`,
  info: `mt-input-outline-info-500 mt-input-outline`,
};

const mtInputOutlineFocusColor = {
  primary: tw`focus:border-primary-500`,
  secondary: tw`focus:border-secondary-500`,
  success: tw`focus:border-success-500`,
  danger: tw`focus:border-danger-500`,
  warning: tw`focus:border-warning-500`,
  info: tw`focus:border-info-500`,
};

export default function TextArea({
  placeholder,
  color = 'primary',
  size = 'base',
  outline = false,
  error = null,
  success = null,
  // rows = 7,
  ...rest
}: Props) {
  let labelBorderColor: TwStyle;

  const containerTw: TwStyle[] = [
    tw`relative w-full h-auto`,
  ];

  if (error) {
    labelBorderColor = Border['danger'];
  } else if (success) {
    labelBorderColor = Border['success'];
  } else {
    labelBorderColor = Border['info'];
  }
  const labelTw: TwStyle[] = [
    tw`absolute left-0 w-full h-full text-gray-400 pointer-events-none `,
    labelBorderColor,
    outline && tw`-top-1.5 flex leading-10 transition-all duration-300`,
    outline && size === 'sm' && tw`text-sm`,
    !outline && tw`border border-t-0 border-b-2 border-l-0 border-r-0 -top-0.5`,
  ];

  const inputCssTw = [
    tw`w-full h-full leading-normal shadow-none outline-none resize-none text-info-800 focus:outline-none focus:ring-0 focus:text-info-800`,
    !outline && tw`px-0`,
    size === 'sm' && outline && tw`text-sm px-3 pt-1.5 pb-0.5`,
    size === 'sm' && !outline && tw`px-0 text-sm`,
    size === 'base' && outline && tw`px-3 pt-2.5 pb-1.5`,
    size === 'base' &&! outline && tw`px-0`,
    size === 'lg' && outline && tw`px-3 pt-3.5 pb-2.5`,
  ];

  const inputFilled = [tw`bg-transparent border-none`];

  const inputOutline = [
    tw`bg-transparent border border-gray-300 rounded-lg focus:border-2`,
    mtInputOutlineFocusColor[color],
  ];
  if (outline) {
    inputCssTw.push(...inputOutline);
  } else {
    inputCssTw.push(...inputFilled);
  }

  
  

  return (
    <>
      <div css={containerTw}>
        <textarea
          {...rest}
          placeholder=" "
          css={inputCssTw}
          className={`${error ? 'mt-input-outline-error ' : ''}${
            success ? 'mt-input-outline-success ' : ''
          } ${outline ? mtInputOutlineColors[color] : mtInputColors[color]}`}
        />
        <label css={labelTw}>
          {outline ? (
            placeholder
          ) : (
            <span
              css={[
                tw`absolute top-0 transition-all duration-300`,
                size === 'sm' && tw`text-sm`,
              ]}
            >
              {placeholder}
            </span>
          )}
        </label>
      </div>
      {error && <span tw="block text-xs text-red-500">{error}</span>}
      {success && <span tw="block text-xs text-green-500">{success}</span>}
    </>
  );
}
