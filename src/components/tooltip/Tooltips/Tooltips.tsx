import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import { roundArrow } from 'tippy.js';
import { Placement } from '../../core/Core';

type Props = {
  children: React.ReactNode;
  placement?: Placement;
  className?: string;
};

const Tooltips = forwardRef<HTMLElement, Props>(
  ({ children, placement = 'top' }, ref: any) => {
    return (
      <Tippy
        content={children}
        placement={placement}
        reference={ref}
        animation="shift-away"
        arrow={roundArrow}
        className="arrow-dark"
        interactive
      />
    );
  }
);

export default Tooltips;
