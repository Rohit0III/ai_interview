"use client"

import { useSuspenseQuery } from "@tanstack/react-query"

import { useTRPC } from "@/trpc/client"
import { LoadingState } from "@/components/loading-state"
import { ErrorState } from "@/components/error-state"





export const AgentsView =()=>{
    const trpc =useTRPC()
    const {data} =useSuspenseQuery(trpc.agents.getMany.queryOptions());

    return (
        <div>
           {JSON.stringify(data,null,2)} 
        </div>
    )
}

export const AgentsViewLoading =()=>{
    return <LoadingState title="Loading Agents" description="This may take a Few Seconds"/>
}

export const AgentViewError =() =>{
    return <ErrorState
         title={"Can't able to Load the agents"}
         description={"Something Went Wrong "} />
}