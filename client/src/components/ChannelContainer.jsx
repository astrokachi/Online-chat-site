import React from 'react';
import { Channel, useChatContext } from 'stream-chat-react';
import { ChannelInner } from './ChannelInner';
import { CreateChannel } from './CreateChannel';
import { EditChannel } from './EditChannel';
import {TeamMessage} from './TeamMessage';
import { MessageTeam } from 'stream-chat-react';

export const ChannelContainer = ({ isCreating, setIsCreating, setIsEditing, isEditing, createType, setCreateType }) => {
  const { channel } = useChatContext();

  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }
  if (isCreating) {
    return (
      <div className="channel__container">
        <EditChannel createType={createType} setIsEditing={setIsEditing} />
      </div>
    );
  }

  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">This is the beginning of your chat history</p>
      <p className="channel-empty__second">Send messages, attachments, links, emojis and more!</p>
    </div>
  );

  return (
    <div className="channel__container">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps }  />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};
