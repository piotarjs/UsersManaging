import { MDBBtn } from "mdbreact";
import * as React from 'react';
import { Action, ActionCreator } from 'redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Redirect } from '../../interfaces';
import InputText from '../InputText';
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
  highligthChosenElement
};

class EditUser extends React.Component<Props & InjectedFormProps>{
  constructor(props){
    super(props);
    this.props.editUser(this.props.user);
  }
  public componentDidUpdate(){
    this.props.editUser(this.props.user);
  }
  public onHighlightBack(){
    this.props.highligthChosenElement();
    this.props.redirect('/');
  }
  public render() {
    const { handleSubmit, updateUserInFirebase, user: { firstName, secondName } } = this.props;
    return (
      <div>
        <p className="h4 text-center py-4">Zmień dane użytkownika</p>
        <form onSubmit={handleSubmit(updateUserInFirebase)} className="md-form">
          <div>
            <Field name="firstName" component='input' className="form-control mb-2" type="text" placeholder={firstName} />
          </div>
          <div>
            <Field name="secondName" component='input' className="form-control mb-2" type="text" placeholder={secondName} />
          </div>
          <div>
            <Field name="key" component={InputText} />
          </div>
          <div>
            <Field name="uploadFile" component={UploadFile} />
          </div>
          <MDBBtn color="dark" size="sm" type="submit" onClick={() => this.onHighlightBack()}>Powrót</MDBBtn>
          <MDBBtn color="success" size="sm" type="submit">Zapisz</MDBBtn>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'List',
})(EditUser);

