import { connect } from 'react-redux';
import { redirect } from '../../module';
import About from './About';

const mapDispatchToProps = {
    redirect
};

export default connect(null, mapDispatchToProps)(About);
