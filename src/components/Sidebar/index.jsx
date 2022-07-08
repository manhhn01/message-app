import classNames from 'classnames/bind';
import { BsPinAngleFill } from 'react-icons/bs';
import userImg from '../../images/user.jpg';
import ConversationGroup from './ConversationGroup';
import Conversation from './ConversationGroup/Conversation';
import Header from './Header';
import styles from './style.module.css';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <div className={cx('sidebar')}>
      <Header />
      <div className={cx('sidebar-content')}>
        <ConversationGroup
          headerTitle="Đã ghim"
          headerIcon={<BsPinAngleFill />}
        >
          <Conversation
            avatar={userImg}
            conversationName="Michael"
            conversationMessage="How are you today?"
            conversationTime="10:00"
            isUnread={true}
            key={1}
          />
          <Conversation
            avatar={userImg}
            conversationName="Michael 2"
            conversationMessage="Em ăn cơm chưa"
            conversationTime="1 phút"
            isUnread={false}
            isOnline
            key={2}
          />
        </ConversationGroup>
      </div>
    </div>
  );
}

export default Sidebar;
