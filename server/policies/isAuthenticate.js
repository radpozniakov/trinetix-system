const {Manager} = require('../models/manager.model')

let authenticate = (req, res, next) => {
	let token = req.session.xAuth;

	Manager.findByToken(token).then((manager_response) => {
		if (!manager_response) {
			return Promise.reject();
		}
		req.manager = manager_response;
		req.token = token;
		next();
	}).catch((e) => {
		res.send('Ошибка аутентификации')
	});
};

module.exports = {authenticate };