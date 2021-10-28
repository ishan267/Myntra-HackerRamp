var socket = io();

socket.on('connect',()=>{
  var params = jQuery.deparam(window.location.search);

  socket.emit('get-chat-list',params,chat_list=>{
      var ol = jQuery('<ol></ol>');
    
      chat_list.forEach(user=>{
        ol.append(jQuery('<li></li>').text(user));
      })
      jQuery('#users').html(ol);
  })
});

socket.on('disconnect',()=>{
    console.log('disconnected from the server');
});


function scrollToBottom(){
     //Selectors
      var messages = jQuery('#messages');
      var newMessage = messages.children('li:last-child');
     //Heights
     var clientHeight = messages.prop('clientHeight');
     var scrollTop = messages.prop('scrollTop');
     var scrollHeight = messages.prop('scrollHeight');
     var newMessageHeight = newMessage.innerHeight();
     var lastMessageHeight = newMessage.prev().innerHeight();

     if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
      messages.scrollTop(scrollHeight);
     }
}

socket.on('newMessage',(message)=>{
       var formattedTime = moment(message.createAt).format('h:mm a');
       var template = jQuery('#message-template').html();
       var html = Mustache.render(template,{
           text: message.text,
           from: message.from,
           createAt: formattedTime
       });

   jQuery('#messages').append(html);
   scrollToBottom();
});

jQuery('#message-form').on('submit',(e)=>{
   e.preventDefault();  //preventing the default behaviour of submit button
   
   var sender_id = jQuery('[name=sen_id]');
   var messageTextBox = jQuery('[name=message]');
   var tag_ = jQuery('[name=tag]');
   var receiver_id = jQuery('[name=rec_id]');

   socket.emit('createMessage',{
        mid: new Date().getTime(),
        sen_id: sender_id.val(),
        msg: messageTextBox.val(),
        tag: tag_.val(),
        rec_id: receiver_id.val()
   },function(){
       messageTextBox.val('');
   })
});
