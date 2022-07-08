import classNames from 'classnames/bind';
import { AiFillPhone } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { FaVideo } from 'react-icons/fa';
import Button from '../../Button';
import styles from './style.module.css';
const cx = classNames.bind(styles);

function Header() {
  return (
    <div className={cx('chat-header')}>
      <div className={cx('chat-header-left')}></div>
      <div className={cx('chat-header-right')}>
        <Button
          type="button"
          buttonStyle="rounded"
          className={cx('header-btn')}
        >
          <AiFillPhone />
        </Button>
        <Button
          type="button"
          buttonStyle="rounded"
          className={cx('header-btn')}
        >
          <FaVideo />
        </Button>
        <Button
          type="button"
          buttonStyle="rounded"
          className={cx('header-btn')}
        >
          <BsThreeDots />
        </Button>
      </div>
    </div>
  );
}

export default Header;
