import AddUserToFirebase from './AddUserToFirebase';
import { connect } from 'react-redux';
import { addUserToFirebase, getUserFromFirebase } from '../../module';


const mapStateToProps = (state) => {
    const {items, isLoading, isError} = state.firebase
    return{
        items,
        isLoading,
        isError
    };
};

const mapDispatchToProps = {
    addUserToFirebase,
    getUserFromFirebase
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserToFirebase);