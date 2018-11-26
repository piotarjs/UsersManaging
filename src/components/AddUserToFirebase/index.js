import AddUserToFirebase from './AddUserToFirebase';
import { connect } from 'react-redux';
import { addUserToFirebase, getUserFromFirebase, redirect } from '../../module';


const mapStateToProps = ({ firebase: { users, isLoading, isError } }) => ({
    users,
    isLoading,
    isError
});

const mapDispatchToProps = {
    addUserToFirebase,
    getUserFromFirebase,
    redirect
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserToFirebase);