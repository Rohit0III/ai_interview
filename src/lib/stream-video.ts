import "server-only" // This is a server-only module, do not import it in client code

import {StreamClient} from "@stream-io/node-sdk"

export const streamVideo = new StreamClient(
    process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
    process.env.STREAM_VIDEO_SECRET_KEY!,
)