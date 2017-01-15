import React, {PropTypes} from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

import {Card, CardText} from 'material-ui/Card';

import Input from '../components/Input';
import ErrorMessage from '../components/Error';
import Progress from '../components/Progress';
import Encrypted from '../components/Encrypted';
import Decrypted from '../components/Decrypted';
import Footer from '../components/Footer';

const
	qr = require('qr-image'),
	bluebird = require('bluebird'),
	crypto = require('crypto'), // use node's crypto
	createCipheriv = crypto.createCipheriv,
	createDecipheriv = crypto.createDecipheriv,
	pbkdf2 = bluebird.promisify(crypto.pbkdf2),
	randomBytes = bluebird.promisify(crypto.randomBytes);

class Application extends React.Component {
	constructor(props) {
		super(props);

		this.handleEncrypt = this.handleEncrypt.bind(this);
		this.handleDecrypt = this.handleDecrypt.bind(this);
		this.state = {
			thinking: false
		};
	}

	async handleEncrypt(input, password) {
		this.setState({
			thinking: true,
			encrypted: null,
			decrypted: null,
			error: null
		});

		let key, hashedIv, cipher, encrypted, blob, qrcode;
		const
			salt = await randomBytes(32),
			iv = await randomBytes(32);


		try {
			key = await pbkdf2(password, salt, 1000000, 32, 'sha512');
			hashedIv = await pbkdf2(iv, salt, 1000000, 16, 'sha512');
			cipher = createCipheriv('aes256', key, hashedIv);
			encrypted = cipher.update(input, 'utf8', 'base64') + cipher.final('base64');
			blob = `${salt.toString('base64')}:${iv.toString('base64')}:${encrypted}`;
			qrcode = qr.imageSync(blob);
		} catch (e) {
			return this.setState({
				error: 'Something Went Wrong',
				thinking: false,
				decrypted: null,
				encrypted: null,
				qrcode: null
			});
		}

		this.setState({
			thinking: false,
			decrypted: null,
			encrypted: blob,
			qrcode
		});
	}

	async handleDecrypt(input, password) {
		this.setState({
			thinking: true,
			encrypted: null,
			decrypted: null,
			error: null
		});

		let decrypted,
			[salt, iv, encrypted] = input.split(':'), //eslint-disable-line prefer-const
			key, hashedIv, decipher;

		try {

			salt = Buffer.from(salt, 'base64');
			iv = Buffer.from(iv, 'base64');


			key = await pbkdf2(password, salt, 1000000, 32, 'sha512');
			hashedIv = await pbkdf2(iv, salt, 1000000, 16, 'sha512');
			decipher = createDecipheriv('aes256', key, hashedIv);
			decrypted = decipher.update(encrypted, 'base64', 'utf8') + decipher.final('utf8');
		} catch (e) {
			return this.setState({
				error: 'Invalid Password or Data',
				thinking: false,
				decrypted: null,
				qrcode: null
			});
		}

		this.setState({
			error: null,
			thinking: false,
			encrypted: null,
			decrypted,
			qrcode: null
		});
	}

	render() {
		const {encrypted, decrypted, thinking, qrcode, error} = this.state;
		
		return (
			<div>
				<div className="row center-xs" style={{margin: 25}}>
					<Card className="col-xs col-md-9">
						<CardText style={{position: 'relative'}}>
							<Input onEncrypt={this.handleEncrypt} onDecrypt={this.handleDecrypt} disabled={thinking}/>
							<Progress isLoading={thinking}/>
							<ErrorMessage error={error}/>
							<div style={{margin: 25}}></div>
							<Encrypted output={encrypted} qrcode={qrcode}/>
							<Decrypted output={decrypted}/>
						</CardText>
					</Card>
				</div>
				<Footer/>
			</div>
		);
	}
}

Application.propTypes = {
	muiTheme: PropTypes.object.isRequired
};

export default muiThemeable()(Application);
