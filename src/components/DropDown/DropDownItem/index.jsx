import React from 'react';
import styles from './style.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function DropDownItem({ children, ...props }) {
  return <li className={cx('drop-down-item')} {...props}>{children}</li>;
}

export default DropDownItem;
