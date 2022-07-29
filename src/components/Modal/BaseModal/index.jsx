import React from 'react';
import styles from './style.module.css';
import classNames from 'classnames/bind';
import Button from '../../Button';
import { useDispatch } from 'react-redux';
import { setModal } from '../../../slices/modalSlice';
import { AiOutlineClose } from 'react-icons/ai';
const cx = classNames.bind(styles);

function BaseModal({ children, className, title }) {
  const dispatch = useDispatch();

  return (
    <div
      className={cx('overlay')}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          dispatch(setModal(''));
        }
      }}
    >
      <div className={cx('modal', className)}>
        {title ? (
          <>
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
          </>
        ) : (
          <>
            <Button
              className={cx('modal-close', 'fixed')}
              onClick={() =>
                dispatch(
                  setModal({
                    component: null,
                  })
                )
              }
            >
              <AiOutlineClose />
            </Button>
            {children}
          </>
        )}
      </div>
    </div>
  );
}

export default BaseModal;
