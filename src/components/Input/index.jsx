import React from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.css';
import { useId } from 'react';
const cx = classNames.bind(styles);

function Input({
  className = '',
  type = 'text',
  value = '',
  label = '',
  error = '',
  onChange = () => {},
  ...props
}) {
  const id = useId();
  return (
    <div>
      {label.length > 0 && (
        <label className={cx('label')} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={cx('input-wrapper', { error: !!error }, className)}>
        <input
          id={id}
          className={cx('input')}
          type={type}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
      {error.length > 0 && <p className={cx('error-message')}>{error}</p>}
    </div>
  );
}

export default Input;
