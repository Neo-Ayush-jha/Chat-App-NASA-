import { UserResource } from "@clerk/types";
import { UserButton } from "@clerk/nextjs";
import ManuBar from "./MenuBar";
import { ChannelList, ChannelPreviewMessenger, ChannelPreviewUIComponentProps } from "stream-chat-react";
import { useCallback, useEffect, useState } from "react";
import UserMenu from "./UserMenu";
interface ChatSidebarProps {
    user: UserResource;
    show: boolean;
    onClose: () => void;
}

export default function ChatSidebar({ user, show, onClose }: ChatSidebarProps) {
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    useEffect(() => {
        if (!show) setUserMenuOpen(false);
    }, [show]);

    const ChannelPrivewCustom = useCallback((props: ChannelPreviewUIComponentProps) => (
        <ChannelPreviewMessenger
            {...props}
            onSelect={() => {
                props.setActiveChannel?.(props.channel, props.watchers)
                onClose();
            }}
        />
    ), [onClose]);
    return (
        <div className={`relative w-full flex-col md:max-w-[360px] ${show ? "flex" : "hidden"}`}>
            {userMenuOpen &&
                <UserMenu  loggedInUser={user}/>
            }
            <ManuBar onUserMenuClick={() => setUserMenuOpen(true)} />
            <ChannelList
                filters={{
                    type: "messaging",
                    members: { $in: [user.id] }
                }}
                sort={{ last_message_at: -1 }}
                options={{ state: true, presence: true, limit: 10 }}
                showChannelSearch
                additionalChannelSearchProps={
                    {
                        searchForChannels: true,
                        searchQueryParams: {
                            channelFilters: {
                                filters: { members: { $in: [user.id] } }
                            }
                        }
                    }
                }
                Preview={ChannelPrivewCustom}
            />
        </div>
    )
}