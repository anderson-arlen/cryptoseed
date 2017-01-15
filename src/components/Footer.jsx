import React, {PropTypes} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

import CodeIcon from 'material-ui/svg-icons/action/code';

const qr = require('qr-image');

class Footer extends React.Component {
	constructor(props) {
		super(props);

		const {muiTheme} = props;

		this.iconStyle = {
			width: 18,
			height: 18,
			color: muiTheme.palette.primary3Color
		};

		this.bitcoinAddr = '1LPCKLyrqFRjQ8yZRyBdAo3yr5Cx6Sb37F';

		this.state = {
			qrData: qr.imageSync(this.bitcoinAddr)
		};

		this.handleShowQrCode = this.handleShowQrCode.bind(this);
	}

	handleShowQrCode() {
		this.setState({
			showQrCode: !this.state.showQrCode
		});
	}

	render() {
		const
			{qrData, showQrCode} = this.state,
			{muiTheme} = this.props;

		let qrCode;

		if (showQrCode) {
			qrCode =
				<div className="row center-xs">
					<div className="col-xs">
						<div style={{color: muiTheme.palette.primary3Color, margin: 10}}>
							Bitcoin Donations welcome:

						</div>
						<img src={`data:image/png;base64,${qrData.toString('base64')}`} style={{width: 250, height: 250}}/>
					</div>
				</div>
			;
		}

		return (
			<div>
				<div className="row center-xs">
					<a href="https://github.com/anderson-arlen">
						<div className="row center-xs middle-xs">
							<CodeIcon style={this.iconStyle}/>&nbsp;by Arlen Anderson
						</div>
					</a>
				</div>
				<div className="row center-xs" style={{color: muiTheme.palette.borderColor, marginTop: 15}}>
					<a href="#" onClick={this.handleShowQrCode}>
						{this.bitcoinAddr}
					</a>
				</div>
				{qrCode}
			</div>
		);
	}
}

Footer.propTypes = {
	muiTheme: PropTypes.object.isRequired
};

export default muiThemeable()(Footer);
