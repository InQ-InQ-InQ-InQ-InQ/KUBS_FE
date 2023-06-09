import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent';
import FindComponent from '../components/FindComponent';
import login from '../thunk/login';
import findPW from '../thunk/findPW';
import changePW from '../thunk/changePW';
import postValidation from '../thunk/postValidation';
import getValidation from '../thunk/getValidation';

function LoginContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pwFindId, setPWFindId] = useState('');
  const [pwFindPhoneNumber, setPWFindPhoneNumber] = useState('');
  const [pwFindEmail, setPWFindEmail] = useState('');
  const [pwFindInvisible, setPWFindInvisible] = useState('');
  const [changePassword, setChangePassword] = useState('');
  const [changePasswordConfirm, setChangePasswordConfirm] = useState('');
  const [sendInvisible, setSendInvisible] = useState(false);
  const [verifyInvisible, setVerifyInvisible] = useState(false);
  const [validate, setValidate] = useState('');
  const [show, setShow] = useState(false);

  const onUsernameHandler = (e) => {
    setUsername(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onPWFindIdHandler = (e) => {
    setPWFindId(e.currentTarget.value);
  };

  const onPWFindPhoneNumberHandler = (e) => {
    setPWFindPhoneNumber(e.currentTarget.value);
  };

  const onPWFindEmailHandler = (e) => {
    setPWFindEmail(e.currentTarget.value);
  };

  const onChangePasswordHandler = (e) => {
    setChangePassword(e.currentTarget.value);
  };

  const onChangePasswordConfirmHandler = (e) => {
    setChangePasswordConfirm(e.currentTarget.value);
  };

  const handleClose = () => {
    setSendInvisible(false);
    setVerifyInvisible(false);
    setPWFindInvisible(false);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const onValidateHandler = (e) => {
    setValidate(e.currentTarget.value);
  };

  const onValidateEmailHandler = () => {
    setSendInvisible(true);
    const body = JSON.stringify({
      email: pwFindEmail,
    });

    dispatch(postValidation(body));
  };

  const onValidateConfirmHandler = () => {
    const body = {
      validate,
    };

    dispatch(getValidation(body)).then((res) => {
      console.log(res);
      if (res.type === 'register/GET_VALIDATION/fulfilled') setVerifyInvisible(true);
      else return alert('인증 코드가 일치하지 않습니다!');
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      studentId: username,
      password,
    });

    dispatch(login(body)).then((res) => {
      console.log(res);
      if (res.type === 'user/LOG_IN/fulfilled') navigate('/main');
      else return alert('로그인에 실패하였습니다!');
    });
  };

  const onPWFindSubmitHandler = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      studentId: pwFindId,
      phoneNumber: pwFindPhoneNumber,
      email: pwFindEmail,
    });

    if (!verifyInvisible) return alert('이메일 인증을 완료하여야 합니다!');

    dispatch(findPW(body)).then((res) => {
      console.log(res);
      if (res.payload.data.success) {
        setPWFindInvisible(true);
        setPWFindPhoneNumber('');
        setPWFindEmail('');
      } else return alert('인증 코드가 일치하지 않습니다!');
    });
  };

  const onChangePasswordSubmitHandler = (e) => {
    e.preventDefault();

    if (changePassword !== changePasswordConfirm) return alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다!');

    const body = {
      studentId: pwFindId,
      newPw: changePassword,
      checkPw: changePasswordConfirm,
    };

    dispatch(changePW(body)).then((res) => {
      console.log(res);
      if (res.type === 'login/CHANGE_PW/fulfilled') {
        setShow(false);
        setPWFindId('');
        setChangePassword('');
        setChangePasswordConfirm('');
      } else return alert('비밀번호 변경에 실패했습니다!');
    });
  };

  return (
    <>
      <LoginComponent
        onUsernameHandler={onUsernameHandler}
        onPasswordHandler={onPasswordHandler}
        onSubmitHandler={onSubmitHandler}
        handleShow={handleShow}
      />
      <FindComponent
        onPWFindIdHandler={onPWFindIdHandler}
        onPWFindPhoneNumberHandler={onPWFindPhoneNumberHandler}
        onPWFindEmailHandler={onPWFindEmailHandler}
        onPWFindSubmitHandler={onPWFindSubmitHandler}
        onChangePasswordHandler={onChangePasswordHandler}
        onChangePasswordConfirmHandler={onChangePasswordConfirmHandler}
        onChangePasswordSubmitHandler={onChangePasswordSubmitHandler}
        handleClose={handleClose}
        show={show}
        onValidateEmailHandler={onValidateEmailHandler}
        onValidateHandler={onValidateHandler}
        onValidateConfirmHandler={onValidateConfirmHandler}
        sendInvisible={sendInvisible}
        verifyInvisible={verifyInvisible}
        pwFindInvisible={pwFindInvisible}
      />
    </>
  );
}

export default LoginContainer;
