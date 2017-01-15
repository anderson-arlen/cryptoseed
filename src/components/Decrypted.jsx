import React, {PropTypes} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

class Decrypted extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {output, muiTheme} = this.props;

		if (!output)
			return null;

		const
			col1 = [],
			col2 = [],
			words = output.trim().split(' '),
			columnLength = Math.floor(words.length / 2);

		let idx = 1;

		function buildRow(index, word) {
			return (
				<div key={index} className="row">
					<div className="col-xs" style={{textAlign: 'right', color: muiTheme.palette.primary2Color, padding: 0}}>
						{index}:
					</div>
					<div className="col-xs start-xs">
						{word}
					</div>
				</div>
			);
		}

		while(words.length > columnLength)
			col1.push(buildRow(idx++, words.shift()));

		while(words.length > 0)
			col2.push(buildRow(idx++, words.shift()));

		return (
			<div className="row center-xs">
				<div className="col-xs center-xs" style={{margin: 25, color: muiTheme.palette.textColor}}>
					<h3 style={{color: muiTheme.palette.primary3Color}}>Decrypted Recovery Seed</h3>
					<div className="row around-xs">
						<div className="col-xs">{col1}</div>
						<div className="col-xs">{col2}</div>
					</div>
				</div>
			</div>
		);
	}
}

Decrypted.propTypes = {
	output: PropTypes.string,
	muiTheme: PropTypes.object.isRequired
};

export default muiThemeable()(Decrypted);
