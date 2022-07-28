import React from 'react';
import styles from './style.module.css';
import classNames from 'classnames/bind';
import Button from '../Button';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../slices/modalSlice';
const cx = classNames.bind(styles);

function Modal({ name, title = '', children }) {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  return (
    modal.name === name && (
      <div
        className={cx('overlay')}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={cx('modal')}>
          <div className={cx('modal-header')}>
            <div className={cx('modal-title')}>{title}</div>
            <Button
              buttonStyle="rounded"
              className={cx('modal-close')}
              onClick={() => {
                dispatch(setModal(''));
              }}
            >
              <AiOutlineClose />
            </Button>
          </div>
          <div className="separator"></div>
          <div className={cx('modal-content')}>{children}</div>
        </div>
      </div>
    )
  );
}

export default Modal;
