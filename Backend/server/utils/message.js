var moment = require('moment');

var generateMessage = (id,senderId,text,tag,receiverId)=>{
	return {
		id,senderId,text,tag,receiverId,createdAt:moment().valueOf()
	};
};

module.exports = {generateMessage};