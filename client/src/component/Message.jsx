import React from 'react';
import { useContext } from 'react';
import Moment from 'react-moment';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const Message = ({ msg, otherUser }) => {
  const { user } = useContext(AuthContext);
  console.log(msg.media);
  const navigate = useNavigate();

  return (
    <div className="">
      {msg.from === user.uid ? (
        <p className="">
          {msg.media ? (
            <a href={msg.media} target='_blank' rel="noreferrer">
              <img src={msg.media} alt="msg.text" className="h-44 w-48 mb-2 rounded" />
            </a>
          ) : null}
          <p
            className={`bg-white text-left px-9 text-sm py-1 rounded-full text-gray-700 w-max pb-1 ${
              msg.text == '' && 'hidden'
            }`}
          >
            {msg.text}
          </p>
          {/* <br /> */}
          <div className="text-left text-xs w-max mr-auto mb-2">
            <small>
              <Moment fromNow>{msg.createdAt.toDate()}</Moment>
            </small>
          </div>
        </p>
      ) : (
        <p className="">
          {msg.media ? (
            <a href={msg.media} target='_blank' rel="noreferrer">
              <img src={msg.media} alt="msg.text" className="h-44 w-48 mb-2 rounded ml-auto" />
            </a>
          ) : null}
          <p
            className={`bg-purp text-right px-9 text-sm py-1 rounded-full ml-auto text-gray-700 w-max pb-1 ${
              msg.text == '' && 'hidden'
            }`}
          >
            {msg.text}
          </p>
          {/* <br /> */}
          <div className="text-right text-xs w-max ml-auto mb-2">
            <small>
              <Moment fromNow>{msg.createdAt.toDate()}</Moment>
            </small>
          </div>
        </p>
      )}
    </div>
  );
};

export default Message;
