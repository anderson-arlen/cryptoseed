CryptoSeed
===================
### Secure your bitcoin recovery seed.

Writing down your BIP32 recovery seeds on plain paper might be solid electronic security, but terrible physical security. Not everyone has a safe they can keep stuff like that in. CryptoSeed encrypts your recovery seed with AES256 and encodes the encrypted data into a QR Code which you can print out and keep anywhere.

why pay for other solutions that still leave your seed in plain text when you can print out and laminate a business card with your encrypted recovery seed on it for free. You could keep a copy in your wallet, or in a safe, or even hide it in plain sight.

When it comes time to use your recovery seed, just scan the QR Code with your phone and decrypt it with CryptoSeed.

----------


How secure is it?
-------------

Your recovery seed is encrypted with the [Cipher Block Chaining (CBC)](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#CBC) mode of the [Advanced Encryption Standard](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) with a 256 bit key length. Your key is generated using a password of your choice and a random salt, hashed 1 million times with [pbkdf2](https://en.wikipedia.org/wiki/PBKDF2). The CBC [Initialization Vector](https://en.wikipedia.org/wiki/Initialization_vector) is randomly generated and hashed with the same salt another 1 million times. Encrypting the same data with the same key will yield a different result every time.

**If you forget your password, your seed is lost. There is no recovery.**

Whenever you type anything on a computer connected to the internet, you run the inherent risk of your information being exposed by keyloggers, viruses, and other attack vectors. This risk can be mitigated by using an offline computer or by simply typing in your recovery phrase out of order and rearranging them with the mouse afterword. Another good option would be to use a distro like [Qubes](https://www.qubes-os.org/).

No matter what you do there is risk, but once encrypted your seed is pretty safe.

-----------------------------------

Installation
------------

#### Development install
```shell
	git clone git@github.com:anderson-arlen/cryptoseed.git
	cd cryptoseed
	npm install && npm start
```

#### Build
```shell
	npm run pack:linux
	npm run pack:windows
```

-----------------------------------

Cryptography Notice
-------------------
This distribution includes cryptographic software. The country in which you currently reside may have restrictions on the import, possession, use, and/or re-export to another country, of encryption software. BEFORE using any encryption software, please check your country's laws, regulations and policies concerning the import, possession, or use, and re-export of encryption software, to see if this is permitted. See http://www.wassenaar.org/ for more information.

The U.S. Government Department of Commerce, Bureau of Industry and Security (BIS), classifies this software as 5D002. The form and manner of this distribution makes it eligible for export under the License Exception ENC Technology Software Unrestricted (TSU) exception (see the BIS Export Administration Regulations, Section 740.13(e)) for both object code and source code.

---------------------------------

License
-------
Copyright (c) 2016 Arlen Anderson

License under The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

**THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.**

-------------------------------------

Donate
------
Bitcoin: 1LPCKLyrqFRjQ8yZRyBdAo3yr5Cx6Sb37F
