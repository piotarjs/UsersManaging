import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

const UploadFile: React.FunctionComponent<WrappedFieldProps> = ({ input }) =>
  <div>
    <input type="file" className="file-path validate mb-2" {...input} value={undefined} />
  </div>

export default UploadFile;
