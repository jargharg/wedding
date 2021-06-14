const functions = require('firebase-functions');
const fetch = require('node-fetch');

exports.postToGoogleForm = functions.https.onCall(
	async ({ guest, emailAddress, additionalDetails, guestType }) => {
		let missingFields = [];

		if (!guest) {
			missingFields.push('guest');
		} else {
			if (!guest.name) missingFields.push('guest.name');
			if (!guest.attending) missingFields.push('guest.attending');
		}

		if (!emailAddress) missingFields.push('emailAddress');

		if (missingFields.length) {
			throw new functions.https.HttpsError(
				'invalid-argument',
				`Missing the following arguments: ${missingFields.join(', ')}`,
			);
		}

		let form = {
			baseUrl:
				'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeAPLkA1YAVkFCAgIt7YlM1SUVIcYTZhhTKIXif9d9nciEd6Q/formResponse',
			fields: {
				name: 'entry.1042661726',
				attending: 'entry.187353647',
				emailAddress: 'entry.1024004482',
				additionalDetails: 'entry.511653375',
				guestType: 'entry.442594185',
			},
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
		};

		let mappedFields = {
			[form.fields.name]: guest.name,
			[form.fields.attending]: guest.attending,
			[form.fields.emailAddress]: emailAddress,
			[form.fields.additionalDetails]: additionalDetails,
			[form.fields.guestType]: guestType,
		};

		let params = Object.entries(mappedFields).reduce((acc, [fieldName, value]) => {
			return `${acc}&${fieldName}=${value}`;
		}, '');

		let url = encodeURI(`${form.baseUrl}?${params}`);

		let searchResponse = await fetch(url, { headers: form.headers, method: 'POST' });

		if (!searchResponse.ok) {
			throw Error('Bad network request');
		}

		return;
	},
);
