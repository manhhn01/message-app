const models = require('../models');
module.exports = (io, socket) => {
  socket.on('message', async (message) => {
    const { user } = socket.data;
    console.log(message, user.id);
    const conversation = await models.Conversation.findOne({
      where: {
        id: message.conversationId,
      },
    });

    const newMessage = await conversation.createMessage({
      message: message.message,
      senderId: user.id,
    });
    newMessage.setDataValue('User', await newMessage.getUser());
    newMessage.setDataValue('Conversation', await newMessage.getConversation());

    io.to(conversation.slug).emit('message', newMessage.toJSON());
  });
};
