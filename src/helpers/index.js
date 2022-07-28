import { logout } from '../slices/authSlice';

export function shuffle(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export function debounce(func, ms) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, ms);
  };
}

export function getMessageGroups(messages) {
  return messages.reduce((groups, message) => {
    if (groups.length > 0) {
      const lastGroup = groups[groups.length - 1];
      const lastMessage = lastGroup[lastGroup.length - 1];
      if (
        new Date(message.createdAt) - new Date(lastMessage.createdAt) <
          1000 * 30 &&
        message.User.id === lastMessage.User.id
      ) {
        lastGroup.push(message);
      } else {
        groups.push([message]);
      }
    } else groups.push([message]);

    return groups;
  }, []);
}

export function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

export function isYesterday(date, now) {
  return (
    now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth() &&
    now.getDate() - date.getDate() === 1
  );
}

export function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function isSameYear(date1, date2) {
  return date1.getFullYear() === date2.getFullYear();
}

export function getDisplayTime(date, compare = false) {
  if (!isValidDate(date)) return '';
  const now = new Date();
  if (isSameDay(date, now)) {
    return (compare ? 'Hôm nay, ' : '') + getTime(date);
  } else if (isSameYear(date, now)) {
    if (compare && isYesterday(date, now)) {
      return 'Hôm qua, ' + getTime(date);
    } else return getDate(date);
  }
  return date.toLocaleDateString();
}

export function getTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return hours + ':' + (minutes < 10 ? '0' + minutes : minutes);
}

export function getDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day}/${month}`;
}

//convert to emoji
export function getDisplayMessage(message) {
  if (message)
    return message
      .replace(':D', '😀')
      .replace(':)', '😊')
      .replace(':(', '😢')
      .replace('(:', '🙃')
      .replace('(y)', '👍')
      .replace('(n)', '👎')
      .replace('(ok)', '👌')
      .replace('8)', '😈')
      .replace(':*', '😘')
      .replace(":'(", '😢')
      .replace('<3', '❤️')
      .replace(':|', '😐')
      .replace(':o', '😮')
      .replace(':P', '😛')
      .replace(';)', '😉')
      .replace('<(")', '🐧');
  return message;
}

export function registerFormValidator(form, setErrors) {
  let valid = true;
  const { email, firstName, lastName, password, confirm } = form;
  if (email.trim().length <= 0) {
    setErrors((e) => ({ ...e, email: 'Vui lòng nhập email' }));
    valid = false;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    setErrors((e) => ({ ...e, email: 'Email không hợp lệ' }));
    valid = false;
  }

  if (firstName.trim().length <= 0) {
    setErrors((e) => ({ ...e, firstName: 'Vui lòng nhập tên' }));
    valid = false;
  } else if (firstName.trim().length < 3) {
    setErrors((e) => ({
      ...e,
      firstName: 'Tên phải có ít nhất 3 ký tự',
    }));
    valid = false;
  }

  if (lastName.trim().length <= 0) {
    setErrors((e) => ({ ...e, lastName: 'Vui lòng nhập họ' }));
    valid = false;
  } else if (lastName.trim().length < 3) {
    setErrors((e) => ({
      ...e,
      lastName: 'Họ phải có ít nhất 3 ký tự',
    }));
    valid = false;
  }

  if (password.trim().length <= 0) {
    setErrors((e) => ({ ...e, password: 'Vui lòng nhập mật khẩu' }));
    valid = false;
  }

  if (!confirm) {
    setErrors((e) => ({
      ...e,
      confirm: 'Vui lòng chọn đồng ý để đăng ký tài khoản',
    }));
    valid = false;
  }

  return valid;
}

export function loginFormValidator(form, setErrors) {
  let valid = true;
  const { email, password } = form;
  if (email.trim().length <= 0) {
    setErrors((e) => ({ ...e, email: 'Vui lòng nhập email' }));
    valid = false;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    setErrors((e) => ({ ...e, email: 'Email không hợp lệ' }));
    valid = false;
  }

  if (password.trim().length <= 0) {
    setErrors((e) => ({ ...e, password: 'Vui lòng nhập mật khẩu' }));
    valid = false;
  }

  return valid;
}

export function updateUserFormValidator(form, setErrors) {
  let valid = true;
  const { firstName, lastName } = form;

  if (firstName !== undefined)
    if (firstName.trim().length <= 0) {
      setErrors((e) => ({ ...e, firstName: 'Vui lòng nhập tên' }));
      valid = false;
    } else if (firstName.trim().length < 3) {
      setErrors((e) => ({
        ...e,
        firstName: 'Tên phải có ít nhất 3 ký tự',
      }));
      valid = false;
    }

  if (lastName !== undefined)
    if (lastName.trim().length <= 0) {
      setErrors((e) => ({ ...e, lastName: 'Vui lòng nhập họ' }));
      valid = false;
    } else if (lastName.trim().length < 3) {
      setErrors((e) => ({
        ...e,
        lastName: 'Họ phải có ít nhất 3 ký tự',
      }));
      valid = false;
    }

  return valid;
}
