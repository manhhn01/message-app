import classNames from 'classnames/bind';
import React from 'react';
import { useSelector } from 'react-redux';
import PreviewImageModal from './PreviewImageModal';
import UpdateConversationNameModal from './UpdateConversationNameModal';
import UpdateUserModal from './UpdateUserModal';

function Modal() {
  const modalName = useSelector((state) => state.modal.name || state.modal);
  const modals = [
    {
      name: 'update-user',
      component: <UpdateUserModal />,
    },
    {
      name: 'update-conversation-name',
      component: <UpdateConversationNameModal />,
    },
    {
      name: 'preview-image',
      component: <PreviewImageModal />,
    },
  ];

  return modals.find((item) => item.name === modalName)?.component;
}

export default Modal;
