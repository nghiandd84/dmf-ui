import React, { forwardRef } from 'react';
import Tippy from '@tippyjs/react';
import { roundArrow } from 'tippy.js';
import { Placement } from '../../core/Core';

type Props = {
  children: React.ReactNode;
  className?: string;
  placement: Placement;
};

const Popover = forwardRef<HTMLElement, Props>(
  ({ children, placement }: Props, ref: any) => {
    return (
      <Tippy
        content={children}
        placement={placement}
        reference={ref}
        trigger="click"
        animation="shift-away"
        arrow={roundArrow}
        className="arrow-light"
        interactive
      />
    );
  }
);

export default Popover;
