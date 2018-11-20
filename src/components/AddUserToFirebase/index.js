import AddUserToFirebase from './AddUserToFirebase';
import { connect } from 'react-redux';
import { addUserToFirebase, getUserFromFirebase } from '../../module';


const mapStateToProps = ({ firebase: { users, isLoading, isError } }) => ({
    users,
    isLoading,
    isError
});

const mapDispatchToProps = {
    addUserToFirebase,
    getUserFromFirebase
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserToFirebase);