import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

export const ChatsPreview = ({ setActiveChannel, channel, setToggleContainer, setIsCreating, setIsEditing }) => {
  const { channel: activeChannel, client } = useChatContext();

  const Preview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    return (
      <div className='flex gap-2 cursor-pointer hover:bg-slate-500 py-2'>
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.name}
          size={24}
        />
        <p>{members[0]?.user?.name}</p>
      </div>
    );
  };

  return (
    <div className={`${channel?.id === activeChannel?.id ? 'text-white' : ''}`} onClick={() => {
      setIsCreating(false)
      setIsEditing(false)
      setActiveChannel(channel)
      if(setToggleContainer){
        setToggleContainer((prev) => !prev)
      }
      }}>
        <Preview />
    </div>
  )
};
