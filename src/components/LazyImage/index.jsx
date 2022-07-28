import React, { useRef, useState } from 'react';
import styles from './style.module.css';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

function LazyImage({
  src = '',
  contain = false,
  onImageLoaded = null,
  ...props
}) {
  const imageRef = useRef();
  const [loading, setLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setLoading(true);
        entry.target.src = src;
        entry.target.addEventListener('load', ({ target }) => {
          if (target.complete && target.naturalWidth > 0) {
            setLoading(false);
          }
        });
        observer.unobserve(entry.target);
      }
    });

    observer.observe(imageRef.current);

    return () => observer.disconnect();
  }, [src]);
  return (
    <div className={cx('image-wrapper', { loading: !loading })}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img ref={imageRef} className={cx('image', { contain })} {...props} />
      {showOverlay && (
        <div
          className={cx('overlay', { loading })}
          onTransitionEnd={() => {
            setShowOverlay(false);
            if (onImageLoaded) onImageLoaded();
          }}
        ></div>
      )}
    </div>
  );
}

export default LazyImage;
