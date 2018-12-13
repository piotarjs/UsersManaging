import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

interface Props {
  user: {
    firstName: string,
    key: string,
    secondName: string,
    url: string
  }
  changeInputValueInEditing
};

const InputText: React.FunctionComponent<Props & WrappedFieldProps> = ({ input }) =>
  <div>
    <input type="text" {...input} className="form-control mb-2" />
  </div>

export default InputText;
