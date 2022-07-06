import React from 'react';
import DynamicForm, { FormInput } from '../dynamics/form/DynamicForm';
export const DemoDynamicForm = () => {
  const formData: FormInput[] = [
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
    */
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

  
    /*
    {
      name: 'uppercase',
      label: 'Auto transform uppercase',
      placeholder: 'Uppercase transformer',
      transformer: {
        onChange: 'uppercase',
      },
    },
    */
  ];
  const defaultValue = {
    'number-demo': 999,
    gender: 'm',
  };
  return (
    <>
      <h1>Demo Dynamic Form</h1>
      <DynamicForm
        classPrefix={'df'}
        form={formData}
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
