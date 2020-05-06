require('dotenv').config();
let jwt = require('jsonwebtoken');
let { response } = require('./helper/response');
let route = require('express').Router();

function fetchToken(token) {
    // jumlah character string yang perlu di hapus
    let numberBit = 256

    // memisahkan token string dari tanda titik
    let tokenArray = token.split('.')
  
    // menghapus character dari string 
    tokenArray[1] = tokenArray[1].substring(0, tokenArray[1].length - numberBit)
  
    // menyatukan semua token array
    let finishToken = tokenArray.toString().replace(/,/g, '.')
  
    // cek token
    try {
      const fetching = jwt.verify(finishToken, process.env.ACCESS_TOKEN)
      return fetching
    } catch {
      return false
    }
}

route.use(function(req, res, next) {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let match = fetchToken(token);
        if (!match) {
            return response(res, 401);
        }
        next();
    } catch (e) {
        return response(res, 401);
    }
    
})
