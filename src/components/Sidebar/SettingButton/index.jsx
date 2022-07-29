import classNames from 'classnames/bind';
import React from 'react';
import {
  AiFillSetting,
  AiOutlineLogout,
  AiOutlineQuestion
} from 'react-icons/ai';
import { FiAlertTriangle } from 'react-icons/fi';
import { GrDocumentUser } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { logout } from '../../../slices/authSlice';
import { setDropdown, toggleDropdown } from '../../../slices/dropdownSlice';
import { setModal } from '../../../slices/modalSlice';
import Button from '../../Button';
import DropDown from '../../DropDown';
import DropDownItem from '../../DropDown/DropDownItem';
import styles from './style.module.css';
const cx = classNames.bind(styles);

function SettingButton({ className, dropdownPosition = 'bottom-right' }) {
  const dispatch = useDispatch();
  return (
    <Button
      type="button"
      buttonStyle="rounded"
      className={cx('setting-btn', className)}
      onClick={(event) => {
        event.stopPropagation();
        dispatch(toggleDropdown('user-settings'));
      }}
    >
      <AiFillSetting />
      <DropDown name="user-settings" position={dropdownPosition} caret>
        <DropDownItem
          onClick={(event) => {
            dispatch(setModal('update-user'));
            dispatch(setDropdown(''));
          }}
        >
          <GrDocumentUser className={cx('user-setting-icon')} />
          <span>Cập nhật thông tin</span>
        </DropDownItem>
        <div className="separator"></div>
        <DropDownItem onClick={() => dispatch(setDropdown(''))}>
          <AiOutlineQuestion className={cx('user-setting-icon')} />
          Trợ giúp
        </DropDownItem>
        <DropDownItem onClick={() => dispatch(setDropdown())}>
          <FiAlertTriangle className={cx('user-setting-icon')} />
          Báo cáo lỗi
        </DropDownItem>
        <div className="separator"></div>
        <DropDownItem onClick={() => dispatch(logout())}>
          <AiOutlineLogout className={cx('user-setting-icon')} />
          Đăng xuất
        </DropDownItem>
      </DropDown>
    </Button>
  );
}

export default SettingButton;
