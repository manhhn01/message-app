import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  AiFillLike,
  AiOutlinePicture,
  AiOutlineSend,
  AiOutlineSmile,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../App';
import {
  getDisplayMessage,
  getDisplayTime,
  getMessageGroups,
} from '../../helpers';
import userAvatar from '../../images/user.png';
import { ImageService } from '../../services/ImageService';
import { toggleDropdown } from '../../slices/dropdownSlice';
import { setModal } from '../../slices/modalSlice';
import Button from '../Button';
import EmojiPicker from '../EmojiPicker';
import LazyImage from '../LazyImage';
import Header from './Header';
import styles from './style.module.css';
const cx = classNames.bind(styles);

function Chat() {
  const dispatch = useDispatch();

  const chatContentRef = useRef(null);
  const chatImageInputRef = useRef(null);
  const socketService = useContext(SocketContext);
  const auth = useSelector((state) => state.auth);
  const conversation = useSelector((state) => state.conversation);
  const [message, setMessage] = useState('');

  const handleMessageSend = (customMessage) => {
    if (customMessage) {
      socketService.sendMessage(customMessage, conversation.id);
    } else socketService.sendMessage(message, conversation.id);
    setMessage('');
  };

  useEffect(() => {
    if (conversation.id && chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [
    conversation.newConversation,
    conversation.newMember,
    conversation.id,
    conversation.Messages,
  ]);

  return (
    <div className={cx('chat')}>
      <Header />
      {!conversation.newConversation &&
        (conversation.id ? (
          conversation.Users.length > 1 || conversation.Messages.length > 0 ? (
            <div className={cx('chat-main')}>
              <div className={cx('chat-content')} ref={chatContentRef}>
                {getMessageGroups(conversation.Messages).map(
                  (messageGroup, index) => (
                    <div
                      className={cx('message-group', {
                        received: messageGroup[0]?.User?.id !== auth.user.id,
                      })}
                      key={index}
                    >
                      <div className={cx('sender-info')}>
                        <div>
                          <div
                            className={cx('sender-name')}
                          >{`${messageGroup[0]?.User?.firstName} ${messageGroup[0]?.User?.lastName}`}</div>
                          <div className={cx('timestamp')}>
                            {getDisplayTime(
                              new Date(messageGroup[0]?.createdAt),
                              true
                            )}
                          </div>
                        </div>
                        <img
                          className={cx('sender-avatar')}
                          src={messageGroup[0]?.User?.avatar || userAvatar}
                          alt={
                            messageGroup[0]?.User?.lastName + 
                            ' ' +
                            messageGroup[0]?.User?.firstName
                          }
                        />
                      </div>
                      <div className={cx('messages')}>
                        {messageGroup.map((message) =>
                          message.isImage ? (
                            <div
                              className={cx('message', 'message-image-wrapper')}
                              onClick={() =>
                                dispatch(
                                  setModal({
                                    name: 'preview-image',
                                    data: {
                                      url: message.message,
                                    },
                                  })
                                )
                              }
                              key={message.id}
                            >
                              <LazyImage
                                className={cx('message-image')}
                                src={message.message}
                                alt={message.message}
                              />
                            </div>
                          ) : (
                            <div
                              className={cx('message', 'message-text')}
                              key={message.id}
                            >
                              {getDisplayMessage(message.message)}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className={cx('chat-input-wrapper')}>
                <div className={cx('chat-input')}>
                  <Button
                    type="button"
                    className={cx('emoji-btn')}
                    onClick={(event) => {
                      event.stopPropagation();
                      dispatch(toggleDropdown('emoji'));
                    }}
                  >
                    <AiOutlineSmile />
                    <EmojiPicker
                      onEmojiSelected={(emoji) => setMessage((s) => s + emoji)}
                    />
                  </Button>
                  <Button
                    type="button"
                    className={cx('image-btn')}
                    onClick={(event) => {
                      chatImageInputRef.current.click();
                    }}
                  >
                    <AiOutlinePicture />
                    <input
                      ref={chatImageInputRef}
                      type="file"
                      name="chatImageInput"
                      className={cx('chat-image-input')}
                      onChange={(event) => {
                        new ImageService()
                          .upload(event.target.files[0])
                          .then((response) => {
                            socketService.sendMessage(
                              response.data.url,
                              conversation.id,
                              true
                            );
                          });
                      }}
                    />
                  </Button>
                  <input
                    type="text"
                    value={message}
                    onChange={({ target }) =>
                      setMessage(target.value.toString().trimStart())
                    }
                    onKeyDown={({ key }) => {
                      if (key === 'Enter' && message.length > 0) {
                        handleMessageSend();
                      }
                    }}
                    placeholder="Nhập tin nhắn..."
                  />
                  {message.length > 0 ? (
                    <Button
                      type="button"
                      className={cx('send-btn')}
                      onClick={handleMessageSend}
                    >
                      <AiOutlineSend />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className={cx('send-btn')}
                      onClick={() => {
                        handleMessageSend('👍');
                      }}
                    >
                      <AiFillLike />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className={cx('chat-center')}>
              Hãy thêm người vào cuộc hội thoại để bắt đầu trò truyện
            </div>
          )
        ) : (
          <div className={cx('chat-center')}>
            Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới
          </div>
        ))}
    </div>
  );
}

export default Chat;
