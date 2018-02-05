

module.exports = {
	note: "This is a very simple example NodeJS app that uses TransomJS and the Mongoose module.",
	name: "My Mongoose Example App",
	transom: {},
	definition: {
		mongoose: {
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
					country: "Country"
				},
				seed: [
					{
						_id : "5938c9c8babe673a99ae53a1",
						city : "Victoria"
					},
					{
						_id : "5938c9c8babe673a99ae53a4",
						address_line1 : "998 Sunshine Terrace",
						city : "Victoria"
					},
					{
						_id : "5939a1fdbabe673a99ae53a5",
						address_line1 : "777 Fort Street",
						city : "Vancouver"
					},
					{
						_id : "5938c946babe673a99ae53a3",
						city : "Victoria",
						address_line1 : "1555 Humbolt St.",
						address_line2 : "Apt. 6A"
					},
					{
						_id : "5939a360babe673a99ae53a6",
						city : "Calgary",
						address_line1 : "PO Box #555",
						address_line2 : "Bay Street"
					}										
				]
			},
			person: {
				seed: [
					{
						firstname: "James",
						lastname: "Lotham",
						balance: 456,
						billingaddress: "5939a360babe673a99ae53a6",
						shippingaddress: "5938c946babe673a99ae53a3",
					},
					{
						firstname: "Pamela",
						lastname: "Hatley",
						balance: 785,
						billingaddress: "5939a1fdbabe673a99ae53a5",
						shippingaddress: "5938c946babe673a99ae53a3",
					},
					{
						firstname: "Jessica",
						lastname: "Walker",
						balance: 216,
						billingaddress: "5938c9c8babe673a99ae53a4",
						shippingaddress: "5938c946babe673a99ae53a3",
					},
					{
						firstname: "Alfred",
						lastname: "Kent",
						balance: 881,
						billingaddress: "5939a360babe673a99ae53a6",
						shippingaddress: "5938c9c8babe673a99ae53a4",
					},
					{
						firstname: "Kirk",
						lastname: "Peters",
						balance: 925,
						billingaddress: "5938c946babe673a99ae53a3",
						shippingaddress: "5938c946babe673a99ae53a3",
					},
				],
				acl: false,
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
			animals: {
				attributes: {
					name: "string",
					species: "string"
				},
				seed: [
					{
					  name: 'Black \'n Blue Beauty',
					  species: 'horse'
					},
					{
					  name: 'Old Yeller',
					  species: 'dog'
					},
					{
					  name: 'Flipper',
					  species: 'dolphin'
					}
				  ]
			}			
		}
	}
};