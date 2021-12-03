import React, { ButtonHTMLAttributes } from 'react';
import Ripple from 'material-ripple-effects';
import Tippy from '@tippyjs/react';
import {
  ActiveBg,
  Bg,
  Color,
  FocusBg,
  HoverBg,
  HoverShadowLgBg,
  Placement,
  RippleType,
  TextColor,
  Border,
  OutlineHoverBg,
  OutlineHoverBorder,
  TextHoverColor,
  OutlineActiveBg,
  BaseSize,
} from '../../core/Core';
import tw from 'twin.macro';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
  buttonType?: 'outline' | 'link' | 'fill';
  size?: BaseSize;
  placement?: Placement;
  rounded?: boolean;
  block?: boolean;
  ripple?: RippleType;
  color?: Color;
}

export default function Dropdown({
  children,
  buttonText,
  color = 'primary',
  buttonType = 'fill',
  size = 'base',
  placement = 'bottom-start',
  rounded = true,
  block = false,
  ripple = 'light',
  className,
  ...rest
}: Props) {
  const [dropdownShow, setDropdownShow] = React.useState(false);
  const rippleEffect = new Ripple();

  const roundfullTw = tw`rounded-full`;
  const roundedTw = tw`rounded`;
  const widthFullTw = tw`w-full`;
  const shareTw = tw`flex items-center justify-center gap-1 font-bold tracking-wider capitalize transition-all duration-300 rounded-lg outline-none focus:outline-none`;
  const cssTw = [
    block && widthFullTw,
    shareTw,
    rounded ? roundedTw : roundfullTw,
  ];

  const buttonFilled = [
    tw`text-white shadow-md `,
    Bg[color],
    HoverBg[color],
    FocusBg[color],
    ActiveBg[color],
    HoverShadowLgBg[color],
  ];

  const buttonOutline = [
    tw`bg-transparent border border-solid shadow-none`,
    TextColor[color],
    Border[color],
    OutlineHoverBg[color],
    OutlineHoverBorder[color],
    TextHoverColor[color],
    OutlineActiveBg[color],
  ];

  const buttonLink = [
    tw`bg-transparent`,
    TextColor[color],
    OutlineHoverBg[color],
    TextHoverColor[color],
    OutlineActiveBg[color],
  ];

  const buttonSmTw = tw`py-1.5 pl-5 pr-3 text-sm leading-normal`;
  const buttonRegularTw = tw`p-2.5 pl-7 pr-5 text-sm leading-normal`;
  const buttonLgTw = tw`py-3 pl-8 pr-6 text-base leading-relaxed`;

  if (size === 'sm') {
    cssTw.push(buttonSmTw);
  } else if (size === 'lg') {
    cssTw.push(buttonLgTw);
  } else {
    cssTw.push(buttonRegularTw);
  }

  if (buttonType === 'outline') {
    cssTw.push(...buttonOutline);
  } else if (buttonType === 'link') {
    cssTw.push(...buttonLink);
  } else {
    cssTw.push(...buttonFilled);
  }

  return (
    <div>
      <Tippy
        content={
          <div
            tw="flex flex-col bg-white text-base z-50 float-left list-none text-left rounded-lg shadow-lg mt-1 p-2 gap-0.5 overflow-hidden transition-all duration-500"
            style={{ minWidth: '10rem' }}
          >
            {children}
          </div>
        }
        animation="scale"
        trigger="click"
        offset={[0, 0]}
        placement={placement}
        interactive
      >
        <button
          {...rest}
          css={cssTw}
          className={className}
          type="button"
          onClick={() => setDropdownShow(!dropdownShow)}
          onMouseUp={(e) => {
            ripple === 'dark' && rippleEffect.create(e, 'dark');
            ripple === 'light' && rippleEffect.create(e, 'light');
          }}
        >
          {buttonText}
          <span className="text-lg leading-none align-middle material-icons">
            {dropdownShow ? 'arrow_drop_up' : 'arrow_drop_down'}
          </span>
        </button>
      </Tippy>
    </div>
  );
}
