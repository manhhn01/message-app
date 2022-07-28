import React from 'react';
import styles from './style.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Loading() {
  return (
    <div className={cx('loader-wrapper')}>
      <div className={cx('loader')}>Loading</div> ;
    </div>
  );
}

export default Loading;
