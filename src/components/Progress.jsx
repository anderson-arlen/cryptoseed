import React, {PropTypes} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

import LinearProgress from 'material-ui/LinearProgress';

class Progress extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {isLoading, muiTheme} = this.props;

		if (!isLoading) return null;

		return (
			<div style={{position: 'absolute', left: 0, right: 0}}>
				<div style={{margin: 5, color: muiTheme.palette.primary3Color}}>
					{'Hashing... this could take awhile'}
				</div>
				<LinearProgress mode="indeterminate"/>
			</div>
		);
	}
}

Progress.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	muiTheme: PropTypes.object.isRequired
};

export default muiThemeable()(Progress);
