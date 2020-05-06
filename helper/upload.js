var multer = require('multer');
var path = require('path')
var random = require('crypto').randomBytes(32).toString('hex');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname + './../public/images/'))
    },
    filename: function (req, file, cb) {
        let ext = file.mimetype.split('/')[1]
        let nameFile = random + '.' + ext
        cb(null, nameFile)
    }
})
var upload = multer({storage: storage});

module.exports = upload;