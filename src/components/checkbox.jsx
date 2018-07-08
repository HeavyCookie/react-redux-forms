// @flow
import React from 'react'
import type { FieldProps } from './field-props'
import { extractPropsOverride } from './field-props'
import { getFieldErrors, getFieldValue } from '../redux/model'
import { Field } from './field'
import { Form, Context } from './form'

export const CheckboxComponent = (props: FieldProps) => {
  const mapping = (typeof props.mapping === 'string' ? ([props.mapping]) : props.mapping)
  const dashedName = mapping.join('-')
  const value = getFieldValue(props.model, mapping)
  const errors = getFieldErrors(props.model, mapping)

  const update = (event: SyntheticInputEvent<HTMLInputElement>) => {
    if (props.action) props.dispatch(props.action(mapping, event.target.checked))
  }

  return (
    <Field errors={ errors } className={ props.className } style={ props.style }>
      <div className="ui checkbox">
        <input
          type="checkbox"
          id={ dashedName }
          checked={ !!value }
          onChange={ update }
          {...extractPropsOverride(props)}
        />
        { props.label && <label htmlFor={ dashedName }>{ props.label }</label> }
      </div>
    </Field>
  )
}

export const Checkbox = (props: FieldProps) => (
  <Context.Consumer>
    {context => <CheckboxComponent {...props} {...context} />}
  </Context.Consumer>
)
