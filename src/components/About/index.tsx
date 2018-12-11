import { connect } from 'react-redux';
import { deleteUserFromFirebase, highligthChosenElement, redirect, State } from '../../module';
import About from './About';

const mapStateToProps = ({ firebase: {  isEdited} }: State) => ({
    isEdited
});

const mapDispatchToProps = {
    deleteUserFromFirebase,
    highligthChosenElement,
    redirect
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
