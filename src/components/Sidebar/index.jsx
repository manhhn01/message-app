import classNames from 'classnames/bind';
import { useMemo } from 'react';
import { BsFillChatTextFill, BsPinAngleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import ConversationGroup from './ConversationGroup';
import Conversation from './ConversationGroup/Conversation';
import Header from './Header';
import Loading from '../Loading';
import styles from './style.module.css';
import { fetchConversation } from '../../slices/conversationSlice';
import { getDisplayTime } from '../../helpers';
import SettingButton from './SettingButton';

const cx = classNames.bind(styles);

function Sidebar() {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.conversations);
  const conversation = useSelector((state) => state.conversation);
  const pinnedConversations = useMemo(
    () =>
      conversations.conversations.filter(
        (conversation) => conversation.is_pinned
      ),
    [conversations]
  );

  const allConversations = useMemo(
    () =>
      conversations.conversations.filter(
        (conversation) => !conversation.is_pinned
      ),
    [conversations]
  );

  return (
    <div className={cx('sidebar')}>
      <Header />
      <div className={cx('sidebar-content')}>
        {conversations.status === 'loading' ? (
          <Loading />
        ) : conversations.conversations.length === 0 ? (
          <div className={cx('empty-list')}>Chưa có cuộc hội thoại nào</div>
        ) : (
          <>
            {pinnedConversations.length > 0 && (
              <ConversationGroup
                headerTitle="Đã ghim"
                headerIcon={<BsPinAngleFill />}
              >
                {pinnedConversations.map((conversationItem) => (
                  <Conversation
                    avatar={conversationItem.avatar}
                    conversationName={conversationItem.name}
                    conversationMessage={
                      conversationItem.Messages[0]?.isImage
                        ? 'Hình ảnh'
                        : conversationItem.Messages[0]?.message
                    }
                    conversationTime={getDisplayTime(
                      new Date(conversationItem.Messages[0]?.createdAt)
                    )}
                    isUnread={conversationItem.is_unread}
                    isSelected={conversationItem.id === conversation.id}
                    onClick={() =>
                      dispatch(fetchConversation(conversationItem.id))
                    }
                    key={conversationItem.id}
                  />
                ))}
              </ConversationGroup>
            )}
            <ConversationGroup
              headerTitle="Tất cả cuộc hội thoại"
              headerIcon={<BsFillChatTextFill />}
              headerIconStyle={{
                backgroundColor: '#7444dc',
              }}
              maxHeight
            >
              {allConversations.map((conversationItem) => (
                <Conversation
                  avatar={conversationItem.avatar}
                  conversationName={conversationItem.name}
                  conversationMessage={
                    conversationItem.Messages[0]?.isImage
                      ? 'Hình ảnh'
                      : conversationItem.Messages[0]?.message
                  }
                  conversationTime={getDisplayTime(
                    new Date(conversationItem.Messages[0]?.createdAt)
                  )}
                  isUnread={conversationItem.is_unread}
                  isSelected={conversationItem.id === conversation.id}
                  onClick={() =>
                    dispatch(fetchConversation(conversationItem.id))
                  }
                  key={conversationItem.id}
                />
              ))}
            </ConversationGroup>
          </>
        )}
      </div>
      <div className={cx('sidebar-footer')}>
        <SettingButton dropdownPosition='top-right'/>
      </div>
    </div>
  );
}

export default Sidebar;
