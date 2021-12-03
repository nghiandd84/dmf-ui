import React, { OptionHTMLAttributes } from 'react';
import tw from 'twin.macro';
import { Color } from '../core/Core';

interface Props extends OptionHTMLAttributes<HTMLOptionElement> {
  text: string;
  name: string;
  color?: Color;
}

const colors = {
  primary: 'mt-radio-primary-500',
  secondary: 'mt-radio-secondary-500',
  success: 'mt-radio-success-500',
  danger: 'mt-radio-danger-500',
  warning: 'mt-radio-warning-500',
  info: 'mt-radio-info-500',
};

export default function Radio({
  color = 'primary',
  text,
  id,
  name,
  ...rest
}: Props) {
  const idData = id || 'check-' + Math.ceil(Math.random() * 1000);

  return (
    <div className="flex items-center">
      <input
        {...rest}
        name={name}
        id={idData}
        type="radio"
        tw="hidden overflow-hidden"
        className={`mt-radio ${colors[color]} `}
      />
      <label
        htmlFor={idData}
        tw="flex items-center text-gray-400 transition-all duration-300 cursor-pointer select-none"
      >
        <span tw="relative inline-block w-4 h-4 mr-2 transition-all duration-300 border border-gray-500 rounded-full"></span>
        {text}
      </label>
    </div>
  );
}
