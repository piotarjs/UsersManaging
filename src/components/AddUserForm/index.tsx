import { connect } from 'react-redux';
import { addUserToFirebase } from '../../module';
import AddUserForm from './AddUserForm';


const mapStateToProps = ({ firebase: { isError, isLoading, users } }) => ({
    isError,
    isLoading,
    users
});
const mapDispatchToProps = {
    addUserToFirebase
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserForm);

