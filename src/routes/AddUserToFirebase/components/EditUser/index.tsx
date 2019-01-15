import { connect } from 'react-redux';
import { editUser, highligthChosenElement, redirect, State, updateUserInFirebase } from '../../../../module';
import EditUser from './EditUser';

const mapStateToProps = ({ firebase: { fileName, listElementIsEdited, user: { firstName, key, secondName, url } } }: State) => ({
    fileName,
    initialValues: {
        fileName,
        firstName,
        key,
        secondName,
        url
    },
    listElementIsEdited
});

const mapDispatchToProps = {
    editUser,
    highligthChosenElement,
    redirect,
    updateUserInFirebase
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
