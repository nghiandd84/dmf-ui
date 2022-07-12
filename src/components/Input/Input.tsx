import React, { InputHTMLAttributes, useState } from 'react';
import { Color, BaseSize, Border } from '../core/Core';
import tw, { TwStyle } from 'twin.macro';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  placeholder?: string;
  color?: Color;
  size?: BaseSize;
  outline?: boolean;
  error?: string;
  success?: string;
  iconFamily?: 'material' | 'awesome';
  iconName?: string;
  value?: any;
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

export default function Input({
  placeholder,
  label,
  color = 'primary',
  size = 'base',
  outline = false,
  error = null,
  success = null,
  iconFamily = null,
  iconName = null,
  value = undefined,
  ...rest
}: Props) {
  let labelBorderColor: TwStyle;
  const [valueState, setValueState] = useState(value);

  const containerTw: TwStyle[] = [
    tw`relative w-full`,
    size === 'base' && tw`h-11`,
    size === 'sm' && tw`h-9`,
    size === 'lg' && tw`h-12`,
  ];

  if (error) {
    labelBorderColor = Border['danger'];
  } else if (success) {
    labelBorderColor = Border['success'];
  } else {
    labelBorderColor = Border['info'];
  }
  const labelTw: TwStyle[] = [
    tw`absolute left-0 w-full h-full text-gray-400 pointer-events-none`,
    labelBorderColor,
    outline && tw`-top-1.5 flex leading-10 transition-all duration-300`,
    outline && size === 'sm' && tw`text-sm`,
    !outline && tw`border border-t-0 border-b-2 border-l-0 border-r-0`,
  ];

  const inputCssTw = [
    tw`w-full h-full leading-normal shadow-none outline-none text-info-800 focus:outline-none focus:ring-0 focus:text-info-800`,
    !outline && tw`px-0`,
    size === 'sm' && outline && tw`text-sm px-3 pt-1.5 pb-0.5`,
    size === 'base' && outline && tw`px-3 pt-2.5 pb-1.5`,
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

  let iconUI: any;
  const iconSizeMap = {
    'sm': tw`text-lg`,
    'lg': tw`text-xl`,
    'base': tw`text-2xl`
  }
  let iconSize: string = iconSizeMap[size] || ''
  if (iconFamily === 'material') {
    iconUI = (
      <span
        css={[
          tw`p-0 text-gray-600 text-opacity-60 border-none absolute top-1/2`,
          iconSizeMap[size]
        ]}
        className={`material-icons transform -translate-y-1/2  ${
          outline ? (size === 'sm' ? 'right-2' : 'right-3') : 'right-0'
        }  `}
      >
        {iconName}
      </span>
    );
  } else if (iconFamily === 'awesome') {
    iconUI = (
      <i
        css={[
          tw`absolute text-gray-600 border-none text-opacity-60 top-1/2`,
        ]}
        className={`fas transform -translate-y-1/2 ${iconName} ${iconSize}  ${
          outline ? (size === 'sm' ? 'right-2' : 'right-3') : 'right-0'
        } `}
      />
    );
  }
  return (
    <>
      <div css={containerTw}>
      {iconUI && iconUI}
        <input
          {...rest}
          value={valueState}
          onChange={e => setValueState(e.target.value)}
          placeholder={placeholder || ' '}
          css={inputCssTw}
          className={`${error ? 'mt-input-outline-error ' : ''}  placeholder-opacity-0 ${
            success ? 'mt-input-outline-success ' : ''
          } ${outline ? mtInputOutlineColors[color] : mtInputColors[color]}`}
        />
        <label css={labelTw}>
          {outline ? (
            label
          ) : (
            <span
              css={[
                tw`absolute transition-all duration-300 top-1/4`,
                size === 'sm' && tw`text-sm`,
              ]}
            >
              {label}
            </span>
          )}
        </label>
      </div>
      {error && <span tw="block text-xs text-red-500">{error}</span>}
      {success && <span tw="block text-xs text-green-500">{success}</span>}
    </>
  );
}
