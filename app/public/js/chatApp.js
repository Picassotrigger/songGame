var socket = io();

socket.on('connect', function() {
  var chatForm = document.forms.chatForm;

  if(chatForm) {
    var chatUser = document.querySelector('#chat-user');
    var chatMessage = document.querySelector('#chat-message');

    chatForm.addEventListener('submit', function(event) {
      event.preventDefault();

      socket.emit('postMessage', {
        username: chatUser.value,
        message: chatMessage.value
      });

      // showMessage({
      //   username: chatUser.value,
      //   message: chatMessage.value
      // });

      chatMessage.value = '';
      chatMessage.focus();
    });

    socket.on('updateMessages', function(data) {
      showMessage(data);
    });
  }
});


function showMessage(data) {
  var chatDisplay = document.querySelector('.chat-display');
  var newMessage = document.createElement('p');

  newMessage.className = 'chat-text';
  newMessage.innerHTML = '<strong>' + data.username + '</strong>' + "     " + data.message;

  chatDisplay.insertBefore(newMessage, chatDisplay.firstChild);
}
