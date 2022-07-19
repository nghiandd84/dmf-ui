import React, { InputHTMLAttributes } from 'react';
import tw from 'twin.macro';
import { Color } from '../core/Core';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
  color?: Color;
}

const colors = {
  primary: 'mt-checkbox-primary-500',
  secondary: 'mt-checkbox-secondary-500',
  success: 'mt-checkbox-success-500',
  danger: 'mt-checkbox-danger-500',
  warning: 'mt-checkbox-warning-500',
  info: 'mt-checkbox-info-500',
};

export default function Checkbox({
  color = 'primary',
  text,
  id,
  className,
  ...rest
}: Props) {
  const idData = id || 'check-' + Math.ceil(Math.random() * 1000);
  return (
    <div tw="flex items-center" className={className}>
      <input
        {...rest}
        id={idData}
        type="checkbox"
        css={[tw`hidden overflow-hidden`]}
        className={`mt-checkbox ${colors[color]}`}
      />
      <label
        htmlFor={idData}
        tw="flex items-center cursor-pointer select-none transition-all duration-300 text-gray-400"
      >
        <span
          css={[
            tw`relative inline-block w-5 h-5 mr-2 transition-all duration-300 border rounded `,
            color === 'primary' && tw`border-primary-500`,
            color === 'secondary' && tw`border-secondary-500`,
            color === 'success' && tw`border-success-500`,
            color === 'danger' && tw`border-danger-500`,
            color === 'warning' && tw`border-warning-500`,
            color === 'info' && tw`border-info-500`,
          ]}
        ></span>
        {text}
      </label>
    </div>
  );
}
