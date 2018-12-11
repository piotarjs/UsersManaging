import { connect } from 'react-redux';
import { editUser, getUserFromFirebase, State } from '../../module';
import AddUserToFirebase from './AddUserToFirebase';


const mapStateToProps = ({ firebase: { isError, isLoading, users } }: State) => ({
    isError,
    isLoading,
    users
});

const mapDispatchToProps = {
    editUser,
    getUserFromFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserToFirebase);
