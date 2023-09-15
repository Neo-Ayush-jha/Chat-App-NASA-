import { env } from "@/env";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { StreamChat } from "stream-chat"

export async function GET() {
  try {
    const user = await currentUser();
    console.log("Calling user token: ", user?.id);
    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated." },
        { status: 401 }
      );
    }
    const streamClient= StreamChat.getInstance(
        env.NEXT_PUBLIC_STREAM_KEY,
        env.STREAM_SECRET_KEY
    );
    
    const expirationTime = Math.floor(Date.now()/1000) + 60*60

    const issudAt = Math.floor(Date.now()/1000) - 60;

    const token=streamClient.createToken(user.id,expirationTime,issudAt);

    return NextResponse.json({token},{status:200});

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
