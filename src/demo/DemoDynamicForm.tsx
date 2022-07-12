import React from 'react';
import DynamicForm, { FormInput } from '../dynamics/form/DynamicForm';
export const DemoDynamicForm = () => {
  const formData: (FormInput | FormInput[])[] = [
    /*
    {
      name: 'name',
      label: 'User name',
      placeholder: 'nghiandd',
      validationRules: [
        {
          rule: 'required',
          message: 'Please enter an user name',
        },
      ],
    },
    
    {
      name: 'email',
      label: 'Email',
      placeholder: 'With error message',
      validationRules: [
        {
          rule: 'required',
          message: 'Please enter an email',
        },
        {
          rule: 'email',
          message: 'Please enter a valid email',
        },
      ],
    },
    */
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'pass@word1',
      validationRules: [
        {
          rule: 'required',
          message: 'Please enter a password',
        },
      ],
    },
    {
      name: 'confirmation_password',
      type: 'password',
      label: 'Confirm Password',
      placeholder: 'pass@word1',
      validationRules: [
        {
          rule: 'required',
          message: 'Please enter a confirm password',
        },
        {
          rule: (_, value, formValue) => {
            return value === formValue.password;
          },
          message: 'Confirm password must match password',
        },
      ],
    },
    
    {
      name: 'gender',
      type: 'radio',
      label: 'Gender',
      placeholder: '0123456789',
      options: [
        {
          name: 'male',
          value: 'm',
          text: 'Male',
        },
        {
          name: 'female',
          value: 'f',
          text: 'Female',
        },
      ],
    },
    
    {
      name: 'number-demo',
      label: 'number only',
      type: 'number',
      placeholder: '0123456789',
      filter: 'numeric',
    },
    
    [
      {
        name: 'a',
        label: 'A-value',
        type: 'number',
        placeholder: '0123456789',
        validationRules: [
          {
            rule: 'required',
            message: 'Please enter a A-value',
          }
        ],
        inputClass: 'md:w-1/2'
      },
      {
        name: 'b',
        label: 'B',
        type: 'text',
        inputClass: 'md:w-1/2'
      },
    ],
    
    {
      name: 'select_type',
      type: 'select',
      label: 'Select Type',
      placement: 'bottom-start',
      inputClass: 'select-type md:w-1/2',
      selectClass: 'w-full',
      color: 'success',
      options: [
        {
          name: 'male',
          value: 'm',
          text: 'Male',
        },
        {
          name: 'female',
          value: 'f',
          text: 'Female',
        },
      ],
    },
  ];
  const defaultValue = {
    'number-demo': 999,
    gender: 'm',
    a: 12,
    b: 'Test B',
    select_type: 'f',
  };
  return (
    <>
      <h1>Demo Dynamic Form</h1>
      <DynamicForm
        classPrefix={'df'}
        inputs={formData}
        submitButton={{
          text: 'Save',
          className: 'submit',
        }}
        onSubmit={(form) => {
          console.log(form);
        }}
        defaultValues={defaultValue}
      />
    </>
  );
};
