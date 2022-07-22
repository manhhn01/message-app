import classNames from 'classnames/bind';
import { AiFillSetting, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { newConversation } from '../../../slices/conversationSlice';
import Button from '../../Button';
import styles from './style.module.css';
const cx = classNames.bind(styles);

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  return (
    <div className={cx('sidebar-header')}>
      <div className={cx('sidebar-header-left')}>
        <img className={cx('user-avatar')} src={user.avatar} alt="user" />
        <div
          className={cx('user-name')}
        >{`${user.lastName} ${user.firstName}`}</div>
      </div>
      <div className={cx('sidebar-header-right')}>
        <Button
          type="button"
          buttonStyle="rounded"
          className={cx('header-btn')}
          onClick={() => {
            dispatch(newConversation(true));
          }}
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
