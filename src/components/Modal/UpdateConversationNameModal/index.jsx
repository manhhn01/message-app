import React, { useState } from 'react';
import styles from './style.module.css';
import classNames from 'classnames/bind';
import Input from '../../Input';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../Button';
import { updateConversation } from '../../../slices/conversationSlice';
import { setModal } from '../../../slices/modalSlice';
import toast from 'react-hot-toast';
import BaseModal from '../BaseModal';
const cx = classNames.bind(styles);

function UpdateConversationNameModal() {
  const dispatch = useDispatch();
  const conversation = useSelector((state) => state.conversation);

  const [conversationName, setConversationName] = useState();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateConversation({
        conversationId: conversation.id,
        data: {
          name: conversationName,
        },
      })
    )
      .unwrap()
      .then(() => {
        dispatch(setModal(null));
        toast.success('Đổi tên đoạn hội thoại thành công');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <BaseModal name="update-conversation-name" title="Cập nhật tên đoạn hội thoại">
      <form
        className={cx('update-conversation-name-form')}
        onSubmit={handleFormSubmit}
      >
        <div className="form-group">
          <Input
            onChange={(event) => setConversationName(event.target.value)}
            value={conversation === null ? conversation.name : conversationName}
          />
        </div>
        <Button
          type="submit"
          buttonStyle="background"
          full
          disabled={!conversationName}
        >
          Lưu
        </Button>
      </form>
    </BaseModal>
  );
}

export default UpdateConversationNameModal;
