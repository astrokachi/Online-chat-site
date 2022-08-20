import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelSearch } from './ChannelSearch';
import { Chats } from './Chats';
import { ChatsPreview } from './ChatsPreview';

const cookies = new Cookies();

//sidebar
const Sidebar = ({ logout }) => (
  <div className="bg-blue-800 h-screen">
    <div>
      <div>
        <div className="p-4">
          <button className="px-4 py-4 rounded-[50%]  bg-emerald-600" onClick={logout}>
            👈
          </button>
        </div>
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="italiano pb-9">
    <p>RSangels</p>
  </div>
);

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
};

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
  const { client } = useChatContext();

  const logout = () => {
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('name');
    cookies.remove('hashedPassword');

    window.location.reload();
  };

  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <Sidebar logout={logout} />
      <div className="channel-list__list__wrapper ">
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer} />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <Chats
              {...listProps}
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <ChatsPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
        />
      </div>
    </>
  );
};

export const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
  const [toggleContainer, setToggleContainer] = useState(false);
  return (
    <div>
      <div className="channel-list__container">
        <ChannelListContent setIsCreating={setIsCreating} setCreateType={setCreateType} setIsEditing={setIsEditing} />
      </div>

      <div
        className="channel-list__container-responsive"
        style={{ left: toggleContainer ? '0%' : '-89%', backgroundColor: '#005fff' }}
      >
        <div
          className="channel-list__container-toggle"
          onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}
        ></div>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        />
      </div>
    </div>
  );
};
