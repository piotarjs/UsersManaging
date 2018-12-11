import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { deleteUserFromFirebase, highligthChosenElement, onDeleteHoverHighlight, onEditHoverHighlight, State } from '../../module';
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
    redirect: push
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowUsersList);
