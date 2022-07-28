import React from 'react';
import styles from './style.module.css';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function DropDown({
  children,
  name,
  caret = false,
  position = 'bottom-right',
}) {
  const dropdown = useSelector((state) => state.dropdown);
  return (
    dropdown.name === name && (
      <>
        {caret && <div className={cx('caret', position)}></div>}
        <ul
          className={cx('drop-down', position)}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {children}
        </ul>
      </>
    )
  );
}

export default DropDown;
