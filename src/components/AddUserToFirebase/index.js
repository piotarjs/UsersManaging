import AddUserToFirebase from './AddUserToFirebase';
import { connect } from 'react-redux';
import { addUserToFirebase, getUserFromFirebase } from '../../module';


const mapStateToProps = (state) => ({
    items: state.firebase.items
});

const mapDispatchToProps = {
    addUserToFirebase,
    getUserFromFirebase
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserToFirebase);