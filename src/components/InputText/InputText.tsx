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

const InputText: React.FunctionComponent<Props & WrappedFieldProps> = ({changeInputValueInEditing, input, user}) =>
  <div>
    <input type="text" {...input} required={true} className="form-control mb-2" onChange={({target}) => changeInputValueInEditing(target)} value={user.key}/>
  </div>



export default InputText;
