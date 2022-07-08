import classNames from 'classnames/bind';
import { AiFillSetting, AiOutlinePlus } from 'react-icons/ai';
import userImg from '../../../images/user.jpg';
import Button from '../../Button';
import styles from './style.module.css';
const cx = classNames.bind(styles);

function Header() {
  return (
    <div className={cx('sidebar-header')}>
      <div className={cx('sidebar-header-left')}>
        <img className={cx('user-avatar')} src={userImg} alt="user" />
        <div className={cx('user-name')}>Michele Laurence</div>
      </div>
      <div className={cx('sidebar-header-right')}>
        <Button
          type="button"
          buttonStyle="rounded"
          className={cx('header-btn')}
        >
          <AiOutlinePlus />
        </Button>
        <Button
          type="button"
          buttonStyle="rounded"
          className={cx('header-btn')}
        >
          <AiFillSetting />
        </Button>
      </div>
    </div>
  );
}

export default Header;
