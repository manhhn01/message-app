import React from 'react';
import styles from './style.module.css';
import classNames from 'classnames/bind';
import { getDisplayMessage } from '../../../../helpers';
import conversationImage from '../../../../images/conversation.png';
const cx = classNames.bind(styles);

function Conversation({
  avatar,
  conversationName,
  conversationMessage,
  conversationTime,
  isOnline = false,
  isUnread = false,
  isSelected = false,
  onClick = null,
}) {
  return (
    <li
      className={cx('conversation', {
        unread: isUnread,
        online: isOnline,
        selected: isSelected,
      })}
      onClick={onClick}
    >
      <div className={cx('conversation-avatar-wrapper')}>
        <img
          className={cx('conversation-avatar')}
          src={avatar || conversationImage}
          alt={conversationName}
        />
      </div>
      <div className={cx('conversation-info')}>
        <div className={cx('conversation-name')}>
          <span>{conversationName}</span>
        </div>
        <div className={cx('conversation-message')}>
          <span>{getDisplayMessage(conversationMessage)}</span>
        </div>
      </div>
      <div className={cx('conversation-time')}>
        <span>{conversationTime}</span>
      </div>
    </li>
  );
}

export default Conversation;
