import { connect } from 'react-redux';
import { editUser, highligthChosenElement, redirect, State, updateUserInFirebase } from '../../module';
import EditUser from './EditUser';

const mapStateToProps = ({ firebase: {  isEdited} }: State) => ({
    isEdited
});

const mapDispatchToProps = {
    editUser,
    highligthChosenElement,
    redirect,
    updateUserInFirebase
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser) as any;
