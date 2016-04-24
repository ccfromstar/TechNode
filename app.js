var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname+'/static'));

app.use(function(req,res){
	res.sendfile('./static/index.html');
});

var io = require('socket.io').listen(app.listen(port));

var messages = [];

io.sockets.on('connection',function(socket){
	/*连接socket服务器之后获取所有的消息列表*/
	socket.on('getAllMessages',function(){
		socket.emit('allMessages',messages);
	});
	/*创建了新的消息广播到所有用户(包括自己)*/
	socket.on('createMessage',function(message){
		messages.push(message);
		io.sockets.emit('messageAdded',message);
	});
});

console.log('TechNode is on port '+port+'!');
