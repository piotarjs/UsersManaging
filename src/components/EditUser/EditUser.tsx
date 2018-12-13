import { MDBBtn } from "mdbreact";
import * as React from 'react';
import { Action, ActionCreator } from 'redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Redirect } from '../../interfaces';
import UploadFile from '../UploadFile';

interface Props {
  user: {
    firstName: string,
    key: string,
    secondName: string,
    url: string
  },
  redirect: Redirect['redirect'],
  updateUserInFirebase: ActionCreator<Action>,
  editUser: ActionCreator<Action>,
  highligthChosenElement: ActionCreator<Action>
};

const EditUser: React.FunctionComponent<Props & InjectedFormProps > = 
({ handleSubmit, highligthChosenElement, redirect, updateUserInFirebase, user }) => {
  const onHighlightBack =() => {
    highligthChosenElement();
    redirect('/');
  }
  return (
    <div>
      <p className="h4 text-center py-4">Zmień dane użytkownika</p>
      <form onSubmit={handleSubmit(updateUserInFirebase)} className="md-form">
        <div>
          <Field name="firstName" component='input' className="form-control mb-2" type="text" placeholder="Imię" />
        </div>
        <div>
          <Field name="secondName" component='input' className="form-control mb-2" type="text" placeholder="Nazwisko" />
        </div>
        <div>
          <Field name="uploadFile" component={UploadFile} />
        </div>
        <MDBBtn color="dark" size="sm" type="submit" onClick={onHighlightBack}>Powrót</MDBBtn>
        <MDBBtn color="success" size="sm" type="submit">Zapisz</MDBBtn>
      </form>
    </div>
  )
}

export default reduxForm({
  enableReinitialize: true,
  form: 'Edit',
})(EditUser);
