import { connect } from 'react-redux';
import { State } from '../../../../module';
import UploadFile from './UploadFile';

const mapStateToProps = ({ firebase: { inputFileKey } }: State) => ({
    inputFileKey
});

export default connect(mapStateToProps, null)(UploadFile) as any;
