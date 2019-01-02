import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

enum PLACEHOLDER {
  firstName = 'Imię',
  secondName = 'Nazwisko',
}

const InputText: React.FunctionComponent<WrappedFieldProps> = ({ input, meta: { error, submitFailed } }) => 
  <div>
    <input type="text" {...input} className="form-control mb-0" placeholder={PLACEHOLDER[input.name]} autoComplete="off" />
    {(submitFailed) && ((error && <span className="p-1 bg-danger rounded text-white errorText">{error}</span>))}
  </div>

export default InputText;
