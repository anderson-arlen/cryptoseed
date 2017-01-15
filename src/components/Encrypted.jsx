import React, {PropTypes} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import SaveIcon from 'material-ui/svg-icons/file/file-download';
import CopyIcon from 'material-ui/svg-icons/content/content-paste';

const
	{clipboard, ipcRenderer} = require('electron');

class Encrypted extends React.Component {
	constructor(props) {
		super(props);

		this.handleCopyOutput = this.handleCopyOutput.bind(this);
		this.handleSaveQrCode = this.handleSaveQrCode.bind(this);
		this.handleRequestClose = this.handleRequestClose.bind(this);

		ipcRenderer.on('saved-qrcode', (event, filename) => {
			this.setState({snackbar: `Saved to ${filename}`});
		});

		this.state = {
			snackbar: ''
		};
	}

	handleCopyOutput() {
		const {output} = this.props;

		clipboard.writeText(output);
		this.setState({snackbar: 'Copied to clipboard.'});
	}

	handleSaveQrCode() {
		const {qrcode} = this.props;

		ipcRenderer.send('save-qrcode', qrcode);
	}

	handleRequestClose() {
		this.setState({
			snackbar: ''
		});
	}

	render() {
		const {output, qrcode, muiTheme} = this.props;
		const {snackbar} = this.state;

		if (!output)
			return null;

		return (
			<div className="row center-xs">
				<Snackbar
					open={!!snackbar}
					message={snackbar}
					autoHideDuration={4000}
					onRequestClose={this.handleRequestClose}/>

				<h3 style={{color: muiTheme.palette.primary3Color}}>Encrypted Recovery Seed</h3>
				<div className="row middle-xs center-xs">
					<div className="col-xs-6">
						<div className="row center-xs">
							<img src={`data:image/png;base64,${qrcode.toString('base64')}`} style={{width: 250, height: 250}}/>
						</div>
						<div className="row center-xs">
							<FlatButton
								label="Save QR Code"
								primary={true}
								onClick={this.handleSaveQrCode}
								icon={<SaveIcon/>}
								style={{margin: 20}}/>
						</div>
					</div>
					<div className="col-xs-6" style={{color: muiTheme.palette.textColor, wordBreak: 'break-all'}}>
						<div className="row center-xs">
							{output}
						</div>
						<div className="row center-xs">
							<FlatButton
								label="Copy To Clipboard"
								primary={true}
								onClick={this.handleCopyOutput}
								icon={<CopyIcon/>}
								style={{margin: 20}}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Encrypted.propTypes = {
	output: PropTypes.string,
	qrcode: PropTypes.object,
	muiTheme: PropTypes.object.isRequired
};

export default muiThemeable()(Encrypted);
