'use client';
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useCallback, useEffect, useState } from 'react'
import { StreamChat } from "stream-chat"
import { Chat, Channel, Window, ChannelHeader, MessageList, MessageInput, Thread, LoadingIndicator, ChannelList } from "stream-chat-react"
import useInitializeChatClient from './useInitializeChatClient';
import ManuBar from './MenuBar';
import ChatSidebar from './ChatSidebar';
import ChatChannel from './ChatChannel';
import { Menu, X } from "lucide-react";
import useWindowSize from '@/hooks/useWindowSize';
import { mdBrackpoint } from '@/utils/tailwind';

export default function ChatPage() {
  const chatClient = useInitializeChatClient();
  const { user } = useUser();

  const windowSize = useWindowSize();
  const isLargeScreen = windowSize.width >= mdBrackpoint;

  useEffect(() => {
    if (windowSize.width >= mdBrackpoint) setChatSidebarOpen(false)
  }, [windowSize.width])


  const handelSidebarClose = useCallback(() => {
    setChatSidebarOpen(false);
  }, [])

  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);
  if (!chatClient || !user) {
    return (
      <div className='h-screen item-center justify-center'>
        <LoadingIndicator size={40} />
      </div>
    )
  }
  return (
    <div className="h-screen bg-gray-100 xl:px-20 xl:py-8">
      <div className="max-w-[1600px] min-w-[350px] h-full shadow-sm m-auto flex flex-col">
        <Chat client={chatClient}>
          <div className="flex justify-center border-b-[#DBDDE1] p-3 md:hidden">
            <button onClick={() => setChatSidebarOpen(oldValue => !chatSidebarOpen)}>
              {!chatSidebarOpen ? (
                <span className='flex item-center gap-1'>
                  <Menu />Menu
                </span>
              ) : (
                <X />
              )}
            </button>
          </div>
          <div className="flex flex-row h-full overflow-y-auto">
            <ChatSidebar user={user} show={isLargeScreen || chatSidebarOpen} onClose={handelSidebarClose} />
            <ChatChannel show={isLargeScreen || !chatSidebarOpen} hideChannelOnThread={!isLargeScreen} />
            {/* <UserButton afterSignOutUrl='/' /> */}
          </div>
        </Chat>
      </div>
    </div>
  )
}