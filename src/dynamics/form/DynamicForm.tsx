// Build from https://github.com/langleyfoxall/react-dynamic-form-builder
import React, { Fragment } from 'react';
import Button from '../../components/Button';
import { BaseSize } from '../../components/core/Core';
import Input from '../../components/Input';
import Radio from '../../components/Radio';

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
export type FormInput = {
  name: string;
  type?: InputType;
  label?: string;
  placeholder?: string;
  filter?: string;
  validationRules?:
    | { rule: string | ValidateFunc | RegExp; message?: string }[]
    | string[];
  transformer?: Record<string, string>;
  inputClass?: string;
  defaultOptionText?: string;
  htmlProps?: any;
  render?: any;
  options?: any[];
  radioContainerClass?: string;
  size?: BaseSize;
};

type Props = {
  defaultValues?: Record<string, any>;
  classPrefix?: string;
  defaultContainerClass?: string;
  defaultInputClass?: string;
  form: FormInput[];
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
  inputs: (FormInput | FormInput[]) [];
  canRender: any[];
  validationErrors: Record<string, any>;
  randomisedFields: Record<string, any>;
};

class DynamicForm extends React.Component<Props, State> {
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

  timer = setTimeout(() => {}, 0);

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

  static getDerivedStateFromProps({ form }, state) {
    const { form: values, validationErrors: errors, randomisedFields } = state;
    const inputs = DynamicForm.flatInputs(form);

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
      inputs: form,
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

  componentDidUpdate(prevProps: Props) {
    const { values: ppValues } = prevProps;
    const { values: pValues } = this.props;

    if (pValues) {
      if (JSON.stringify(pValues) !== JSON.stringify(ppValues)) {
        const form = {
          ...ppValues,
          ...pValues,
        };

        this.propagateChange(form);
      }
    }

    return null;
  }

  validateForm(display = true): [boolean, Record<string, boolean>] {
    const { form } = this.props;

    let invalid = false;
    let { validationErrors, form: stateForm } = this.state;

    flatten(form).forEach((input: any) => {
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
      console.log('Each Rule', this.state.form, rule, value, name);
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

  renderCustomInput(input) {
    const { form } = this.state;

    if (typeof input.render !== 'function') {
      if (!React.isValidElement(input.render)) {
        return input.render;
      }

      return React.cloneElement(input.render, {
        name: input.name,
        placeholder: input.placeholder,
        value: form[input.name] || '',
        onChange: this.handleBlur.bind(this, input),
        onBlur: this.handleBlur.bind(this, input),
        invalid: !!this.getInputValidationError(input.name) || undefined,
      });
    }

    return input.render(
      input,
      form[input.name] || '',
      this.handleInput.bind(this, input),
      this.handleBlur.bind(this, input),
      this.getInputValidationError(input.name),
      this.state
    );
  }

  renderSubmitButton() {
    const { submitButton, classPrefix, defaultSubmitClass, loading } =
      this.props;

    if (submitButton) {
      return (
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

  renderInputs(inputs) {
    const { canRender } = this.state;
    const { classPrefix, defaultContainerClass } = this.props;

    inputs = inputs.filter(
      (input) => canRender.includes(input.name) || input.constructor === Array
    );

    return (
      <Fragment>
        {inputs.map((input, i) => {
          const isArray = input.constructor === Array;
          const containerClass = isArray
            ? `${classPrefix}-row`
            : `${classPrefix}-${
                input.containerClass || defaultContainerClass || ''
              }`;

          return (
            <Fragment key={i}>
              <div className={`mb-1 mt-2 ${containerClass}`}>
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
      return this.renderInputs(inputs);
    }
    const input: FormInput = inputs as FormInput;
    console.log(input, this);
    const defaultValue = (this.props.defaultValues || {})[input.name];

    const { form, validationErrors, randomisedFields } = this.state;

    const {
      formErrors,
      classPrefix,
      defaultInputClass,
      invalidInputClass,
      validInputClass,
    } = this.props;

    if (input.render) {
      return this.renderCustomInput(input);
    }

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
      value: form[input.name] || defaultValue || '',
      placeholder: input.placeholder,
      id: input.name,
      onChange: this.handleInput.bind(this, input),
      onBlur: this.handleBlur.bind(this, input),
      ...input.htmlProps,
    };

    switch (input.type) {
      case 'custom':
        return this.renderCustomInput(input);
      case 'textarea':
        return <textarea {...props} />;
      case 'checkbox':
        return (
          <input
            {...props}
            type={input.type}
            onBlur={undefined}
            defaultChecked={props.defaultValue}
            checked={props.value}
          />
        );
      case 'select':
        return (
          <select {...props}>
            {input.defaultOptionText && (
              // <option hidden selected value> TODO fix later
              <option hidden selected>
                {input.defaultOptionText}
              </option>
            )}
            {(input.options || []).map((option) => {
              return <option value={option.value}>{option.text}</option>;
            })}
          </select>
        );
      case 'radio':
        return (
          <Fragment>
            {(input.options || []).map((option, i) => {
              return (
                <div
                  key={i}
                  className={`${classPrefix}-${
                    input.radioContainerClass || ''
                  }`}
                >
                  <Radio
                    defaultChecked={option.value === defaultValue}
                    text={option.text}
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
        console.log(props);
        return (
          <Input
            {...props}
            value={defaultValue}
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

export default DynamicForm;
