require('dotenv').config()
let models = require('../../models/index');
let { response } = require('../../helper/response');
let route = require('express').Router();
let { Validator } = require("node-input-validator")
let { v4: uuidv4} = require('uuid');
let { Op } = require('sequelize');
let upload = require('../../helper/upload');
let jimp = require('jimp');
let fs = require('fs'),
	path = require('path');

route.get('/', function(req, res) {
	

	if (req.query.q) {

		var q = req.query.q
		search(q)

		return
	}

	models
		.todo
		.findAll({
			where: {
				deleted: 0
			},
			order: [
				['createdAt', "DESC"]
			],
			attributes: {
				exclude: ['userId', 'categoryId', 'deleted', 'updatedAt']
			}
		})
		.then(result => {
			return response(res, 200, {data: result})
		})	

});

route.post('/', upload.array('thumbnail', 10), function(req, res) {

	let thumbnail = []
	req.files.forEach(valFile => {
		thumbnail.push(process.env.DOMAIN + 'images/' + valFile.filename)
		jimp.read(valFile.path)
			.then(image => {
				image
					.quality(90)
					.cover(300, 200)
					.write(valFile.path)
			})
	})

	let body = req.body.lenght > 0 ? req.body : [req.body];

	let validate = new Validator(body, {
		"*.do": "required"
	});
	
	validate.check().then(result => {
		if (!result) {
			return response(res, 422, validate.errors)
		}
	});

	let bodyInsert = body.map((valBody, index) => {
		return {
			id: uuidv4(),
			do: valBody.do,
			desc: valBody.desc,
			thumbnail: thumbnail[index],
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

route.put('/:todoId', upload.single('thumbnail'), function (req, res) {

	let validate = new Validator(req.body, {
		"*.do": "required"
	});

	validate
		.check()
		.then( valValidate => {
			if (!valValidate) {
				return response(res, 422, {errors: valValidate.errors})
			}
		});

	let { todoId } = req.params;
	let { 
		desc,
		thumbnail,
		accepted,
		categoryId,
	} = req.body;

	let filename = thumbnail
	if (req.file) {
		
		let path = path.join(__dirname + './../public/images/'),
			deletePath = (thumbnail !== null) ? thumbnail.split() : "";
		fs.unlinkSync(filePath)
		jimp
		.read(req.file.path)
		.then(valImage => {
			valImage
				.quality(90)
				.cover(300, 200)
				.write(req.file.path)
		})
		filename = process.env.DOMAIN + 'images/' + req.file.filename
	}

	

	models
		.todo
		.update({
				desc: desc,
				do: req.body.do,
				thumbnail:  filename,
				accepted: accepted,
				categoryId: categoryId,
				updatedAt: Date() 
			},
			{
				where: {
					id: todoId
				}
			}
		)
		.then(valRest => {
			if (!valRest) {
				return response(res, 422);
			}
			return response(res, 200);
		})

})

route.delete('/:todoId', function (req, res) {
	if (!req.params.todoId) {
		return response(res, 400);
	}
	let { todoId } = req.params
	models.todo.update(
		{
			deleted: 1
		}, {
			where: {
				id: todoId
			}
		}
	).then(valResult => {
		if (!valResult) {
			return response(res, 422)
		}
		return response(res, 200)
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
		where: {
			deleted: 0,
			...clause
		}
	}).then(result => {
		console.log(result)
	})
}

module.exports = route