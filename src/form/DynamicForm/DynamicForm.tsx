// Build from https://github.com/langleyfoxall/react-dynamic-form-builder
import React, { Fragment } from 'react';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import { BaseSize, Color } from '../../components/core/Core';
import Input from '../../components/Input';
import Radio from '../../components/Radio';
import Select from '../../components/Select/Select';

const flatten = (arr) => [].concat(...arr) as any[];

export type ChangeData = {
  valid: boolean;
  data: {
    form: Record<string, any>;
    validationErrors: Record<string, boolean>;
  };
};

/**
 * type InputType
 * line-break to create new line with not input
 */
export type InputType =
  | undefined
  | 'line-break'
  | 'text'
  | 'custom'
  | 'password'
  | 'date'
  | 'email'
  | 'month'
  | 'number'
  | 'range'
  | 'color'
  | 'search'
  | 'time'
  | 'url'
  | 'week'
  | 'textarea'
  | 'checkbox'
  | 'select'
  | 'radio';

export type ValidateFunc = (
  name: string,
  fieldValue: any,
  formValue?: any
) => boolean;

export interface FormInputBase {
  name: string;
  type?: InputType;
  label?: string;
  color?: Color;
  placeholder?: string;
  filter?: string;
  validationRules?:
    | { rule: string | ValidateFunc | RegExp; message?: string }[]
    | string[];
  size?: BaseSize;
  transformer?: Record<string, string>;
  inputClass?: string;
  outline?: boolean;
  onHide?: (data: any) => boolean;
}

export interface RadioInput extends FormInputBase {
  options?: OptionInput[];
  radioClass?: string;
}

export interface SelectInput extends FormInputBase {
  options?: OptionInput[];

  selectClass?: string;
  outline?: boolean;
}

export type FormInput = RadioInput | SelectInput | FormInputBase;

export interface OptionInput {
  name: string;
  label: any;
  value: any;
}

type Props = {
  defaultValues?: Record<string, any>;
  classPrefix?: string;
  defaultContainerClass?: string;
  defaultInputClass?: string;
  defaultSubmitClass?: string;
  inputs?: FormInput | (FormInput | FormInput[])[];
  invalidInputClass?: string;
  validInputClass?: string;
  loading?: boolean;
  loadingElement?: React.ReactNode;
  formErrors?: {};
  submitButton?: {
    className: string;
    text: string;
  };
  validationTimeout?: number;
  onChange?: (data: ChangeData) => void;
  onSubmit: (data: ChangeData) => void;
};

type State = {
  form: Record<string, any>;
  inputs: FormInput | (FormInput | FormInput[])[];
  canRender: any[];
  validationErrors: Record<string, any>;
  randomisedFields: Record<string, any>;
};

export default class DynamicForm extends React.Component<Props, State> {
  filterRules = {
    numeric: (value: string) => /^$|^[0-9]+$/.test(value),
    decimal: (value: string) => /^$|^[\d.]+$/.test(value),
  };

  transformerRules = {
    uppercase: (value: string) => value.toUpperCase(),
    lowercase: (value: string) => value.toLowerCase(),
  };

  validationRules = {
    required: (value: any) => {
      if (value === null) {
        return false;
      }
      if (typeof value === 'object') {
        value = Object.keys(value);
      }

      if (typeof value === 'string' || Array.isArray(value)) {
        return !!value.length;
      }

      return value !== null && value !== undefined;
    },
    email: (value: string) =>
      !value ||
      /^$|^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      ),
    decimal: (value: string) =>
      !value || /^$|^\d+$|^\.\d+|^\d+\.\d+$/.test(value),
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      form: props.defaultValues || {},
      inputs: props.inputs || [],
      canRender: [],
      validationErrors: {},
      randomisedFields: {},
    };
    this.validateForm = this.validateForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.propagateChange = this.propagateChange.bind(this);
  }

  static flatInputs(entity) {
    return flatten(entity);
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const { form: values, validationErrors: errors, randomisedFields } = state;
    const inputs = DynamicForm.flatInputs(props.inputs);
    const newRandomisedFields = { ...randomisedFields };
    const newValues = { ...values };
    const newErrors = { ...errors };
    const canRender: any[] = [];

    inputs.forEach(({ name, renderIf, autocomplete }) => {
      if (typeof renderIf === 'function' && !renderIf(state)) {
        delete newValues[name];
        delete newErrors[name];
      } else {
        canRender.push(name);
      }

      if (autocomplete === false) {
        if (!newRandomisedFields[name]) {
          newRandomisedFields[name] = Math.random().toString(36).substring(7);
        }

        return;
      }

      delete newRandomisedFields[name];
    });

    return {
      ...state,
      inputs: props.inputs,
      canRender: canRender,
      form: newValues,
      validationErrors: newErrors,
      randomisedFields: newRandomisedFields,
    };
  }

  render() {
    try {
      const { inputs } = this.state;

      return (
        <Fragment>
          {this.renderInputs(inputs)}
          {this.renderSubmitButton()}
        </Fragment>
      );
    } catch (e) {
      console.error(e);

      return <p>Error rendering form</p>;
    }
  }

  validateForm(display = true): [boolean, Record<string, boolean>] {
    const { inputs } = this.props;

    let invalid = false;
    let { validationErrors, form: stateForm } = this.state;

    flatten(inputs).forEach((input: any) => {
      if (!input.validationRules) {
        return;
      }

      let [valid, validationError] = this.validateInput(
        input.name,
        stateForm[input.name],
        input.validationRules
      );

      validationErrors = {
        ...validationErrors,
        ...validationError,
      };

      if (!valid) {
        invalid = true;
      }
    });

    if (display) {
      this.setState({
        validationErrors,
      });

      return [!invalid, validationErrors];
    }

    return [!invalid, validationErrors];
  }

  validateInput(
    name: string,
    value: any,
    rules: any
  ): [boolean, Record<string, boolean>] {
    let valid = true;
    let errorMessage = null;

    if (!Array.isArray(rules)) {
      rules = [rules];
    }

    rules.forEach((rule) => {
      let ruleMessage = null;

      if (rule.constructor === Object) {
        ruleMessage = rule.message;
        rule = rule.rule;
      }

      switch (rule.constructor) {
        case Function:
          if (!rule(name, value, this.state.form)) {
            errorMessage = ruleMessage;
            valid = false;
          }

          break;
        case RegExp:
          if (!rule.test(value)) {
            errorMessage = ruleMessage;
            valid = false;
          }

          break;
        case String:
          //Might be regex if it has been stored as JSON
          if (rule[0] === '/' && rule[rule.length - 1] === '/') {
            const regex = new RegExp(rule.substring(1, rule.length - 1));

            if (!regex.test(value)) {
              errorMessage = ruleMessage;
              valid = false;

              break;
            }
          }

          try {
            if (!this.validationRules[rule](value)) {
              errorMessage = ruleMessage;
              valid = false;
            }
          } catch (e) {
            console.error(`Invalid filter rule ${rule} used on input ${name}`);
          }

          break;
        default:
          console.error(
            `Invalid validation type of ${rule.constructor} on input ${name}`
          );
      }
    });

    const validationError = {
      [name]: valid ? false : errorMessage || true,
    };

    return [valid, validationError];
  }

  submitForm() {
    const { form } = this.state;
    const { onSubmit } = this.props;

    if (onSubmit) {
      let [valid, validationErrors] = this.validateForm();

      onSubmit({
        valid: valid,
        data: {
          form,
          validationErrors,
        },
      });
    }
  }
  propagateChange(form: Record<string, any>, validationErrors?) {
    const { onChange } = this.props;

    const callback = () => {
      const [valid, errors] = this.validateForm(false);

      validationErrors = errors || validationErrors;
      if (onChange) {
        onChange({
          valid,
          data: {
            form,
            validationErrors,
          },
        });
      }
    };

    this.setState({ form: { ...form } }, callback);
  }
  applyFilter(event, filter) {
    switch (filter.constructor) {
      case RegExp:
        return filter.test(event.target.value);
      case Function:
        return filter(event);
      case String:
        //Might be regex if it has been stored as JSON
        if (filter[0] === '/' && filter[filter.length - 1] === '/') {
          const regex = new RegExp(filter.substring(1, filter.length - 1));

          return regex.test(event.target.value);
        }

        try {
          return this.filterRules[filter](event.target.value);
        } catch (e) {
          console.error(
            `Invalid filter rule ${filter} used on input ${event.target.name}`
          );

          return true;
        }
      default:
        console.error(
          `Invalid filter type of ${filter.constructor} on input ${event.target.name}`
        );

        return true;
    }
  }

  applyTransformer(event, transformer) {
    switch (transformer.constructor) {
      case Function:
        return transformer(event);
      case String:
        return this.transformerRules[transformer](event.target.value);
      default:
        console.error(
          `Invalid transformer type of ${transformer.constructor} on input ${event.target.name}`
        );

        return event.target.value;
    }
  }

  applyValidation(event, validation, onlyValid = false) {
    let { validationErrors } = this.state;
    let [valid, validationError] = this.validateInput(
      event.target.name,
      event.target.value,
      validation
    );

    validationErrors = {
      ...validationErrors,
      ...validationError,
    };

    if ((onlyValid && valid) || !onlyValid) {
      this.setState({
        validationErrors,
      });
    }

    return validationErrors;
  }

  handleInput(input, event) {
    event.persist();
    clearTimeout(this.timer);

    let validationErrors = {};

    if (input.filter && !this.applyFilter(event, input.filter)) {
      return;
    }

    let value = event.target.value;

    if (input.type === 'checkbox') {
      value = event.target.checked;
    }
    if (input.type === 'select') {
      value = event.target.value;
    }

    if (input.transformer && input.transformer.onChange) {
      value = this.applyTransformer(event, input.transformer.onChange);
    }

    if (input.validationRules) {
      const { validationTimeout } = this.props;

      // The third parameter, true, means that the input will not show as invalid
      // while the user is typing
      validationErrors = this.applyValidation(
        event,
        input.validationRules,
        true
      );

      this.timer = setTimeout(
        () => this.applyValidation(event, input.validationRules),
        validationTimeout
      );
    }

    let { form } = this.state;

    form[input.name] =
      value && typeof value === 'object' && !Array.isArray(value)
        ? value.value
        : value;

    this.propagateChange(form, validationErrors);
  }

  handleBlur(input, event) {
    clearTimeout(this.timer);

    let { form } = this.state;

    let value = event.target.value;
    let validationErrors = {};

    if (input.transformer && input.transformer.onBlur) {
      value = this.applyTransformer(event, input.transformer.onBlur);
    }

    if (input.validationRules) {
      validationErrors = this.applyValidation(event, input.validationRules);
    }

    if (form[input.name] !== value) {
      form[input.name] = value;

      this.propagateChange(form, validationErrors);
    }
  }

  getInputValidationError(inputName: string): string {
    const { validationErrors } = this.state;
    const { formErrors } = this.props;

    const validationError = validationErrors[inputName];
    const propError = formErrors ? formErrors[inputName] : null;

    return validationError && validationError !== true
      ? validationError
      : propError;
  }

  renderSubmitButton() {
    const { submitButton, classPrefix, defaultSubmitClass, loading } =
      this.props;

    if (submitButton) {
      return (
        <div className="mt-2 mb-2">
          <Button
            ripple="dark"
            className={`${classPrefix}-${
              submitButton.className || defaultSubmitClass || ''
            } ${this.validateForm(false) ? '' : 'invalid'} ${
              loading ? 'loading' : ''
            }`}
            onClick={this.submitForm}
          >
            {this.renderSubmitButtonContents()}
          </Button>
        </div>
      );
    }
  }

  renderSubmitButtonContents() {
    const { submitButton, loading, loadingElement } = this.props;

    if (loading && loadingElement) {
      return loadingElement;
    }

    return submitButton?.text || null;
  }

  renderInputs(inputs: FormInput[], isRow: boolean = false) {
    const { canRender } = this.state;
    const { classPrefix, defaultContainerClass } = this.props;

    inputs = inputs.filter(
      (input) => canRender.includes(input.name) || input.constructor === Array
    );

    return (
      <Fragment>
        {inputs.map((input: FormInput, i: number) => {
          const hide = input.onHide ? input.onHide(this.state.form) : false;
          if (hide) {
            return null;
          }
          const isArray = input.constructor === Array;
          const containerClass = isArray
            ? `${classPrefix}-row flex flex-wrap flex-col md:flex-row`
            : ` ${classPrefix}-${
                input.inputClass || defaultContainerClass || ''
              }`;

          return (
            <Fragment key={i}>
              <div
                className={`py-2 ${
                  isRow && i !== 0 ? 'md:pl-2 sm:pl-0' : 'pl-0'
                } ${containerClass} ${input.inputClass || ''}`}
              >
                {this.renderInput(input)}
              </div>
            </Fragment>
          );
        })}
      </Fragment>
    );
  }

  renderInput(inputs: FormInput | FormInput[]) {
    if (inputs.constructor === Array) {
      return this.renderInputs(inputs, true);
    }
    const input = inputs as FormInput;
    const selectedValue =
      this.state.form[input.name] ||
      (this.props.defaultValues || {})[input.name];

    const { form, validationErrors, randomisedFields } = this.state;

    const {
      formErrors,
      classPrefix,
      defaultInputClass,
      invalidInputClass,
      validInputClass,
    } = this.props;

    // if (input.render) {
    //   return this.renderCustomInput(input);
    // }

    const props = {
      className: `${classPrefix}-${
        input.inputClass || defaultInputClass || ''
      } ${
        validationErrors[input.name] ||
        (formErrors ? formErrors[input.name] : null)
          ? invalidInputClass
          : validationErrors[input.name] === false
          ? validInputClass
          : ''
      }`,
      name: randomisedFields[input.name] || input.name,
      value: form[input.name] || selectedValue || '',
      placeholder: input.placeholder,
      id: input.name,
      onChange: this.handleInput.bind(this, input),
      onBlur: this.handleBlur.bind(this, input),
      // TODO htmlProps
      // ...input.htmlProps,
    };

    switch (input.type) {
      // case 'custom':
      //   return this.renderCustomInput(input);
      case 'textarea':
        return <textarea {...props} />;
      case 'checkbox':
        return (
          <Checkbox
            tw="my-2 pl-2"
            text={input.label || ''}
            name={input.name}
            color={input.color}
            onChange={(e) => this.handleInput(input, e)}
          />
        );
      case 'select':
        const selectInput = inputs as SelectInput;
        const options = (selectInput.options || []).map((option) => ({
          value: option.value,
          label: option.label,
        }));
        return (
          <Select
            color={input.color || 'primary'}
            label={input.label}
            outline={selectInput.outline || false}
            className={selectInput.selectClass}
            options={options}
            error={this.getValidatoinError(input)}
            onValueChange={(e, value) => {
              e.target.name = input.name;
              e.target.value = value;
              this.handleInput(input, e);
            }}
          />
        );
      case 'radio':
        const radioInput = input as RadioInput;
        return (
          <Fragment>
            {(radioInput.options || []).map((option, i) => {
              return (
                <div
                  tw="my-1 pl-2"
                  key={`${input.name}-r-${i}`}
                  className={`${classPrefix}-${input.inputClass || ''}`}
                >
                  <Radio
                    defaultChecked={option.value === selectedValue}
                    text={option.label}
                    name={input.name}
                    value={option.value}
                    onChange={this.handleInput.bind(this, input)}
                  />
                </div>
              );
            })}
          </Fragment>
        );
      default:
        return (
          <Input
            {...props}
            value={selectedValue}
            label={input.label}
            placeholder={input.placeholder}
            size={input.size || 'base'}
            type={input.type}
            error={this.getValidatoinError(input)}
            onChange={this.handleInput.bind(this, input)}
          />
        );
    }
  }

  getValidatoinError(input: FormInput): string {
    const validationError = this.getInputValidationError(input.name);
    return validationError;
  }
}

