"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";


export const MeetingsView = () =>{
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({})); 
    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}


export const MeetingsViewLoading =()=>{
    return <LoadingState title="Loading Agents" description="This may take a Few Seconds"/>
}

export const MeetingsViewError =() =>{
    return <ErrorState
         title={"Can't able to Load the agents"}
         description={"Something Went Wrong "} />
}


