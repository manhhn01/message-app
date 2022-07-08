import React from 'react';
import styles from './style.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Button({ children, className = '', buttonStyle = '', ...props }) {
  return (
    <button
      className={cx(
        'btn',
        {
          'btn-rounded': buttonStyle === 'rounded',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
