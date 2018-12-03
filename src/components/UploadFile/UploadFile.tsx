import * as React from "react";

const UploadFile = ({ input }) =>
  <div>
    <input type="file" className="file-path validate mb-2" {...input} value={undefined}/>
  </div>

export default UploadFile;
