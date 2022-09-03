import React from 'react';
import { useContext } from 'react';
import Moment from 'react-moment';

import { AuthContext } from '../Auth';

const Message = ({ msg, otherUser }) => {
  const { user } = useContext(AuthContext);
  // console.log(msg.media);
  const imageFormat = ['.jpeg', '.jpg', '.jfif', '.png', '.svg', '.webp', '.tiff', '.gif'];
  const videoFormat = ['.mp4', '.mov', '.avi', '.webm', '.ogg', '.mkv', '.mp3', '.wav', '.flac'];

  var video = new RegExp(videoFormat.join('|'));
  var image = new RegExp(imageFormat.join('|'));

  // console.log(image);

  return (
    <div className="">
      {msg.from === user.uid ? (
        <p className="">
          {msg.media ? (
            <a href={msg.media} target="_blank" rel="noreferrer">
              {image.test(msg.media.toLowerCase()) && (
                <img src={msg.media} alt="msg.text" className="h-44 w-48 mb-2 rounded mr-auto" />
              )}
              {video.test(msg.media.toLowerCase()) && (
                <iframe
                  className=" mb-2 rounded mr-auto"
                  width="260"
                  height="215"
                  src={msg.media}
                  frameborder="0"
                  allowfullscreen
                  title={msg.media.split('images')[1].split('?')[0]}
                ></iframe>
              )}
            </a>
          ) : null}
          <p
            className={`bg-white  text-left px-9 text-sm py-1 rounded-full text-gray-700 w-max pb-1 ${
              msg.text === '' && 'hidden'
            }`}
          >
            {msg.text}
          </p>
          {/* <br /> */}
          <div className="text-left text-xs w-max mr-auto mb-2 ml-4">
          <small>{ msg.media || msg.text !== '' ? <Moment fromNow>{msg.createdAt.toDate()}</Moment> : null}</small>
          </div>
        </p>
      ) : (
        <p className="">
          {msg.media ? (
            <a href={msg.media} target="_blank" rel="noreferrer">
              {image.test(msg.media.toLowerCase()) && (
                <img src={msg.media} alt="msg.text" className="h-44 w-48 mb-2 rounded ml-auto" />
              )}
              {video.test(msg.media.toLowerCase()) && (
                <iframe
                  className="mb-2 rounded ml-auto"
                  width="360"
                  height="215"
                  src={msg.media}
                  frameborder="0"
                  allowfullscreen
                  title={msg.media.split('images')[1].split('?')[0]}
                ></iframe>
              )}
            </a>
          ) : null}
          <p
            className={`bg-purp text-right px-9 text-sm py-1 rounded-full ml-auto text-white w-max pb-1 ${
              msg.text === '' && 'hidden'
            }`}
          >
            {msg.text}
          </p>
          {/* <br /> */}
          <div className="text-right text-xs w-max ml-auto mb-2 mr-4">
            <small>{ msg.media || msg.text !== '' ? <Moment fromNow>{msg.createdAt.toDate()}</Moment> : null}</small>
          </div>
        </p>
      )}
    </div>
  );
};

export default Message;
