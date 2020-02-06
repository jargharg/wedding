const functions = require('firebase-functions');
const request = require('request');

exports.postToGoogleForm = functions.https.onRequest(({ body, method }, response) => {
	response.set('Access-Control-Allow-Origin', 'http://localhost:8080');
	response.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
	response.set('Access-Control-Allow-Headers', 'Content-Type');

	if (method === 'OPTIONS') {
		response.end();
		return;
	}

	const { guest, emailAddress, additionalDetails, guestType } = body;

	const missingFields = [];

	if (!guest) {
		missingFields.push('guest');
	} else {
		if (!guest.name) missingFields.push('guest.name');
		if (!guest.attending) missingFields.push('guest.attending');
	}

	if (!emailAddress) missingFields.push('emailAddress');

	if (missingFields.length) {
		response.status(400).send({
			errorMessage: 'Missing fields in body',
			missingFields: missingFields,
		});
		return;
	}

	const form = {
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

	const mappedFields = {
		[form.fields.name]: guest.name,
		[form.fields.attending]: guest.attending,
		[form.fields.emailAddress]: emailAddress,
		[form.fields.additionalDetails]: additionalDetails,
		[form.fields.guestType]: guestType,
	};

	const params = Object.entries(mappedFields).reduce((acc, [fieldName, value]) => {
		return `${acc}&${fieldName}=${value}`;
	}, '');

	const url = encodeURI(`${form.baseUrl}?${params}`);

	return request.post({ url, headers: form.headers }, (error, postResponse) => {
		if (postResponse.statusCode === 200) {
			response.status(201).send();
			return;
		}

		response.status(400).send(error);
		return;
	});
});
