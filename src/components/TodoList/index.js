import TodoList from './TodoList';
import { connect } from 'react-redux';
import { deleteItem, findPending } from '../../module';


const mapStateToProps = ({items, isLoading, isError}) => ({
    items,
    isLoading,
    isError
});

const mapDispatchToProps = {
    deleteItem,
    findPending
    //getList
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);