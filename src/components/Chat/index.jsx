import classNames from 'classnames/bind';
import { useContext, useRef, useState } from 'react';
import { AiFillLike, AiOutlineSend, AiOutlineSmile } from 'react-icons/ai';
import Button from '../Button';
import Header from './Header';
import styles from './style.module.css';
import { useSelector } from 'react-redux';
import {
  getDisplayTime,
  getMessageGroups,
  getTime,
  isSameDay,
} from '../../helpers';
import { SocketContext } from '../../App';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

function Chat() {
  const chatContentRef = useRef(null);
  const socketService = useContext(SocketContext);
  const auth = useSelector((state) => state.auth);
  const conversation = useSelector((state) => state.conversation);
  const [message, setMessage] = useState('');

  const handleMessageSend = () => {
    socketService.sendMessage(message, conversation.id);
    setMessage('');
  };

  useEffect(() => {
    if (conversation.id && chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [conversation.id, conversation.Messages]);

  return (
    <div className={cx('chat')}>
      <Header />
      {!conversation.newConversation &&
        (conversation.id ? (
          conversation.Users.length > 1 ? (
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
                          src={messageGroup[0]?.User?.avatar}
                          alt=""
                        />
                      </div>
                      <div className={cx('messages')}>
                        {messageGroup.map((message) => (
                          <div className={cx('message')} key={message.id}>
                            {message.message}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className={cx('chat-input-wrapper')}>
                <div className={cx('chat-input')}>
                  <Button type="button" className={cx('emoji-btn')}>
                    <AiOutlineSmile />
                  </Button>
                  <input
                    type="text"
                    value={message}
                    onChange={({ target }) =>
                      setMessage(target.value.toString().trimStart())
                    }
                    onKeyDown={({ key }) => {
                      if (key === 'Enter') {
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
                    <Button type="button" className={cx('send-btn')}>
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
