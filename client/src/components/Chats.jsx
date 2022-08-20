import React from 'react';
import { AddChannel } from '../assets/AddChannel';

export const Chats = ({setToggleContainer,  children, error = false, loading,  isCreating, setIsCreating, setIsEditing, isEditing,  createType,  setCreateType }) => {
    if (error) (
        <div className="as">
          <p>Connection error, please wait a moment and try again.</p>
        </div>
    );


    if (loading) (
        <div className="">
          <p>Messages loading...</p>
        </div>
      );
    
    
      return (
        <div className='p-2 bg-none text-white'>
          <div className='flex items-center justify-between w-full pb-4'>
            <p className='text-sm font-bold text-center'>Chats</p>
            <AddChannel 
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
              createType={createType}
              setCreateType={setCreateType}
              setToggleContainer={setToggleContainer}
             />
          </div>
            <p className='text-sm'>{children}</p>
        </div>
      )

  }

  
