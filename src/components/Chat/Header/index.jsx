import classNames from 'classnames/bind';
import { AiFillPhone } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { FaVideo } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Button from '../../Button';
import styles from './style.module.css';
const cx = classNames.bind(styles);

function Header() {
  const conversation = useSelector((state) => state.conversation);
  // const conversation = {
  //   newConversation: true,
  // };
  return (
    <div className={cx('chat-header')}>
      {!conversation.newConversation ? (
        <>
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
        </>
      ) : (
        <>
          <div className={cx('chat-header-left')}>
            <div className={cx('conversation-name-wrapper')}>
              <label htmlFor="newConversation">Đến: </label>
              <input
                type="text"
                id="newConversation"
                className={cx('conversation-name-input')}
                placeholder="Nhập tên cuộc hội thoại ..."
              />
            </div>
          </div>
          <div className={cx('chat-header-right')}>
            <Button type='button' buttonStyle="color">
              Tạo
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
