// @flow
import * as React from 'react'
import type { FormContext } from './form'
import { Context } from './form'

export const FieldErrors = ({ errors }: { errors: any }) =>
  (!!errors ? (
    <div className="errors">
      <Context.Consumer>
        {(context) => {
          const listErrors = context.errorHandler
            ? context.errorHandler(errors)
            : (errors instanceof Array
              ? errors.toString()
              : JSON.stringify(errors))

          return listErrors
          }
        }
      </Context.Consumer>
    </div>
  ) : null)

export const Field =
  (props: { errors: any, children: React.Node, className?: string, style?: string }) => {
    const hasErrors = props.errors != null

    let classes = ['field']
    if (hasErrors) classes = [...classes, 'error']
    if (props.className) classes = [...classes, props.className]

    return (
      <div className={ classes.join(' ') } style={ props.style }>
        { props.children }
        <FieldErrors errors={props.errors} />
      </div>
    )
  }

export default Field
