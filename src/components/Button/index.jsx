import React from 'react';
import styles from './style.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Button({
  children,
  className = '',
  buttonStyle = '',
  full = false,
  ...props
}) {
  return (
    <button
      className={cx(
        'btn',
        {
          'btn-rounded': buttonStyle === 'rounded',
          'btn-background': buttonStyle === 'background',
          'btn-color': buttonStyle === 'color',
          'btn-full': full,
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
