import { connect } from 'react-redux';
import { editUser, highligthChosenElement, redirect, State, updateUserInFirebase } from '../../module';
import EditUser from './EditUser';

const mapStateToProps = ({ firebase: {  isEdited, user, user: { firstName, key, secondName, url } } }: State) => ({
    initialValues: {
        firstName,
        key,
        secondName,
        url
    },
    isEdited,
    user
});

const mapDispatchToProps = {
    editUser,
    highligthChosenElement,
    redirect,
    updateUserInFirebase
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser) as any;
