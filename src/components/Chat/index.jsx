import classNames from 'classnames/bind';
import { useState } from 'react';
import { AiFillLike, AiOutlineSend, AiOutlineSmile } from 'react-icons/ai';
import Button from '../Button';
import Header from './Header';
import styles from './style.module.css';
import userImage from '../../images/user.jpg';
const cx = classNames.bind(styles);

function Chat() {
  const [message, setMessage] = useState('');

  return (
    <div className={cx('chat')}>
      <Header />
      <div className={cx('chat-main')}>
        <div className={cx('chat-content')}>
          <div className={cx('message-group', 'received')}>
            <div className={cx('sender-info')}>
              <div>
                <div className={cx('sender-name')}>William</div>
                <div className={cx('timestamp')}>10:00 hôm qua</div>
              </div>
              <img
                className={cx('sender-avatar')}
                src={userImage}
                alt="username"
              />
            </div>
            <div className={cx('messages')}>
              <div className={cx('message')}>Hello</div>
              <div className={cx('message')}>Are you there?</div>
            </div>
          </div>
          <div className={cx('message-group')}>
            <div className={cx('sender-info')}>
              <div>
                <div className={cx('sender-name')}>William</div>
                <div className={cx('timestamp')}>10:00 hôm qua</div>
              </div>
              <img
                className={cx('sender-avatar')}
                src={userImage}
                alt="username"
              />
            </div>
            <div className={cx('messages')}>
              <div className={cx('message')}>Hello</div>
              <div className={cx('message')}>Are you there?</div>
            </div>
          </div>
        </div>
        <div className={cx('chat-input')}>
          <Button type="button" className={cx('emoji-btn')}>
            <AiOutlineSmile />
          </Button>
          <input
            type="text"
            value={message}
            onChange={({target})=>setMessage(target.value.toString().trimStart())}
            placeholder="Nhập tin nhắn..."
          />
          <Button type="button" className={cx('send-btn')}>
            {message.length > 0 ? <AiOutlineSend /> : <AiFillLike />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
