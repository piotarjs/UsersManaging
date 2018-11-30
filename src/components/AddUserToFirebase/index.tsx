import { connect } from 'react-redux';
import { getUserFromFirebase } from '../../module';
import AddUserToFirebase from './AddUserToFirebase';


const mapStateToProps = ({ firebase: { isError, isLoading, users } } ) => ({
    isError,
    isLoading,
    users
});

const mapDispatchToProps = {
    getUserFromFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserToFirebase);