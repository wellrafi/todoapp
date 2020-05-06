let models = require('../../models/index');
let { response } = require('../../helper/response');
let route = require('express').Router();
let { Validator } = require("node-input-validator")
let { v4: uuidv4} = require('uuid');
let { Op } = require('sequelize')

route.get('/', function(res, res) {
	
	var q;
	if (req.query) {
		q = req.require.q
		search(q)
		return
	}

	models
		.todo
		.findAll({
			order: [
				['createdAt', "DESC"]
			]
		})
		.then(result => {
			return response(res, 200, result)
		})	

});

route.post('/', function(req, res) {
	let body = req.body.lenght > 0 ? req.body : [req.body];

	let validate = new Validator(body, {
		"*.title": "required"
	}).then(result => {
		if (!result) {
			return response(res, 422, validate.errors)
		}
	});

	let bodyInsert = body.map(valBody => {
		return {
			id: uuidv4(),
			do: valBody.do,
			desc: valBody.desc,
			thumbnail: null,
			accepted: 0,
			deleted: 0,
			categoryId: valBody.categoryId,
			userId: valBody.userId,
			createdAt: Date(),
			updatedAt: Date()
		}
	})

	models
		.todo
		.bulkCreate(bodyInsert)
		.then(result => {
			if (!result) {
				return response(res, 422);
			}
			return response(res, 201);
		});
	
})

route.put('/:todoId', function (req, res) {
	
	let { todoId } = req.params;

	models.todo.find({
		where: {
			id: todoId
		}
	})

})

function search(q) {

	let objects = Object.keys(q);
	let clause = objects.map(val => {
		let ob = {};
		ob[val] = { [Op.like] : q[val] + "%" };
		return ob;
	})

	models.todo.findAll({
		where: clause
	}).then(result => {
		console.log(result)
	})
}

module.exports = route