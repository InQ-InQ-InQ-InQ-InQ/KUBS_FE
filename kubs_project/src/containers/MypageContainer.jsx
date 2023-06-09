import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MypageComponent from '../components/MypageComponent';
import logout from '../thunk/logout';
import mypage from '../thunk/mypage';
import useDidMountEffect from '../util/useDidMountEffect';

function MypageContainer() {
  const [name, setName] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [departmentName, setDepartmentName] = useState(null);
  const [reservationList, setReservationList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onMain = (e) => {
    e.preventDefault();
    navigate('/main');
  };

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  };

  useDidMountEffect(() => {
    dispatch(mypage()).then((res) => {
      console.log(res);
      if (res.type === 'myinfo/mypage/fulfilled') {
        setName(res.payload.data.name);
        setStudentId(res.payload.data.studentId);
        setEmail(res.payload.data.email);
        setPhoneNumber(res.payload.data.phoneNumber);
        setDepartmentName(res.payload.data.departmentName);
        setReservationList(res.payload.data.bookings);
      } else {
        navigate('/');
      }
    });
  });

  return (
    <MypageComponent
      name={name}
      studentId={studentId}
      email={email}
      phoneNumber={phoneNumber}
      departmentName={departmentName}
      reservationList={reservationList}
      onMain={onMain}
      onLogout={onLogout}
    />
  );
}

export default MypageContainer;
