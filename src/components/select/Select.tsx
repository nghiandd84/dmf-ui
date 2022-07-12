import Tippy from '@tippyjs/react';
import React, {
  MutableRefObject,
  OptionHTMLAttributes,
  Ref,
  SelectHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import tw, { TwStyle } from 'twin.macro';
import { BgLight, Border, Color, OutlineHoverBg, TextColor } from '../core/Core';

interface Option {
  value: any;
  label: React.ReactNode;
}
interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  className?: string;
  error?: string;
  success?: string;
  isMulti?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  name?: string;
  outline?: boolean;
  value?: any | any[];
  placeholder?: string;
  color?: Color;
  iconFamily?: 'material' | 'awesome';
  onValueChange?: (value: any[]) => void;
}

const colors = {
  primary: 'mt-select-primary-500',
  secondary: 'mt-select-secondary-500',
  success: 'mt-select-success-500',
  danger: 'mt-select-danger-500',
  warning: 'mt-select-warning-500',
  info: 'mt-select-info-500',
};

const mtSelectColors = {
  primary: `mt-select-primary-500 mt-select`,
  secondary: `mt-select-secondary-500 mt-select`,
  success: `mt-select-success-500 mt-select`,
  danger: `mt-select-danger-500 mt-select`,
  warning: `mt-select-warning-500 mt-select`,
  info: `mt-select-info-500 mt-select`,
};

const mtSelectOutlineFocusColor = {
  primary: tw`border-primary-500`,
  secondary: tw`border-secondary-500`,
  success: tw`border-success-500`,
  danger: tw`border-danger-500`,
  warning: tw`border-warning-500`,
  info: tw`border-info-500`,
};

const useResize = (ref: MutableRefObject<HTMLElement | undefined>) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleResize = useCallback(() => {
    setWidth(ref.current?.offsetWidth || 0);
    setHeight(ref.current?.offsetHeight || 0);
  }, [ref]);

  useEffect(() => {
    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('load', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, [ref, handleResize]);

  return { width, height };
};

export default function Select({
  color = 'primary',
  id,
  name,
  label,
  error,
  success,
  options = [],
  outline = true,
  value = [],
  iconFamily = 'awesome',
  multiple = false,
  isSearchable = false,
  onValueChange = () => {},
  ...rest
}: Props) {
  const idData = id || 'select-' + Math.ceil(Math.random() * 1000);

  const [open, setOpen] = useState<boolean>(false);

  const [selected, setSelected] = useState<any[]>(
    Array.isArray(value) ? value : [value]
  );
  console.log(selected);
  const componentRef: any = useRef<HTMLDivElement>();
  const { width, height } = useResize(componentRef);
  const handleSelect = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    selectedData: any
  ): void => {
    const selectedIndex = selected.indexOf(selectedData);
    let result: any[] = [];
    if (selectedIndex >= 0) {
      result = selected.filter((otpion) => otpion !== selectedData);
    } else {
      if (multiple) {
        result = [...selected, selectedData];
      } else {
        result = [selectedData];
      }
    }
    setSelected(result);
    onValueChange(result);
  };
  const optionTw = [
    tw`cursor-pointer select-none relative py-2 pl-3 pr-9 m-1 `,
    OutlineHoverBg[color],
  ];
  const optionIconTw = [
    tw`absolute inset-y-0 right-0 flex items-center pr-4`,
    TextColor[color],
  ];

  const selectFilled = [
    tw`border-solid border-0 border-b-2`,
    open ? tw`border-b-2` : null,
    // open ? mtSelectColors[color]: null,
  ];
  const selectOutline = [
    tw`rounded-md shadow-sm`,
    open ? mtSelectOutlineFocusColor[color] : null,
  ];
  const selectCssTw: any[] = [
    tw`relative w-full bg-transparent border pr-10 text-left cursor-default`,
    open ? tw`border-2` : null,
  ];
  if (outline) {
    selectCssTw.push(...selectOutline);
  } else {
    selectCssTw.push(...selectFilled);
  }

  let labelBorderColor: TwStyle;
  if (error) {
    labelBorderColor = Border['danger'];
  } else if (success) {
    labelBorderColor = Border['success'];
  } else {
    labelBorderColor = Border['info'];
  }

  const labelTw: any[] = [
    tw`absolute left-0 w-full h-10 text-gray-400 pointer-events-none `,
    labelBorderColor,
  ];

  return (
    <div className="relative w-full">
      <Tippy
        trigger="click"
        offset={[0, 0]}
        placement="bottom"
        maxWidth="auto"
        onShow={() => setOpen(true)}
        onHide={() => setOpen(false)}
        onClickOutside={() => setOpen(false)}
        interactive
        content={
          <div style={{ width: width + 'px' }}>
            <ul tw="absolute z-10 mt-1 w-full bg-white shadow-lg  rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {options.map((option, index) => (
                <li
                  css={optionTw}
                  key={`${idData}-option-${index}`}
                  onClick={(event) => handleSelect(event, option)}
                >
                  <div tw="flex items-center">{option.label}</div>
                  {selected.indexOf(option) >= 0 && (
                    <span css={optionIconTw}>
                      {iconFamily === 'material' && (
                        <span css={[tw`h-5 w-5`]} className={`material-icons`}>
                          check
                        </span>
                      )}
                      {iconFamily === 'awesome' && (
                        <i className={`fa fa-check`} />
                      )}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <div
          css={selectCssTw}
          ref={componentRef}
          className={`mt-select ${outline ? '' : mtSelectColors[color]}`}
        >
          <label css={labelTw}>
            <span
              css={[
                tw`absolute transition-all duration-300 top-1/4 bg-white px-1`,
                (open || selected.length > 0 ) ? tw`-top-1/4 text-sm` : null,
              ]}
            >
              {label}
            </span>
          </label>
          <div
            tw="flex items-center flex-wrap pl-1"
            className={`${selected.length > 0 ? 'have-value' : 'no-value'}`}
          >
            {selected.map((option) => (
              <div
                css={[
                  tw`mt-1 mr-1 text-sm`,
                  multiple ? tw`border rounded-md pl-1 pr-1` : null,
                  Border[color],
                  multiple ? BgLight[color]: null
                ]}
              >
                {option.label}
              </div>
            ))}
            <div tw="m-1 p-1">&nbsp;</div>
          </div>
          <span tw="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            {iconFamily === 'awesome' && (
              <i
                css={[TextColor[color], tw`w-4`]}
                className={`fa ${open ? 'fa-angle-up' : 'fa-angle-down'}`}
              />
            )}
            {iconFamily === 'material' && (
              <span css={[TextColor[color]]} className={`material-icons`}>
                {open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
              </span>
            )}
          </span>
        </div>
      </Tippy>
    </div>
  );
}
