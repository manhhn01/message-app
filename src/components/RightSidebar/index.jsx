import classNames from 'classnames/bind';
import React, { useRef } from 'react';
import toast from 'react-hot-toast';
import { AiOutlinePicture } from 'react-icons/ai';
import { BiNotificationOff, BiPencil } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import conversationImage from '../../images/conversation.png';
import {
  removeConversation,
  removeMember,
  updateConversation
} from '../../slices/conversationSlice';
import { setModal } from '../../slices/modalSlice';
import Button from '../Button';
import Loading from '../Loading';
import styles from './style.module.css';
import UpdateConversationNameModal from './UpdateConversationNameModal';
const cx = classNames.bind(styles);

function RightSidebar() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const conversation = useSelector((state) => state.conversation);

  const conversationAvatarInputRef = useRef();

  return (
    conversation?.id && (
      <div className={cx('sidebar')}>
        {conversation.status === 'idle' ? (
          <Loading />
        ) : (
          <>
            <div className={cx('sidebar-top')}>
              <div className={cx('conversation-avatar-wrapper')}>
                <img
                  className={cx('conversation-avatar')}
                  src={conversation.avatar || conversationImage}
                  alt={conversation.name}
                />
              </div>
              <div className={cx('conversation-name')}>{conversation.name}</div>
            </div>
            <ul className={cx('conversation-option-list')}>
              <li
                className={cx('conversation-option-item')}
                onClick={(event) => {
                  dispatch(setModal('update-conversation-name'));
                }}
              >
                <BiPencil className={cx('conversation-option-icon')} />
                <span>Đổi tên đoạn hội thoại</span>
              </li>
              <li
                className={cx('conversation-option-item')}
                onClick={() => conversationAvatarInputRef.current.click()}
              >
                <input
                  ref={conversationAvatarInputRef}
                  type="file"
                  name="conversationAvatar"
                  id="conversationAvatarInput"
                  className={cx('conversation-avatar-input')}
                  onChange={(event) => {
                    dispatch(
                      updateConversation({
                        conversationId: conversation.id,
                        data: {
                          avatar: event.target.files[0],
                        },
                      })
                    )
                      .unwrap()
                      .then(() => {
                        toast.success('Cập nhật ảnh đại diện thành công');
                      })
                      .catch((err) => {
                        toast.error(err.message);
                      });
                  }}
                />
                <span htmlFor="conversationAvatarInput">
                  <AiOutlinePicture
                    className={cx('conversation-option-icon')}
                  />
                  <span>Thay đổi ảnh</span>
                </span>
              </li>
              <li className={cx('conversation-option-item')}>
                {!conversation.isSilent ? (
                  <>
                    <BiNotificationOff
                      className={cx('conversation-option-icon')}
                    />
                    <span>Tắt thông báo</span>
                  </>
                ) : (
                  <></>
                )}
              </li>
              {auth.user.id === conversation.Creator.id ? (
                <li
                  className={cx('conversation-option-item', 'danger')}
                  onClick={() => dispatch(removeConversation(conversation.id))}
                >
                  <FiLogOut className={cx('conversation-option-icon')} />
                  <span>Xóa cuộc hội thoại'</span>
                </li>
              ) : (
                <li
                  className={cx('conversation-option-item', 'danger')}
                  onClick={() =>
                    dispatch(
                      removeMember({
                        conversationId: conversation.id,
                        userId: auth.user.id,
                      })
                    )
                  }
                >
                  <FiLogOut className={cx('conversation-option-icon')} />
                  <span>Rời cuộc hội thoại</span>
                </li>
              )}
              <div className="separator"></div>
              <div className={cx('conversation-member')}>
                <div className={cx('conversation-member-title')}>
                  Thành viên đoạn hội thoại
                </div>
                <div className={cx('conversation-member-list')}>
                  {conversation.Users.map((user) => (
                    <div
                      className={cx('conversation-member-item')}
                      key={user.id}
                    >
                      <span>{user.email}</span>
                      {auth.user.id === conversation.Creator.id &&
                        user.id !== auth.user?.id && (
                          <Button
                            className={cx('member-option-btn')}
                            type="button"
                            buttonStyle="rounded"
                            onClick={() =>
                              dispatch(
                                removeMember({
                                  conversationId: conversation.id,
                                  userId: user.id,
                                })
                              )
                            }
                          >
                            <BsTrash />
                          </Button>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            </ul>
            <UpdateConversationNameModal />
          </>
        )}
      </div>
    )
  );
}

export default RightSidebar;
