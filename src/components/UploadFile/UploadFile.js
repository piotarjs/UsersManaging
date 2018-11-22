import React from "react";


const UploadFile = ({input}) =>
  <div>
    <input type="file" className="mb-2" {...input} value={undefined}/>
  </div>

export default UploadFile;