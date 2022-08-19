import React from 'react';
import { Chatter }from './components/Chatter';
import { Auth } from './components/Auth';
import Cookies from 'universal-cookie';
import { StreamChat } from 'stream-chat';

const cookies = new Cookies()

const apiKey = process.env.REACT_APP_API_KEY;
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if(authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('name'),
        hashedPassword: cookies.get('hashedPassword'),
        email: cookies.get('email')
    }, authToken)
}

function App() {


  if(!authToken) return <Auth />

  else return (
    <div className="mx-auto w-full h-full">
      <Chatter />
    </div>
  );
}


export default App;
