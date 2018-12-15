import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

enum Placeholder{
  firstName = 'Imię',
  secondName = 'Nazwisko',
}

const InputText: React.FunctionComponent<WrappedFieldProps> = ({ input, meta: { active, error, touched } }) => 
  <div>
    <input type="text" {...input} className="form-control mb-0" placeholder={Placeholder[input.name]} autoComplete="off" />
    {(active || touched) && ((error && <span className="p-1 bg-danger rounded text-white errorText">{error}</span>))}
  </div>

export default InputText;
