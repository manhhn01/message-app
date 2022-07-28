import classNames from 'classnames/bind';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Input from '../../components/Input';
import LazyImage from '../../components/LazyImage';
import { registerFormValidator } from '../../helpers';
import { UserService } from '../../services/UserService';
import styles from './style.module.css';
import { register } from '../../slices/authSlice';
const cx = classNames.bind(styles);

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirm: false,
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirm: '',
  });

  const handleFormSubmit = (event) => {
    if (registerFormValidator(registerInfo, setFormErrors)) {
      dispatch(register(registerInfo))
        .unwrap()
        .then(() => {
          toast.success('Đăng ký thành công!');
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.message || 'Đăng ký thất bại!');
        });
    }
  };

  return (
    <div className={cx('app')}>
      <div className={cx('form-wrapper-left')}>
        <div className={cx('form')}>
          <div className={cx('form-header')}>
            <h1>Đăng ký tài khoản</h1>
            <div className={cx('header-description')}>
              Nhanh chóng và dễ dàng
            </div>
          </div>
          <div className={cx('form-group')}>
            <Input
              placeholder="Nhập họ của bạn"
              label="Họ"
              value={registerInfo.lastName}
              onChange={({ target }) => {
                setRegisterInfo((s) => ({ ...s, lastName: target.value }));
                setFormErrors((s) => ({ ...s, lastName: '' }));
              }}
              error={formErrors.lastName}
            />
          </div>
          <div className={cx('form-group')}>
            <Input
              placeholder="Nhập tên của bạn"
              label="Tên"
              value={registerInfo.firstName}
              onChange={({ target }) => {
                setRegisterInfo((s) => ({ ...s, firstName: target.value }));
                setFormErrors((s) => ({ ...s, firstName: '' }));
              }}
              error={formErrors.firstName}
            />
          </div>
          <div className={cx('form-group')}>
            <Input
              placeholder="Nhập email của bạn"
              label="Email"
              value={registerInfo.email}
              onChange={({ target }) => {
                setRegisterInfo((s) => ({ ...s, email: target.value }));
                setFormErrors((s) => ({ ...s, email: '' }));
              }}
              error={formErrors.email}
            />
          </div>
          <div className={cx('form-group')}>
            <Input
              placeholder="Nhập mật khẩu của bạn"
              type="password"
              label="Mật khẩu"
              value={registerInfo.password}
              onChange={({ target }) => {
                setRegisterInfo((s) => ({ ...s, password: target.value }));
                setFormErrors((s) => ({ ...s, password: '' }));
              }}
              autoComplete="new-password"
              error={formErrors.password}
            />
          </div>
          <div className={cx('form-group', 'my-20')}>
            <Checkbox
              label={
                <>
                  Tôi đồng ý với Messages về các{' '}
                  <a href="/" target={'_blank'}>
                    điều khoản dịch vụ
                  </a>
                  {' và '}
                  <a href="/" target={'_blank'}>
                    chính sách bảo mật
                  </a>
                </>
              }
              checked={registerInfo.confirm}
              onChange={({ target }) => {
                setRegisterInfo((s) => ({ ...s, confirm: target.checked }));
                setFormErrors((s) => ({ ...s, confirm: false }));
              }}
              error={formErrors.confirm}
            />
          </div>
          <div className={cx('form-group')}>
            <Button
              type="button"
              style={{
                fontSize: '1.125rem',
              }}
              onClick={handleFormSubmit}
              buttonStyle="background"
              full
            >
              Đăng ký
            </Button>
          </div>
          <div className={cx('has-account')}>
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </div>
        </div>
      </div>
      <div className={cx('background-right')}>
        <LazyImage src="https://source.unsplash.com/random/?city,night,animal" alt="Messages" />
      </div>
    </div>
  );
}

export default RegisterPage;
