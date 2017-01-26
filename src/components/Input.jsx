import React, {PropTypes} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

function requiredField(field) {
	if (field.length < 1)
		return 'Required Field';
}

class Input extends React.Component {
	constructor(props) {
		super(props);
		this.handleChangeInput = this.handleChangeInput.bind(this);
		this.handleShowPassword = this.handleShowPassword.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleEncrypt = this.handleEncrypt.bind(this);
		this.handleDecrypt = this.handleDecrypt.bind(this);

		this.state = {
			input: 'click here to enter your recovery seed it should be space separated words alternatively paste your recovery hash here and hit decrypt',
			password: ''
		};
	}

	handleChangeInput(e) {
		this.setState({
			inputError: requiredField(e.target.value),
			input: e.target.value
		});
	}

	handleShowPassword(obj, showPassword) {
		this.setState({
			showPassword
		});
	}

	handleChangePassword(e) {
		this.setState({
			passwordError: requiredField(e.target.value),
			password: e.target.value
		});
	}

	handleEncrypt() {
		const
			{input, password} = this.state,
			inputError = requiredField(input),
			passwordError = requiredField(password);

		if (inputError || passwordError) {
			return this.setState({
				inputError,
				passwordError
			});
		}

		this.setState({
			inputError: null,
			passwordError: null
		});

		return this.props.onEncrypt(input, password);
	}

	handleDecrypt() {
		const
			{input, password} = this.state,
			inputError = requiredField(input),
			passwordError = requiredField(password);

		if (inputError || passwordError) {
			return this.setState({
				inputError,
				passwordError
			});
		}

		const
			test = input.split('|'),
			test2 = input.split(':');

		if (test.length !== 3 && test2.length !== 3) {
			return this.setState({
				inputError: 'Invalid hash'
			});
		}

		this.setState({
			inputError: null,
			passwordError: null
		});

		return this.props.onDecrypt(input, password);
	}

	render() {
		const
			{
				input, passwordError,
				inputError, showPassword
			} = this.state,
			{disabled} = this.props;

		return (
			<div className="row center-xs">
				<div className="col-xs-6 start-xs">
					<TextField
						floatingLabelText="Recovery Seed"
						onChange={this.handleChangeInput}
						value={input}
						multiLine={true}
						fullWidth={true}
						errorText={inputError}
						disabled={disabled}
						/>
				</div>
				<div className="col-xs-6">
					<div className="row center-xs">
						<TextField
							onChange={this.handleChangePassword}
							floatingLabelText="Password"
							type={showPassword ? 'text' : 'password'}
							fullWidth={true}
							disabled={disabled}
							errorText={passwordError}/>
					</div>
					<div className="row center-xs">
						<Checkbox
							label="Show Password"
							defaultChecked={showPassword}
							onCheck={this.handleShowPassword}
							disabled={disabled}
							style={{maxWidth: 250, margin: 15}}/>
					</div>
					<div className="row center-xs">
						<FlatButton
							label="Encrypt"
							primary={true}
							onClick={this.handleEncrypt}
							disabled={disabled}
							style={{margin: 12}}/>
						<FlatButton
							label="Decrypt"
							secondary={true}
							onClick={this.handleDecrypt}
							disabled={disabled}
							style={{margin: 12}}/>
					</div>
				</div>
			</div>
		);
	}
}

Input.propTypes = {
	onEncrypt: PropTypes.func.isRequired,
	onDecrypt: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	muiTheme: PropTypes.object.isRequired
};

export default muiThemeable()(Input);
