let listStatus = [
    [20001, 200, "Request Success", "1"],
    [20002, 200, "Sign Up Success", "1"],
    [20003, 200, "Logged", "1"],
    [40401, 404, "Username or Password is not Valid", "0"],
  
    [100, 100, "Continue"],
    [101, 101, "Switching Protocols"],
    [102, 102, "Processing"],
    [200, 200, "OK", "1"],
    [201, 201, "Created", "1"],
    [202, 202, "Accepted", "1"],
    [203, 203, "Non-authoritative Information", "1"],
    [204, 204, "No Content", "1"],
    [205, 205, "Reset Content", "1"],
    [206, 206, "Partial Content", "1"],
    [207, 207, "Multi-Status", "1"],
    [208, 208, "Already Reported", "1"],
    [226, 226, "IM Used", "1"],
    [300, 300, "Multiple Choices"],
    [301, 301, "Moved Permanently"],
    [302, 302, "Found"],
    [303, 303, "See Other"],
    [304, 304, "Not Modified"],
    [305, 305, "Use Proxy"],
    [307, 307, "Temporary Redirect"],
    [308, 308, "Permanent Redirect"],
    [400, 400, "Bad Request", "0"],
    [401, 401, "Unauthorized", "0"],
    [402, 402, "Payment Required", "0"],
    [403, 403, "Forbidden", "0"],
    [404, 404, "Not Found", "0"],
    [405, 405, "Method Not Allowed", "0"],
    [406, 406, "Not Acceptable", "0"],
    [407, 407, "Proxy Authentication Required", "0"],
    [408, 408, "Request Timeout", "0"],
    [409, 409, "Conflict", "0"],
    [410, 410, "Gone", "0"],
    [411, 411, "Length Required", "0"],
    [412, 412, "Precondition Failed", "0"],
    [413, 413, "Payload Too Large", "0"],
    [414, 414, "Request-URI Too Long", "0"],
    [415, 415, "Unsupported Media Type", "0"],
    [416, 416, "Requested Range Not Satisfiable", "0"],
    [417, 417, "Expectation Failed", "0"],
    [418, 418, "I'm a teapot", "0"],
    [421, 421, "Misdirected Request", "0"],
    [422, 422, "Unprocessable Entity", "0"],
    [423, 423, "Locked", "0"],
    [424, 424, "Failed Dependency", "0"],
    [426, 426, "Upgrade Required", "0"],
    [428, 428, "Precondition Required", "0"],
    [429, 429, "Too Many Requests", "0"],
    [431, 431, "Request Header Fields Too Large", "0"],
    [444, 444, "Connection Closed Without Response", "0"],
    [451, 451, "Unavailable For Legal Reasons", "0"],
    [499, 499, "Client Closed Request", "0"],
    [500, 500, "Internal Server Error", "0"],
    [501, 501, "Not Implemented", "0"],
    [502, 502, "Bad Gateway", "0"],
    [503, 503, "Service Unavailable", "0"],
    [504, 504, "Gateway Timeout", "0"],
    [505, 505, "HTTP Version Not Supported", "0"],
    [506, 506, "Variant Also Negotiates", "0"],
    [507, 507, "Insufficient Storage", "0"],
    [508, 508, "Loop Detected", "0"],
    [510, 510, "Not Extended", "0"],
    [511, 511, "Network Authentication Required", "0"],
    [599, 599, "Network Connect Timeout Error, 0"]
  ]
  
  exports.response = function(res, response, data) {
    let ob = {}
    for (let index = 0; index < listStatus.length; index++) {
      if (listStatus[index][0] === response) {
        ob.status = listStatus[index][1]
        ob.message = listStatus[index][2]
        ob.success = listStatus[index][3] ? { success : parseInt(listStatus[index][3])} : undefined
        break
      }
    }
    return res.status(ob.status).json({
      message: ob.message,
      ...ob.success,
      ...data
    })
  }