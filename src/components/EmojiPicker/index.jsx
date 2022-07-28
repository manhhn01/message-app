import classNames from 'classnames/bind';
import React from 'react';
import { useSelector } from 'react-redux';
import emojis from './emoji';
import styles from './style.module.css';
const cx = classNames.bind(styles);

function EmojiPicker({ onEmojiSelected }) {
  const dropdown = useSelector((state) => state.dropdown);
  return (
    dropdown.name === 'emoji' && (
      <div
        className={cx('picker-wrapper')}
        onClick={(event) => event.stopPropagation()}
      >
        <ul className={cx('emoji-list')}>
          {emojis.map((emoji, index) => (
            <li
              className={cx('emoji')}
              key={index}
              onClick={(event) => {
                if (event.currentTarget === event.target)
                  onEmojiSelected(emoji);
              }}
            >
              {emoji}
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default EmojiPicker;
