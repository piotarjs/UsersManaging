import { MDBBtn } from "mdbreact";
import * as React from 'react';
import { Action, ActionCreator } from 'redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import InputText from '../../../../shared/InputText';
import UploadFile from '../../../../shared/UploadFile';
import { validate } from '../../../../validate';

interface Props {
  addUserToFirebase: ActionCreator<Action>,
}

const AddUserForm: React.FunctionComponent<Props & InjectedFormProps> = ({
  handleSubmit,
  addUserToFirebase,
  pristine,
  submitting,
}) =>
  <div>
    <p className="h4 text-center py-4">Wpisz dane użytkownika</p>
    <form onSubmit={handleSubmit(addUserToFirebase)} className="md-form">
      <div>
      <Field name="firstName" component={InputText} />
      </div>
      <div>
      <Field name="secondName" component={InputText} />
      </div>
      <div>
        <Field name="uploadFile" component={UploadFile} />
      </div>
      <div className="mt-3">
        <MDBBtn color="success" size="sm" type="submit" disabled={pristine || submitting}>Zapisz</MDBBtn>
      </div>
      
    </form>
  </div>
  
export default reduxForm({
  form: 'List',
  validate
})(AddUserForm);
