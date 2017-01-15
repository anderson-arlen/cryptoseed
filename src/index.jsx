import React from 'react'; // eslint-disable-line no-unused-vars
import polyfill from 'babel-polyfill'; // eslint-disable-line no-unused-vars
import {render} from 'react-dom';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Application from './containers/Application';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const root =
		<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
			<Application />
		</MuiThemeProvider>
	;
render(root, document.getElementById('root'));
