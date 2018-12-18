import { connect } from 'react-redux';
import { addUserToFirebase, onChangeKeyInputFile } from '../../../../module';
import AddUserForm from './AddUserForm';

const mapDispatchToProps = {
    addUserToFirebase,
    onChangeKeyInputFile
};

export default connect(null, mapDispatchToProps)(AddUserForm);
