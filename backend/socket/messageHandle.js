const models = require('../models');
module.exports = (io, socket) => {
  socket.on('message', async (data) => {
    const { user } = socket.data;
    console.log(data, user.id);
    const conversation = await models.Conversation.findOne({
      where: {
        id: data.conversationId,
      },
    });

    const newMessage = await conversation.createMessage({
      message: data.message,
      senderId: user.id,
      isImage: data.isImage,
    });
    newMessage.setDataValue('User', await newMessage.getUser());
    newMessage.setDataValue('Conversation', await newMessage.getConversation());

    io.to(conversation.slug).emit('message', newMessage.toJSON());
  });
};
