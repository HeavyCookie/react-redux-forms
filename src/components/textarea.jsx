// @flow
import React from 'react'
import type { FieldProps } from './field-props'
import { extractPropsOverride } from './field-props'
import { Field } from './field'
import { Form, Context } from './form'
import { getFieldValue, getFieldErrors } from '../redux/model'

export type Props = FieldProps & { rows?: string }

export const TextareaComponent = (props: Props) => {
  const mapping = (typeof props.mapping === 'string' ? ([props.mapping]) : props.mapping)
  const dashedName = mapping.join('-')
  const value = getFieldValue(props.model, mapping)
  const errors = getFieldErrors(props.model, mapping)

  const update = (event: SyntheticInputEvent<HTMLInputElement>) => {
    if(props.action) props.dispatch(props.action(mapping, event.target.value))
  }

  return (
    <Field errors={ errors } className={ props.className } style={ props.style }>
      { props.label && <label htmlFor={ dashedName }>{ props.label }</label> }
      <textarea
        placeholder={ props.placeholder }
        rows={ props.rows }
        id={ dashedName }
        value={ value }
        onChange={ props.overrideAction || update }
        {...extractPropsOverride(props)}/>
    </Field>
  )
}


export const Textarea = (props: Props) => (
  <Context.Consumer>
    {context => <TextareaComponent {...props} {...context} />}
  </Context.Consumer>
)
