import * as React from 'react';
import { Action, ActionCreator } from 'redux';
import { WrappedFieldProps } from 'redux-form';

interface Props {
  fileName: string
  getFileName: ActionCreator<Action>
}

const UploadFile: React.FunctionComponent<Props & WrappedFieldProps> = ({ fileName, getFileName, input: { value, ...input }, meta: { error, touched } }) => {
  
  return(
    <div>
      <div className="fileUpload btn btn-primary">
          <span>{fileName}</span>
          <input type="file" className="mt-2 mb-0 upload" {...input} id="uploadFile" onChange={getFileName} />
      </div>
      <div>
        {(touched) && (error && <span className="p-1 bg-danger rounded text-white errorText">{error}</span>)}
      </div>
    </div>
  );
}

export default UploadFile;
