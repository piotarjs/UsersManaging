import { connect } from 'react-redux';
import { getUserFromFirebase, State } from '../../module';
import AddUserToFirebase from './AddUserToFirebase';


const mapStateToProps = ({ firebase: { isError, isLoading, users } }: State) => ({
    isError,
    isLoading,
    users
});

const mapDispatchToProps = {
    getUserFromFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserToFirebase);
