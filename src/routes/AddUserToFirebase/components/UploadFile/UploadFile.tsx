import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

interface Props {
  inputFileKey: string
}

const UploadFile: React.FunctionComponent<Props & WrappedFieldProps> = ({ input: { value, ...input }, inputFileKey, meta: { error, touched } }) =>
  <div>
    <input type="file" key={inputFileKey} className="file-path validate mt-2 mb-0" {...input} />
    {(touched) && (error && <span className="p-1 bg-danger rounded text-white errorText">{error}</span>)}
  </div>

export default UploadFile;
