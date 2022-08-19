import React from 'react';
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
          <h2 className="px-4 rounded-lg bg-neutral-500" onClick={logout}>
            logout
          </h2>
        </div>
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="italiano">
    <p>RSangels</p>
  </div>
);

export const ChannelListContainer = () => {
  const logout = () => {
    cookies.remove('token');
    cookies.remove('name');
    cookies.remove('email');
    cookies.remove('userId');
    cookies.remove('hashedPassword');

    window.location.reload();
  };
  return (
    <div className="flex">
      <Sidebar logout={logout} />
      <div className="w-60  text-3xl px-3 bg-blue-600">
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => <Chats {...listProps} />}
          Preview={(props) => <ChatsPreview {...props} />}
        />
      </div>
    </div>
  );
};
