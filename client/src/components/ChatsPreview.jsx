import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

export const ChatsPreview = ({ channel }) => {
  const { channel: activeChannel, client } = useChatContext();

  const Preview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    return (
      <div>
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName}
          size={24}
        />
        <p>{members[0]?.user?.fullName}</p>
      </div>
    );
  };

  return (
    <div className={`${channel?.id === activeChannel?.id ? 'text-white' : ''}`} onClick={() => {console.log(channel)}}>
        <Preview />
    </div>
  )
};
