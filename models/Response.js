function Response(code,object){
	var res = {
		'code' : code,
		'data' : object
	};
	return res;
}

module.exports = Response;