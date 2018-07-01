const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const ManagerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
	},
	name: {
		trim: true,
		type: String,
	},
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
        type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
},{
    usePushEach: true
});


// ManagerSchema.methods.toJSON = function () {
// 	let manager = this;
//   	let managerObject = manager.toObject();
// 		return _.pick(managerObject, ['_id', 'email']);
// };



ManagerSchema.methods.generateAuthToken = function () {
	let manager = this;
	let access = 'auth';
	let token = jwt.sign({_id: manager._id.toHexString(), access}, 'abc123').toString();

	manager.tokens.push({access, token});

	return manager.save().then(() => {
		return token;
	});
};


ManagerSchema.statics.removeToken = function (token) {
	let manager = this;
	
    return manager.update({
        $pull: {
            tokens: {token}
        }
    });
};

ManagerSchema.statics.findByToken = function (token) {
	let manager = this;
	let decoded;

	try {
		decoded = jwt.verify(token, 'abc123');
	} catch (e) {
		return Promise.reject();
	}

	return manager.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};



ManagerSchema.statics.findByCredentials = function (email, password) {
	var manager = this;

	return manager.findOne({email}).then((manager_response) => {
		if (!manager_response) {
			return Promise.reject();
		}
		return new Promise((resolve, reject) => {
			// Use bcrypt.compare to compare password and user.password
			bcrypt.compare(password, manager_response.password, (err, res) => {
				if (res) {
					resolve(manager_response);
				} else {
					reject();
				}
			});
		});
	});
};

ManagerSchema.pre('save', function (next) {
	let manager = this;

	if (manager.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(manager.password, salt, (err, hash) => {
				manager.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

let Manager = mongoose.model('Manager', ManagerSchema);

module.exports = {Manager};