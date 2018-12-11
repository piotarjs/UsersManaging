import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

interface Props{
  inputFileKey: string
}

const UploadFile: React.FunctionComponent<Props & WrappedFieldProps> = ({ input, inputFileKey }) =>
  <div>
    <input type="file" key={inputFileKey} className="file-path validate mb-2" {...input} value={undefined} />
  </div>

export default UploadFile;
