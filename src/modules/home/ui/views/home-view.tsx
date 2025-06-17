"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const Homeview = () => {
    const trpc =useTRPC()
    const {data} = useQuery(trpc.hello.queryOptions({text :"cheif nice to see you back"}));

    return (
        <div className="felx flex-col p-4 gap-y-4">
            {data?.greeting}
        </div>
    )
}

