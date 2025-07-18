import { AgentsViewLoading, AgentViewError } from "@/modules/agents/ui/views/agents-views"
import type { SearchParams } from "nuqs"
import { AgentsView } from "@/modules/agents/ui/views/agents-views"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react"
import { AgentLsitHeader } from "@/modules/agents/ui/components/agent-list-header"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { loadSearchParams } from "@/modules/agents/params"



interface Props{
    searchParams: Promise<SearchParams>,
}


const Page = async ({searchParams}:Props) => {
    const filters= await loadSearchParams(searchParams)

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/sign-in")
    }


    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
        ...filters,
    }))
    return (
        <>
        <AgentLsitHeader/>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentsViewLoading />} >
                <ErrorBoundary fallback={<AgentViewError/>}  >
                    <AgentsView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
        </>
    )
}

export default Page