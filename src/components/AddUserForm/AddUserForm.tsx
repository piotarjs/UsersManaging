import * as React from "react";
import { Field, reduxForm } from "redux-form";
import { AddUserToFirebase } from '../../interfaces';
import UploadFile from "../UploadFile";

const AddUserForm: React.SFC<AddUserToFirebase> = ({handleSubmit, addUserToFirebase}) =>
  <div>
    <p className="h4 text-center py-4">Wpisz dane użytkownika</p>
      <form onSubmit={handleSubmit(addUserToFirebase)} className="md-form">
        <div>
          <Field name="firstName" component='input' className="form-control mb-2" placeholder="Imię" type="text" />
        </div>
        <div>
          <Field name="secondName" component='input' className="form-control mb-2" placeholder="Nazwisko" type="text" />
        </div>
        <div>
          <Field name="uploadFile" component={UploadFile} />
        </div>
        <button type="submit" className="btn btn-success">Zapisz</button>
      </form>
  </div>
      
export default reduxForm({
  form: 'List'
})(AddUserForm);

