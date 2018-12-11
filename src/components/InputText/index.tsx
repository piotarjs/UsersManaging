import { connect } from 'react-redux';
// import { State } from '../../module';
import changeInputValueInEditing from '../../module';

import InputText from './InputText'


const mapStateToProps = ({ firebase: { user } }) => ({
    user
});
const mapDispatchToProps = {
    changeInputValueInEditing
};

export default connect(mapStateToProps, mapDispatchToProps)(InputText) as any;
