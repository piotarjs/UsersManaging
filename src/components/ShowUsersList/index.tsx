import { connect } from 'react-redux';
import { deleteUserFromFirebase, highligthChosenElement, onDeleteHoverHighlight, onEditHoverHighlight, redirect, State } from '../../module';
import ShowUsersList from './ShowUsersList';


const mapStateToProps = ({ firebase: {  isEdited, toDelete, toEdit, users } }: State) => ({
    isEdited,
    toDelete,
    toEdit,
    users
});

const mapDispatchToProps = {
    deleteUserFromFirebase,
    highligthChosenElement,
    onDeleteHoverHighlight,
    onEditHoverHighlight,
    redirect
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowUsersList);
