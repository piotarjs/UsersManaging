import { connect } from 'react-redux';
import { addUserToFirebase } from '../../module';
import AddUserForm from './AddUserForm';

const mapDispatchToProps = {
    addUserToFirebase
};

export default connect(null, mapDispatchToProps)(AddUserForm);
