//module.exports=function(arr,req){
const fun = function(arr,req){
	const {name,sound}=req.body;
	arr.push({name,sound});
}

module.exports = fun;
