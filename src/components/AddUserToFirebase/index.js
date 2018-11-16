import AddUserToFirebase from './AddUserToFirebase';
import { connect } from 'react-redux';
import { addUserToFirebase } from '../../module';


const mapStateToProps = (state) => ({
    items: state.firebase.items
});

const mapDispatchToProps = {
    addUserToFirebase
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserToFirebase);