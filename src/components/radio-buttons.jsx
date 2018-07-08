import * as React from "react";
import { getContext } from "recompose";
import { getFieldErrors, getFieldValue } from "../redux/model";
import type { FormContext } from "./form";
import { Form, contextTypes } from "./form";
import type { FieldProps } from "./field-props";
import { Field } from "./field";

type RadioButtonsProps = FieldProps & {
  values?: {
    [key: string | number]: React.Node
  },
  children?: React.Node
};

export const RadioButtonsComponent = (props: RadioButtonsProps) => {
  const mapping = (typeof props.mapping === 'string' ? ([props.mapping]) : props.mapping)
  const dashedName = mapping.join('-')
  const value = getFieldValue(props.model, mapping)
  const errors = getFieldErrors(props.model, mapping)

  return (
    <Field errors={ errors } className={ props.className } style={ props.style }>
      { props.label && <label>{ props.label }</label> }
      { props.values && Object.keys(props.values).map(
        k =>
          <div key={k} className="ui radio">
            <input
              type="radio"
              id={`${dashedName}-${k}`}
              name={`${dashedName}`}
              value={k}
              checked={value === k}
              onChange={props.update}
            />
            <label htmlFor={`${dashedName}-${k}`}>
              { props.values && props.values[k] }
            </label>
          </div>
      ) }
      { props.children }
    </Field>
  )
}

export const RadioButtons = getContext(contextTypes)(InputComponent)
