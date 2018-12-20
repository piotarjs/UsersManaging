import { connect } from 'react-redux';
import { getFileName, State } from '../../module';
import UploadFile from './UploadFile';

const mapStateToProps = ({ firebase: { fileName } }: State) => ({
    fileName
});

const mapDispatchToProps = {
    getFileName
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadFile) as any;
