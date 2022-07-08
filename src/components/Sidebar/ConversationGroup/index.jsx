import React, { useState } from 'react';
import styles from './style.module.css';
import classNames from 'classnames/bind';
import Button from '../../Button';
import { AiFillCaretDown, AiFillCaretLeft } from 'react-icons/ai';
const cx = classNames.bind(styles);

function ConversationGroup({ headerTitle, headerIcon, children }) {
  const [isMinimize, setIsMinimize] = useState(false);
  return (
    <div className={cx('conversation-group', { minimize: isMinimize })}>
      <div
        className={cx('conversation-group-header')}
        onClick={() => setIsMinimize((s) => !s)}
      >
        <div className={cx('conversation-group-header-title')}>
          <div className={cx('icon-wrapper')}>{headerIcon}</div>
          {headerTitle}
        </div>
        <Button type='button' className={cx('conversation-group-status-icon')}>
          {isMinimize ? <AiFillCaretLeft /> : <AiFillCaretDown />}
        </Button>
      </div>
      <ul className={cx('conversation-group-list')}>{children}</ul>
    </div>
  );
}

export default ConversationGroup;
