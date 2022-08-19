import React, { useState } from 'react';
import { Chatter }from './components/Chatter';
import { Auth } from './components/Auth';
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/index.css'
import './App.css'

const cookies = new Cookies()

const apiKey = process.env.REACT_APP_API_KEY;
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);


if(authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        username: cookies.get('username'),
        hashedPassword: cookies.get('hashedPassword'),
        email: cookies.get('email')
    }, authToken)
}

function App() {
  const [createType, setCreateType] = useState();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  if(!authToken) return <Auth />

  else return (
    <div className="mx-auto w-full h-full">
      <Chatter isCreating={isCreating} setIsCreating={setIsCreating} setIsEditing={setIsEditing} isEditing={isEditing} createType={createType} setCreateType={setCreateType} />
    </div>
  );
}


export default App;
