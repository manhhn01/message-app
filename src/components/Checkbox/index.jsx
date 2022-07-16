import React, { useId } from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.css';
const cx = classNames.bind(styles);

function Checkbox({ label = '', error = false, ...props }) {
  const id = useId();
  return (
    <label className={cx('container', { error })}>
      <span className={cx('label')}>{label}</span>
      <input type="checkbox" id={id} className={cx('checkbox')} {...props} />
      <span className={cx('checkmark')}></span>
    </label>
  );
}

export default Checkbox;
