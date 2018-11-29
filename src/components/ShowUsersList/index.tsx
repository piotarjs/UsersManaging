import { connect } from 'react-redux';
import { redirect } from '../../module';
import ShowUsersList from './ShowUsersList';


const mapStateToProps = ({ firebase: {  users } }) => ({
    users
});

const mapDispatchToProps = {
    redirect
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowUsersList);
