const functions = require('firebase-functions');
const request = require('request');
const cors = require('cors')({ origin: true });

exports.postToGoogleForm = functions.https.onRequest((req, res) => {
	return cors({ body, method }, res, () => {
		if (method !== 'POST') {
			res.status(400).send({ errorMessage: 'Method not allowed' });
			return;
		}

		const { guests, emailAddress, additionalDetails, guestType } = body;

		const missingFields = [];

		if (!guests) missingFields.push('guests');
		if (!emailAddress) missingFields.push('emailAddress');
		if (!additionalDetails) missingFields.push('additionalDetails');
		if (!guestType) missingFields.push('guestType');

		if (missingFields.length) {
			res.status(400).send({
				errorMessage: 'Missing fields in body',
				missingFields: missingFields,
			});
			return;
		}

		const missingGuestFields = guests.filter(({ name, attending }) => !name || !attending);

		if (missingGuestFields.length) {
			res.status(400).send({
				errorMessage: 'Missing fields for guests',
				missingGuestFields: missingGuestFields,
			});
			return;
		}
		const form = {
			baseUrl:
				'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeAPLkA1YAVkFCAgIt7YlM1SUVIcYTZhhTKIXif9d9nciEd6Q/formres',
			fields: {
				names: 'entry.1042661726',
				rsvps: 'entry.187353647',
				emailAddress: 'entry.1024004482',
				additionalDetails: 'entry.511653375',
				guestType: 'entry.442594185',
			},
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
		};

		const mappedFields = {
			[form.fields.names]: guests.map(guest => guest.name).join(', '),
			[form.fields.rsvps]: guests.map(guest => guest.attending).join(', '),
			[form.fields.emailAddress]: emailAddress,
			[form.fields.additionalDetails]: additionalDetails,
			[form.fields.guestType]: guestType,
		};

		const params = Object.entries(mappedFields).reduce((acc, [fieldName, value]) => {
			return `${acc}&${fieldName}=${value}`;
		}, '');

		const url = encodeURI(`${form.baseUrl}?${params}`);

		return request.post({ url, headers: form.headers }, (error, res) => {
			if (res.statusCode === 200) {
				res.status(201).send();
				return;
			}

			res.status(400).send(error);
			return;
		});
	});
});
