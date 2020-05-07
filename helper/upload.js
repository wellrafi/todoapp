var multer = require('multer');
var path = require('path')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname + './../public/images/'))
    },
    filename: function (req, file, cb) {
        console.log(file)
        let ext = file.mimetype.split('/')[1]
        let nameFile = Math.random(30).toString().replace('0.', "wellrafi") + Date.now().toString() + "." + ext 
        cb(null, nameFile)
    }
})
var upload = multer({storage: storage});

module.exports = upload;