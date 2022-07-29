import classNames from 'classnames/bind';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import LazyImage from '../../components/LazyImage';
import { loginFormValidator } from '../../helpers';
import { login } from '../../slices/authSlice';
import styles from './style.module.css';
const cx = classNames.bind(styles);

function LoginPage() {
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (loginFormValidator(loginInfo, setFormErrors)) {
      toast.promise(dispatch(login(loginInfo)).unwrap(), {
        loading: 'Đang đăng nhập...',
        success: 'Đăng nhập thành công!',
        error: (err) => err?.message || 'Đăng nhập thất bại!',
      });
    }
  };

  return (
    <div className={cx('app')}>
      <div className={cx('background-left')}>
        <LazyImage
          src="https://source.unsplash.com/random/?city,night,animal"
          alt="Messages"
        />
      </div>
      <div className={cx('form-wrapper-right')}>
        <form className={cx('form')} onSubmit={handleFormSubmit}>
          <div className={cx('form-header')}>
            <h1>Đăng nhập</h1>
            <div className={cx('header-description')}>Chào mừng trở lại!</div>
          </div>
          <div className={cx('form-group')}>
            <Input
              placeholder="Nhập email của bạn"
              name="email"
              label="Email"
              value={loginInfo.email}
              autoComplete="on"
              onChange={({ target }) => {
                setLoginInfo((s) => ({ ...s, email: target.value }));
                setFormErrors((s) => ({ ...s, email: '' }));
              }}
              error={formErrors.email}
            />
          </div>
          <div className={cx('form-group')}>
            <Input
              placeholder="Nhập mật khẩu của bạn"
              type="password"
              name="password"
              label="Mật khẩu"
              value={loginInfo.password}
              onChange={({ target }) => {
                setLoginInfo((s) => ({ ...s, password: target.value }));
                setFormErrors((s) => ({ ...s, password: '' }));
              }}
              autoComplete="on"
              error={formErrors.password}
            />
          </div>
          <div className={cx('form-group', 'my-25')}>
            <Button
              type="submit"
              style={{
                fontSize: '1.125rem',
              }}
              buttonStyle="background"
              full
            >
              Đăng nhập
            </Button>
          </div>
          <div className={cx('has-account')}>
            Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
