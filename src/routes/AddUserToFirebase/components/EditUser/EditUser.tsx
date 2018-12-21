import { MDBBtn } from "mdbreact";
import * as React from 'react';
import { Action, ActionCreator } from 'redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import InputText from '../../../../shared/InputText';
import UploadFile from '../../../../shared/UploadFile';
import {validate} from '../../../../validate';

interface Props {
  redirect: ActionCreator<Action>,
  updateUserInFirebase: ActionCreator<Action>,
  editUser: ActionCreator<Action>,
  highligthChosenElement: ActionCreator<Action>,
  getFileName: ActionCreator<Action>,
};

class EditUser extends React.Component<Props & InjectedFormProps>{
  public onHighlightBack = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.redirect('/', 'reset');
    this.props.highligthChosenElement();
    // this.props.getFileName(e);
  };
  public render(){
    const { handleSubmit, pristine, submitting, updateUserInFirebase } = this.props
    return(
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
          <MDBBtn color="dark" size="sm" type="submit" onClick={this.onHighlightBack()}>Powrót</MDBBtn>
          <MDBBtn color="success" size="sm" type="submit" disabled={pristine || submitting}>Zapisz</MDBBtn>
        </div>
      </form>
    </div>
    );
  };
};

export default reduxForm({
  enableReinitialize: true,
  form: 'Edit',
  validate
})(EditUser);
