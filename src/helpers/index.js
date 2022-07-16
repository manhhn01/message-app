export function shuffle(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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
