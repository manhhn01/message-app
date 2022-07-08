import React from 'react';
import styles from './style.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Conversation({
  avatar,
  conversationName,
  conversationMessage,
  conversationTime,
  isOnline = false,
  isUnread = false,
}) {
  return (
    <li className={cx('conversation', { unread: isUnread, online: isOnline })}>
      <div className={cx('conversation-avatar-wrapper')}>
        <img
          className={cx('conversation-avatar')}
          src={avatar}
          alt={conversationName}
        />
      </div>
      <div className={cx('conversation-info')}>
        <div className={cx('conversation-name')}>
          <span>{conversationName}</span>
        </div>
        <div className={cx('conversation-message')}>
          <span>{conversationMessage}</span>
        </div>
      </div>
      <div className={cx('conversation-time')}>
        <span>{conversationTime}</span>
      </div>
    </li>
  );
}

export default Conversation;
