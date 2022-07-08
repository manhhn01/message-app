import classNames from 'classnames/bind';
import { AiFillPhone } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { FaVideo } from 'react-icons/fa';
import Button from '../../components/Button';
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
