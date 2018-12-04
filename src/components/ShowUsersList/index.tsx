import { connect } from 'react-redux';
import { redirect, State } from '../../module';
import ShowUsersList from './ShowUsersList';


const mapStateToProps = ({ firebase: {  users } }: State) => ({
    users
});

const mapDispatchToProps = {
    redirect
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowUsersList);
