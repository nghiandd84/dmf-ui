import React from 'react';

import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Icon from '../components/Icon/Icon';
import Radio from '../components/Radio';
import Dropdown from '../components/dropdown/Dropdown';
import DropdownItem from '../components/dropdown/DropdownItem';
import DropdownLink from '../components/dropdown/DropdownLink';
import Image from '../components/Image';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Select from '../components/Select/Select';
export const DemoForm = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'chocolate1', label: 'Chocolate 1' },
    { value: 'strawberry1', label: 'Strawberry1' },
    { value: 'vanilla1', label: 'Vanilla1' },
    { value: 'chocolate2', label: 'Chocolate2' },
    { value: 'strawberry2', label: 'Strawberry2' },
    { value: 'vanilla2', label: 'Vanilla2' },
    { value: 'chocolate3', label: 'Chocolate3' },
    { value: 'strawberry3', label: 'Strawberry3' },
    { value: 'vanilla3', label: 'Vanilla3' },
  ];
  return (
    <>
      <div className="flex flex-col w-full mt-5 gap-y-4">
        <Button
          ripple="dark"
          onClick={(event) => console.log('This is my event', event)}
        >
          Primary
        </Button>
        <Select
          label="Select Food"
          placeholder="Test placeholder"
          options={options}
          multiple={false}
          // value={[options[2]]}
          onValueChange={(data) => console.log('Change to new Data', data)}
          error="required field"
        />

        <Checkbox
          text="Check box"
          name="check-box"
          value={'NGHIA HERE'}
          color="danger"
        />
        <Radio text="Option 1" name="option" value="option1" />
        <Radio text="Option 2" name="option" value="option2" />
        <Icon family="remixicon" name="service-fill" size="xl" />
        <Dropdown
          color="primary"
          placement="top-end"
          buttonText="My Test My Test My Test"
          buttonType="outline"
          size="lg"
          rounded={true}
          ripple="dark"
        >
          <DropdownItem ripple="light">Action</DropdownItem>
          <DropdownLink
            href="#"
            // color="secondary"
            ripple="light"
            onClick={(e) => e.preventDefault()}
          >
            Another Action
          </DropdownLink>
          <DropdownItem ripple="light">Something else</DropdownItem>
        </Dropdown>
        <Input
          label="User name"
          // placeholder="Type your name"
          size="base"
          type="text"
          color="secondary"
        />

        <Input
          value={2233}
          label="Enter number large"
          size="lg"
          type="text"
          color="danger"
          iconFamily="material"
          iconName="people"
        />
        <Input
          label="Enter password"
          placeholder="pass@word1"
          size="base"
          type="password"
          color="success"
          outline={true}
          iconFamily="material"
          iconName="block"
        />
        <Input
          label="Enter number large"
          size="lg"
          type="number"
          color="danger"
          error="there are error here"
        />
        <TextArea
          placeholder="Text area example"
          size="lg"
          rows={3}
          outline={true}
        />
        <TextArea
          placeholder="Text area example"
          size="base"
          rows={4}
          onChange={(e) => console.log(e)}
        />
        <Image
          width="100"
          onClick={console.log}
          src="https://images.unsplash.com/photo-1612831455740-a2f6212eeeb2?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2250&amp;q=80"
        />
      </div>
    </>
  );
};
