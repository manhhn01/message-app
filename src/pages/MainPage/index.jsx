import classNames from 'classnames/bind';
import { useState } from 'react';
import Chat from '../../components/Chat';
import Sidebar from '../../components/Sidebar';
import styles from './style.module.css';

const cx = classNames.bind(styles);

function DefaultLayout() {
  return (
    <div className={cx('app')}>
      <Sidebar />
      <Chat />
    </div>
  );
}

export default DefaultLayout;
