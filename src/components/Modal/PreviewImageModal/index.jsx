import React from 'react';
import styles from './style.module.css';
import classNames from 'classnames/bind';
import BaseModal from '../BaseModal';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function PreviewImageModal() {
  const url = useSelector((state) => state.modal.data?.url);
  return (
    <BaseModal className={cx('modal')}>
      <img className={cx('preview-image')} src={url} alt="" />
    </BaseModal>
  );
}

export default PreviewImageModal;
