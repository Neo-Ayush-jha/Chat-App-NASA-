import { Chat, Channel, Window, ChannelHeader, MessageList, MessageInput, Thread, LoadingIndicator, ChannelList } from "stream-chat-react"
interface ChatChannerProps{
    show:boolean;
    hideChannelOnThread:boolean;
}
export default function ChatChannel({show,hideChannelOnThread} : ChatChannerProps) {
    return (
        <div className={`w-full h-full $(show ? "block":"hidden")`}>
            <Channel>
                <Window hideOnThread={hideChannelOnThread}>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </div>
    )
}