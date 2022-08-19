import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';


export const ChannelSearch = () => {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)


    const getChannels = async(text) => {
        try {

        } catch (error) {
            setValue('')
        }
    }

    const onSearch = (e) => {
        e.preventDefault();   
        setLoading(true)
        setValue(e.target.value)
        getChannels(e.target.value)
    }
    
  return (
    <div>
        <input className='w-full text-sm px-4 py-2 outline-none rounded-lg' type="text" placeholder='search' value={value} onChange={(e) => onSearch(e)} />
    </div>
  )
}
