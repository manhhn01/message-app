import classNames from 'classnames/bind';
import { useMemo, useRef } from 'react';
import { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { AiFillPhone } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { FaUserPlus, FaVideo } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from '../../../helpers';
import { UserService } from '../../../services/UserService';
import {
  addMember,
  createConversation,
  newConversation,
  newMember,
} from '../../../slices/conversationSlice';
import { setDropdown } from '../../../slices/dropdownSlice';
import Button from '../../Button';
import DropDown from '../../DropDown';
import DropDownItem from '../../DropDown/DropDownItem';
import LazyImage from '../../LazyImage';
import styles from './style.module.css';
const cx = classNames.bind(styles);

function Header() {
  const conversation = useSelector((state) => state.conversation);
  const dispatch = useDispatch();

  const [newConversationName, setNewConversationName] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredSuggestedUsers = useMemo(() => {
    return suggestedUsers.filter((user) => {
      return !conversation.Users.some((member) => member.id === user.id);
    });
  }, [suggestedUsers, conversation.Users]);

  const getSuggestedUsers = useRef(
    debounce(
      (name) =>
        new UserService().searchUsers(name).then((response) => {
          setSuggestedUsers(response.data);
          dispatch(setDropdown('suggestedUsers'));
        }),
      300
    )
  );

  useEffect(() => {
    if (newMemberName) {
      getSuggestedUsers.current(newMemberName);
    } else {
      setSuggestedUsers([]);
    }
  }, [dispatch, newMemberName]);

  useEffect(() => {
    setNewMemberName('');
  }, [conversation.newMember, selectedUser]);

  useEffect(() => {
    dispatch(setDropdown(''));
    dispatch(newMember(false));
  }, [dispatch, conversation.id]);

  return (
    <div className={cx('chat-header')}>
      {conversation.newConversation ? (
        <>
          <div className={cx('chat-header-left')}>
            <div className={cx('conversation-name-wrapper')}>
              <input
                type="text"
                id="newConversation"
                className={cx('conversation-name-input')}
                placeholder="Nhập tên cuộc hội thoại ..."
                value={newConversationName}
                onChange={(event) => setNewConversationName(event.target.value)}
              />
            </div>
          </div>
          <div className={cx('chat-header-right')}>
            <Button
              type="button"
              className={cx('create-btn')}
              buttonStyle="color"
              onClick={() =>
                dispatch(
                  createConversation({
                    name: newConversationName,
                  })
                )
              }
            >
              Tạo
            </Button>
            <Button
              type="button"
              className={cx('cancel-btn')}
              buttonStyle="color"
              onClick={() => dispatch(newConversation(false))}
            >
              Hủy
            </Button>
          </div>
        </>
      ) : conversation.newMember ? (
        <>
          <div className={cx('chat-header-left')}>
            <div className={cx('member-name-wrapper')}>
              {selectedUser ? (
                <div className={cx('selected-user')}>
                  <img
                    src={selectedUser.avatar}
                    alt={`${selectedUser.lastName} ${selectedUser.firstName}`}
                  />
                  <div className={cx('right')}>
                    <span>{`${selectedUser.lastName} ${selectedUser.firstName}`}</span>
                    <button
                      type="button"
                      className={cx('remove-selected-user')}
                      onClick={() => setSelectedUser(null)}
                    >
                      &#10005;
                    </button>
                  </div>
                </div>
              ) : (
                <input
                  type="text"
                  id="newMember"
                  className={cx('member-name-input')}
                  placeholder="Nhập tên, email thành viên ..."
                  value={newMemberName}
                  onChange={(event) => {
                    setNewMemberName(event.target.value);
                  }}
                />
              )}
              <DropDown name="suggestedUsers">
                {filteredSuggestedUsers.map((user) => (
                  <DropDownItem
                    key={user.id}
                    onClick={() => {
                      setSelectedUser(user);
                      dispatch(setDropdown(''));
                    }}
                  >
                    <div className={cx('suggested-user-item')}>
                      <div className={cx('suggested-avatar-wrapper')}>
                        <LazyImage
                          className={cx('suggested-avatar')}
                          src={user.avatar}
                          alt={user.lastName + ' ' + user.firstName}
                        />
                      </div>
                      <div className={cx('suggested-info')}>
                        <div className={cx('name')}>
                          {user.lastName + ' ' + user.firstName}
                        </div>
                        <div className={cx('email')}>{user.email}</div>
                      </div>
                    </div>
                  </DropDownItem>
                ))}
              </DropDown>
            </div>
          </div>
          <div className={cx('chat-header-right')}>
            <Button
              type="button"
              className={cx('create-btn')}
              buttonStyle="color"
              onClick={() =>
                dispatch(
                  addMember({
                    conversationId: conversation.id,
                    userId: selectedUser.id,
                  })
                )
              }
              disabled={selectedUser === null}
            >
              Thêm
            </Button>
            <Button
              type="button"
              className={cx('cancel-btn')}
              buttonStyle="color"
              onClick={() => dispatch(newMember(false))}
            >
              Hủy
            </Button>
          </div>
        </>
      ) : (
        conversation.id && (
          <>
            <div className={cx('chat-header-left')}>
              <span className={cx('conversation-name')}>
                {conversation.name}
              </span>
            </div>
            <div className={cx('chat-header-right')}>
              <Button
                type="button"
                buttonStyle="rounded"
                className={cx('header-btn')}
                onClick={() => dispatch(newMember(true))}
              >
                <FaUserPlus />
              </Button>
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
        )
      )}
    </div>
  );
}

export default Header;
