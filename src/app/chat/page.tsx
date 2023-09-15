'use client';
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { StreamChat } from "stream-chat"
import { Chat, Channel, Window, ChannelHeader, MessageList, MessageInput, Thread } from "stream-chat-react"

const userId = "user_2VRlRxLMfjHIbzhlDZY5wsEXqKR"

const chatClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_KEY!
)

chatClient.connectUser(
  {
    id: userId,
    name: "Smriti"
  },
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl8yVlJsUnhMTWZqSEliemhsRFpZNXdzRVhxS1IifQ.l7MG8c3qW5v14HNVSwUAOsF0tVoY4JjShBl1zmb7urA"
)

const channel = chatClient.channel("messaging", "channel_1", {
  name: "Channel no.1",
  members: [userId],
});


function page() {
  return (
    <div>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          {/* <UserButton afterSignOutUrl='/' /> */}
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
}

export default page