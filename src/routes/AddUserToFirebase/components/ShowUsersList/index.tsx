import { connect } from 'react-redux';
import { deleteUserFromFirebase, highligthChosenElement, onDeleteHoverHighlight, onEditHoverHighlight, redirect, sortUsersList, State } from '../../../../module';
import ShowUsersList from './ShowUsersList';


const mapStateToProps = ({ firebase: {  listElementIsEdited, sortingOrder, sortColumn, listElementToDelete, listElementToEdit, usersFiltered, usersSorted } }: State) => ({
    listElementIsEdited,
    listElementToDelete,
    listElementToEdit,
    sortColumn,
    sortingOrder,
    usersFiltered,
    usersSorted
});

const mapDispatchToProps = {
    deleteUserFromFirebase,
    highligthChosenElement,
    onDeleteHoverHighlight,
    onEditHoverHighlight,
    redirect,
    sortUsersList
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowUsersList);
