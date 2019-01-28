const seedAddress = require('./seedAddress');
const seedPerson = require('./seedPerson');
const seedAnimal = require('./seedAnimal')

module.exports = {
	note: "This is a very simple example NodeJS app that uses TransomJS and the Mongoose module.",
	name: "My Mongoose Example App",
	transom: {},
	definition: {
		mongoose: {
/*
This works great. My collations below are not. Wth?
db.getCollection('address').find({}, {city: 1}).sort({city: 1}).collation({locale: 'en', caseFirst: 'lower', caseLevel: true})
*/
			collations: {
				default: { locale: 'simple' }, // A-Z, a-z
				usorted: { locale: 'en', caseFirst: 'upper', caseLevel: true }, // A,a - Z,z
				lsorted: { locale: 'en', caseFirst: 'lower', caseLevel: true } // a,A - z,Z
			  },		
			entities: {
				address: {
					collation: 'lsorted',
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
					collation: 'default',
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
							type: "objectid",
							ref: "address"
						},
						shippingaddress: {
							name: "Shipping Address",
							required: false,
							type: "objectid",
							ref: "address"
						},
						addresses: {
							type: ['objectid'],
							ref: 'address'
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