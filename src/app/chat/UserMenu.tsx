import { useEffect, useState } from "react";
import { Avatar, useChatContext } from "stream-chat-react"
import { UserResource } from "@clerk/types";
import { UserResponse } from "stream-chat";
interface UsersMenuProps {
    loggedInUser: UserResource
}
export default function UserMenu({ loggedInUser }: UsersMenuProps) {
    const { client } = useChatContext();

    const [users, setUsers] = useState<(UserResponse & { image?: string })[]>()

    useEffect(() => {
        async function loadInitialUsers() {
            try {
                const response = await client.queryUsers(
                    {
                        id: { $ne: loggedInUser.id }
                    },
                    { id: 1 }
                )
                setUsers(response.users);
            } catch (error) {
                console.error(error);
                alert("Error loading users...");
            }
        }
        loadInitialUsers();
    }, [client, loggedInUser.id])
    return (
        <div className="bg-white absolute h-full w-full z-10 str-chat border-e border-e-[#DBDDE1]">
            {users?.map((user)=>(
                <UserResult user={user} onUserClicked={()=>{}} key={user.id} />
            ))}
        </div>
    )
}

interface UserResultProps {
    user: UserResponse & { image?: string };
    onUserClicked: (userId: string) => void;
}

function UserResult({ user, onUserClicked }: UserResultProps) {
    return (
        <button className="mb-3 w-full flex item-center gap-2 p-2.hover:bg-[#e9eaed]" onClick={() => onUserClicked(user.id)}>
            <span className="">
                <Avatar image={user.image} name={user.name || user.id} size={40} />
            </span>
            <span className="whitespace-hidden text-ellipsis whitespace-nowrap">
                {user.name || user.id}
            </span>
            {user.online && <span className="text-xs text-green-500">Online</span>}
        </button>
    )
}