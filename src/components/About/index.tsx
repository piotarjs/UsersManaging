import { connect } from 'react-redux';
import { redirect } from '../../module';
import About from './About';



const mapStateToProps = ({ firebase: { isError, isLoading, users } }) => ({
    isError,
    isLoading,
    users
});

const mapDispatchToProps = {
    redirect
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
