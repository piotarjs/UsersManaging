import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

const Input: React.FunctionComponent<WrappedFieldProps> = ({input}) =>
  <div>
    <input type="text" {...input} className="form-control mb-2" value='Tymoteusz'/>
  </div>

export default Input;
