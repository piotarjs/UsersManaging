import { connect } from 'react-redux';
import { editUser,filterUsersList, getUserFromFirebase, State } from '../../module';
import AddUserToFirebase from './AddUserToFirebase';


const mapStateToProps = ({ firebase: { isError, isLoading, users, usersFiltered } }: State) => ({
    isError,
    isLoading,
    users,
    usersFiltered
});

const mapDispatchToProps = {
    editUser,
    filterUsersList,
    getUserFromFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserToFirebase);
