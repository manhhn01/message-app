import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Chat from '../../components/Chat';
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
    </div>
  );
}

export default DefaultLayout;
