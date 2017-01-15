import React, {PropTypes} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

class ErrorMessage extends React.Component {
	constructor(props) {
		super(props);

		this.style = {
			color: 'rgb(244, 67, 54)',
			marginTop: 10,
			position: 'absolute',
			left: 0,
			right: 0
		};
	}

	render() {
		const {error} = this.props;

		if (!error) return null;

		return (
			<div className="row center-xs" style={this.style}>
				{error}
			</div>
		);
	}
}

ErrorMessage.propTypes = {
	error: PropTypes.string,
	muiTheme: PropTypes.object.isRequired
};

export default muiThemeable()(ErrorMessage);
