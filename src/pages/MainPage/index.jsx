import classNames from 'classnames/bind';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Chat from '../../components/Chat';
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import RightSidebar from '../../components/RightSidebar';
import Sidebar from '../../components/Sidebar';
import styles from './style.module.css';

const cx = classNames.bind(styles);

function DefaultLayout() {
  const sidebar = useSelector((state) => state.sidebar);
  return (
    <div className={cx('app')}>
      <Sidebar />
      <Chat />
      {sidebar.right && <RightSidebar />}
      <Modal title={'test'}>
        This is modal content
      </Modal>
    </div>
  );
}

export default DefaultLayout;
