import React, { useState } from 'react';
import styles from './style.module.css';
import classNames from 'classnames/bind';
import Button from '../../Button';
import { AiFillCaretDown, AiFillCaretLeft } from 'react-icons/ai';
const cx = classNames.bind(styles);

function ConversationGroup({
  headerTitle,
  headerIcon,
  headerIconStyle = null,
  maxHeight = false,
  children,
}) {
  const [isMinimize, setIsMinimize] = useState(false);
  return (
    <div className={cx('conversation-group', { minimize: isMinimize })}>
      <div
        className={cx('conversation-group-header')}
        onClick={() => setIsMinimize((s) => !s)}
      >
        <div className={cx('conversation-group-header-title')}>
          <div className={cx('icon-wrapper')} style={headerIconStyle}>
            {headerIcon}
          </div>
          <span>{headerTitle}</span>
        </div>
        <Button type="button" className={cx('conversation-group-caret')}>
          {isMinimize ? <AiFillCaretLeft /> : <AiFillCaretDown />}
        </Button>
      </div>
      <ul
        className={cx('conversation-group-list', { 'max-height': maxHeight })}
      >
        {children}
      </ul>
    </div>
  );
}

export default ConversationGroup;
