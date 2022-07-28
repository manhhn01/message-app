import classNames from 'classnames/bind';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import userAvatar from '../../../images/user.png';
import { newConversation } from '../../../slices/conversationSlice';
import Button from '../../Button';
import SettingButton from '../SettingButton';
import styles from './style.module.css';
const cx = classNames.bind(styles);

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  return (
    <div className={cx('sidebar-header')}>
      <div className={cx('sidebar-header-left')}>
        <div className={cx('user-avatar-wrapper')}>
          <img
            className={cx('user-avatar')}
            src={user.avatar || userAvatar}
            alt="user"
          />
        </div>
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
        <SettingButton className={cx('setting-btn')} />
      </div>
    </div>
  );
}

export default Header;
