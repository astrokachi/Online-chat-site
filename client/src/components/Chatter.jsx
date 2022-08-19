import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelContainer } from './ChannelContainer';
import { ChannelListContainer } from './ChannelListContainer';

const apiKey = process.env.REACT_APP_API_KEY;
const client = StreamChat.getInstance(apiKey);

export const Chatter = () => {
  return (
    <div>
      <Chat client={client}>
        <div className="flex">
          <ChannelListContainer />
          <ChannelContainer />
        </div>
      </Chat>
    </div>
  );
};
