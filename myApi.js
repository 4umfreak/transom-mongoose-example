const seedAddress = require('./seedAddress');
const seedPerson = require('./seedPerson');
const seedAnimal = require('./seedAnimal')

module.exports = {
	note: "This is a very simple example NodeJS app that uses TransomJS and the Mongoose module.",
	name: "My Mongoose Example App",
	transom: {},
	definition: {
		mongoose: {
			entities: {
				address: {
					acl: false,
					attributes: {
						address_line1: {
							name: "Address Line 1",
							required: true,
							textsearch: 10,
							type: "string",
							default: "123 Default Street"
						},
						address_line2: {
							name: "Address Line 2",
							required: true,
							textsearch: 10,
							type: "string",
							default: "Apartment B3"
						},
						city: {
							name: "City"
						},
						country: "string"
					},
					seed: seedAddress.data
				},
				person: {
					seed: seedPerson.data,
					acl: false,
					audit: false,
					attributes: {
						lastname: {
							order: 200,
							csv: false
						},
						firstname: {
							name: "First Name",
							required: true,
							type: "string",
							order: 100,
							min: 2,
							max: 10
						},
						last_visit: {
							type: "date",
							default: function () {
								return new Date();
							},
							order: 260
						},
						balance: {
							type: "number",
							required: true,
							default: function () {
								return new Date().getUTCMinutes();
							},
							min: 100,
							max: 9999,
							order: 200
						},
						billingaddress: {
							name: "Billing Address",
							required: false,
							type: "connector",
							connect_entity: "address"
						},
						shippingaddress: {
							name: "Shipping Address",
							required: false,
							connect_entity: "address",
							type: "connector"
						}
					}
				},			
				Animals: {
					audit: false,
					csv: false,
					attributes: {
						name: "string",
						license: "number",
						species: "string"
					},
					seed: seedAnimal()
				}			
			}
		}
	}
};