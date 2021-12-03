import React, { useRef, useState } from 'react';
import Button from '../components/Button';
import H4 from '../components/typography/Heading4';
import LeadText from '../components/typography/LeadText';
import Paragraph from '../components/typography/Paragraph';
import Quote from '../components/typography/Quote';
import Small from '../components/typography/Small';
import Modal from '../components/modal/Modal';
import ModalHeader from '../components/modal/ModalHeader';
import ModalBody from '../components/modal/ModalBody';
import ModalFooter from '../components/modal/ModalFooter';
import Popover from '../components/popover/Popover';
import PopoverBody from '../components/popover/PopoverBody';
import PopoverContainer from '../components/popover/PopoverContainer';
import PopoverHeader from '../components/popover/PopoverHeader';
import Tooltips from '../components/tooltip/Tooltips';
import TooltipsContent from '../components/tooltip/TooltipsContent';

export const DemoModal = () => {
  const [showModal, setShowModal] = useState(false);
  const buttonRef = useRef();
  const buttonTooltipRef = useRef();
  return (
    <>
      <Button
        buttonType="fill"
        onClick={(_) => setShowModal(!showModal)}
        ripple="light"
      >
        Open Modal
      </Button>

      <Modal active={showModal} toggler={() => setShowModal(false)} size="lg">
        <ModalHeader toggler={() => setShowModal(false)}>
          Modal Title
        </ModalHeader>
        <ModalBody>
          <LeadText>
            I always felt like I could do anything. That’s the main thing people
            are controlled by! Thoughts- their perception of themselves! They're
            slowed down by their perception of themselves. If you're taught you
            can’t do anything, you won’t do anything. I was taught I could do
            everything.
          </LeadText>
          <Paragraph color="secondary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ut
            quibusdam sequi aperiam officia pariatur, excepturi inventore,
            itaque recusandae assumenda necessitatibus incidunt dolor! Quod
            illum nobis inventore itaque aspernatur hic.
          </Paragraph>
          <H4>Quote</H4>
          <Quote footer={'footer'} cite="and cite" color="success">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ut
            quibusdam sequi aperiam officia pariatur, excepturi inventore,
            itaque recusandae assumenda necessitatibus incidunt dolor! Quod
            illum nobis inventore itaque aspernatur hic.
          </Quote>
          <H4>Small</H4>
          <Small>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ut
            quibusdam sequi aperiam officia pariatur, excepturi inventore,
            itaque recusandae assumenda necessitatibus incidunt dolor! Quod
            illum nobis inventore itaque aspernatur hic.
          </Small>
        </ModalBody>
        <ModalFooter>
          <Button
            buttonType="link"
            onClick={(e) => setShowModal(false)}
            ripple="dark"
          >
            Close
          </Button>

          <Button onClick={(e) => setShowModal(false)} ripple="light">
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>

      <br />
      <br />
      <br />
      <div className="flex flex-wrap content-center">
        <div>
          <Button ref={buttonRef} ripple="light">
            Popover
          </Button>
        </div>

        <Popover placement="left" ref={buttonRef}>
          <PopoverContainer>
            <PopoverHeader>Popover </PopoverHeader>
            <PopoverBody>
              And here's some amazing content. It's very engaging. Right?
            </PopoverBody>
          </PopoverContainer>
        </Popover>
      </div>

      <br />
      <br />

      <br />
      <br />

      <br />
      <br />
      <div>
        <Button ref={buttonTooltipRef} ripple="light">
          Tooltip
        </Button>

        <Tooltips ref={buttonTooltipRef}>
          <TooltipsContent>
            <H4>Tooltip Content</H4>
            <Small color="primary">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ut
              quibusdam sequi aperiam officia pariatur, excepturi inventore,
              itaque recusandae assumenda necessitatibus incidunt dolor! Quod
              illum nobis inventore itaque aspernatur hic.
            </Small>
          </TooltipsContent>
        </Tooltips>
      </div>
    </>
  );
};
