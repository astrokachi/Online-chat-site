import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Moment from 'react-moment';

import { AuthContext } from '../Auth';
import { MapComponent } from './Map';

const Message = ({ msg, otherUser }) => {
  const { user } = useContext(AuthContext);

  // console.log(msg.media);
  const imageFormat = ['.jpeg', '.jpg', '.jfif', '.png', '.svg', '.webp', '.tiff', '.gif'];
  const videoFormat = ['.mp4', '.mov', '.avi', '.webm', '.ogg', '.mkv', '.mp3', '.wav', '.flac'];

  var video = new RegExp(videoFormat.join('|'));
  var image = new RegExp(imageFormat.join('|'));

  // console.log(msg);

  return (
    <div className="">
      {msg.from === user.uid ? (
        <p className="">
          {!msg.loaction && msg.media && (
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
          )}
          {!msg.location && (
            <p
              className={`bg-white  text-left px-9 text-sm py-1 rounded-full text-gray-700 w-max pb-1 ${
                msg.text === '' && 'hidden'
              }`}
            >
              {msg.text}
            </p>
          )}
          {msg.location && (
            <a
              href={`https://www.google.com/maps/place//@${msg.coords.lat},${msg.coords.lon},17z?hl=en`}
              target={'_blank'}
              rel="noreferrer"
            >
              <p
                className={`border border-white text-left px-9 text-sm py-1 rounded-md text-white-700 w-max pb-1 flex items-center gap-2`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <h3>{msg.location}</h3>
              </p>
              <div className="h-[200px] w-[60%] overflow-hidden pt-4">
                <MapComponent lat={msg.coords.lat} lon={msg.coords.lon} />
              </div>
            </a>
          )}
          {/* <br /> */}
          <div className="text-left text-xs w-max mr-auto mb-2 ml-4">
            <small>{msg.media || msg.text !== '' ? <Moment fromNow>{msg.createdAt.toDate()}</Moment> : null}</small>
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
          {!msg.location && (
            <p
              className={`bg-purp text-right px-9 text-sm py-1 rounded-full ml-auto text-white w-max pb-1 ${
                msg.text === '' && 'hidden'
              }`}
            >
              {msg.text}
            </p>
          )}
          {msg.location && (
            <a
              href={`https://www.google.com/maps/place//@${msg.coords.lat},${msg.coords.lon},17z?hl=en`}
              target={'_blank'}
              rel="noreferrer"
            >
              <p
                className={`border border-white  text-right px-9 text-sm py-1 rounded-md ml-auto text-white w-max pb-1 flex gap-2 items-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <h3>{msg.location}</h3>
              </p>
              <div className="h-[200px] w-[60%] overflow-hidden pt-4 float-right">
                <MapComponent lat={msg.coords.lat} lon={msg.coords.lon} />
              </div>
            </a>
          )}
          {/* <br /> */}
          <div className="text-right text-xs w-max ml-auto mb-2 mr-4">
            <small>{msg.media || msg.text !== '' ? <Moment fromNow>{msg.createdAt.toDate()}</Moment> : null}</small>
          </div>
        </p>
      )}
    </div>
  );
};

export default Message;
