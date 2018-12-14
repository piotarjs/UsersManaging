import { MDBBtn } from "mdbreact";
import * as React from 'react';
import { Action, ActionCreator } from 'redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Redirect } from '../../interfaces';
import {validate} from '../../validate';
import InputText from '../InputText';
import UploadFile from '../UploadFile';

interface Props {
  validate:{
    firstName: string,
    secondName: string,
    uploadFile: string
  }
  redirect: Redirect['redirect'],
  updateUserInFirebase: ActionCreator<Action>,
  editUser: ActionCreator<Action>,
  highligthChosenElement: ActionCreator<Action>
};



const EditUser: React.FunctionComponent<Props & InjectedFormProps > = 
({ handleSubmit, highligthChosenElement, invalid, pristine, redirect, submitting, updateUserInFirebase }) => {
  const onHighlightBack =() => {
    highligthChosenElement();
    redirect('/');
  }
  return (
    <div>
      <p className="h4 text-center py-4">Zmień dane użytkownika</p>
      <form onSubmit={handleSubmit(updateUserInFirebase)} className="md-form">
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
          <MDBBtn color="dark" size="sm" type="submit" onClick={onHighlightBack}>Powrót</MDBBtn>
          <MDBBtn color="success" size="sm" type="submit" disabled={invalid || pristine || submitting}>Zapisz</MDBBtn>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  enableReinitialize: true,
  form: 'Edit',
  validate
})(EditUser);
