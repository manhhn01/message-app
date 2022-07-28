import React, { useState } from 'react';
import Modal from '../../../Modal';
import styles from './style.module.css';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../Input';
import Button from '../../../Button';
import { updateUserFormValidator } from '../../../../helpers';
import { UserService } from '../../../../services/UserService';
import toast from 'react-hot-toast';
import { updateUser } from '../../../../slices/authSlice';
import userAvatar from '../../../../images/user.png';
import { useRef } from 'react';
const cx = classNames.bind(styles);

function UpdateInfoModal() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [updating, setUpdating] = useState(false);

  const avatarInputRef = useRef();

  const [updateInfo, setUpdateInfo] = useState({});
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
  });
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (updateUserFormValidator(updateInfo, setErrors)) {
      setUpdating(true);
      dispatch(updateUser(updateInfo))
        .unwrap()
        .then(() => {
          toast.success('Cập nhật thành công');
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message || err.message);
        })
        .finally(() => {
          setUpdating(false);
        });
    }
  };

  const getImageUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  };

  return (
    <Modal name="update-user" title="Cập nhật thông tin">
      <form className={cx('update-user-form')} onSubmit={handleFormSubmit}>
        <div className="form-group">
          <div
            className={cx('user-avatar-wrapper')}
            onClick={(event) => avatarInputRef.current.click()}
          >
            <img
              className={cx('user-avatar')}
              src={avatarPreviewUrl || user.avatar || userAvatar}
              alt={user.lastName + ' ' + user.firstName}
            />
          </div>
          <div
            className={cx('choose-avatar-btn-wrapper')}
            htmlFor="userAvatarInput"
          >
            <Button
              type="button"
              buttonStyle="color"
              onClick={(event) => avatarInputRef.current.click()}
              className={cx('choose-avatar-btn')}
            >
              <span>Chọn ảnh</span>
            </Button>
            <input
              ref={avatarInputRef}
              type="file"
              name="userAvatar"
              id="userAvatarInput"
              className={cx('user-avatar-input')}
              onChange={(event) => {
                setUpdateInfo((s) => ({ ...s, avatar: event.target.files[0] }));
                getImageUrl(event.target.files[0]).then((url) => {
                  setAvatarPreviewUrl(url);
                });
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <Input
            label="Họ"
            name="lastName"
            placeholder="Nhập họ"
            value={
              updateInfo.lastName === undefined
                ? user.lastName
                : updateInfo.lastName
            }
            onChange={(event) => {
              setUpdateInfo((s) => ({ ...s, lastName: event.target.value }));
            }}
            error={errors.lastName}
          />
        </div>
        <div className="form-group">
          <Input
            label="Tên"
            name="firstName"
            placeholder="Nhập tên"
            value={
              updateInfo.firstName === undefined
                ? user.firstName
                : updateInfo.firstName
            }
            onChange={(event) => {
              setUpdateInfo((s) => ({ ...s, firstName: event.target.value }));
            }}
            error={errors.firstName}
          />
        </div>
        <Button type="submit" buttonStyle="background" full disabled={updating}>
          Lưu
        </Button>
      </form>
    </Modal>
  );
}

export default UpdateInfoModal;
