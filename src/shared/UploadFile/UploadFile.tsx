import * as React from 'react';
import { Action, ActionCreator } from 'redux';
import { WrappedFieldProps } from 'redux-form';

interface Props {
  fileName: string
  getFileName: ActionCreator<Action>
}

const UploadFile: React.FunctionComponent<Props & WrappedFieldProps> = ({ fileName, getFileName, input: { value, ...input }, meta: { error, submitFailed } }) => {
  
  return(
    <div>
      <div className="fileUpload btn btn-primary px-3 py-2">
          <span>{fileName}</span>
          <input type="file" className="my-0 p-5 upload" {...input} id="uploadFile" onChange={getFileName} accept="image/*" />
      </div>
      <div>
        {(submitFailed) && (error && <span className="p-1 bg-danger rounded text-white errorText">{error}</span>)}
      </div>
    </div>
  );
}

export default UploadFile;
