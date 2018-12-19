import { connect } from 'react-redux';
import { State } from '../../../../module';
import InputText from './InputText'

const mapStateToProps = ({ firebase: { user } }: State) => ({
    user
});

export default connect(mapStateToProps, null)(InputText) as any;
