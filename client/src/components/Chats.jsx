import React from 'react';

export const Chats = ({ children, error = false, loading}) => {
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
        <div>
            <p className='text-base'>Chats</p>
            <p className='text-sm'>{children}</p>
        </div>
      )

  }

  
