import { env } from "@/env";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat"


export default function useInitializeChatClient(){
    const {user}= useUser();
    const [chatClient,setChatClient] = useState<StreamChat | null>(null);

    useEffect(()=>{
        if(!user?.id) return;
        const client= StreamChat.getInstance(env.NEXT_PUBLIC_STREAM_KEY);
        client.connectUser(
            {
                id:user.id,
                name:user.fullName || user.id,
                image: user.imageUrl,
            },
            async ()=>{
                const response = await fetch("/api/token");
                if(!response.ok){
                    throw Error("Failed to get token.")
                }
                const body = await response.json();
                return body.token;
            }
        ).catch((error)=> console.log("Faile to connect with user.")).then(()=>setChatClient(client))
        return ()=>{
            setChatClient(null);
            client.disconnectUser()
            .catch((error)=>console.log("Failed to connet whot user."))
            .then(()=>console.log("Connect closed."));
        }
    },[user?.id, user?.fullName, user?.imageUrl]);
    return chatClient;
}