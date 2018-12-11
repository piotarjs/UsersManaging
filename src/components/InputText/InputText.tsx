import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

interface Props {
  user: {
    firstName: string,
    key: string,
    secondName: string,
    url: string
  }
};

const InputText: React.FunctionComponent<Props & WrappedFieldProps> = ({input, user}) =>
  <div>
    <input type="text" {...input} required={true} className="form-control mb-2" onChange={({target}) => console.log(target.value)} value={user.key}/>
  </div>



export default InputText;
