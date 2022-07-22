import React from 'react';
import styles from './style.module.css';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function DropDown({ children, name }) {
  const dropdown = useSelector((state) => state.dropdown);
  return (
    dropdown.name === name && (
      <ul
        className={cx('drop-down')}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {children}
      </ul>
    )
  );
}

export default DropDown;
