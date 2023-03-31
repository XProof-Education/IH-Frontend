import React from 'react';
import { Link } from 'react-router-dom';

const ProfileIcon = (props) => {

  return (
    <Link to='/edit-profile'>
      <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.5 1C10.6259 1 1 10.6259 1 22.5C1 34.374 10.6259 44 22.5 44C34.374 44 44 34.374 44 22.5C44 10.6259 34.374 1 22.5 1Z" stroke="#131313" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.88232 36.1434C5.88232 36.1434 10.6747 30.0251 22.4997 30.0251C34.3247 30.0251 39.1172 36.1434 39.1172 36.1434" stroke="#131313" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22.5003 22.4999C26.0626 22.4999 28.9503 19.6122 28.9503 16.0499C28.9503 12.4876 26.0626 9.59985 22.5003 9.59985C18.938 9.59985 16.0503 12.4876 16.0503 16.0499C16.0503 19.6122 18.938 22.4999 22.5003 22.4999Z" stroke="#131313" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="1" y="1" width="43" height="43" stroke="" />
      </svg>
    </Link>
  );
}

export default ProfileIcon;