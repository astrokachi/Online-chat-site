import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelContainer } from './ChannelContainer';
import { ChannelListContainer } from './ChannelListContainer';

const apiKey = process.env.REACT_APP_API_KEY;
const client = StreamChat.getInstance(apiKey);

export const Chatter = ({ isCreating, setIsCreating, setIsEditing, isEditing, createType, setCreateType }) => {
  return (
    <div>
      <Chat client={client}>
        <div className="flex h-screen overflow-hidden">
          <ChannelListContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            createType={createType}
            setCreateType={setCreateType}
          />
          <ChannelContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            createType={createType}
            setCreateType={setCreateType}
          />
        </div>
      </Chat>
    </div>
  );
};
