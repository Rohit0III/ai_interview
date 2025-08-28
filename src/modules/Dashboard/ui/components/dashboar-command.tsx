import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { CommandResponsiveDialog, CommandInput, CommandItem, CommandList, CommandGroup } from "@/components/ui/command"
import { Dispatch, SetStateAction, useState } from "react"
import { useTRPC } from "@/trpc/client"
import { GeneratedAvatar } from "@/components/generate-avatar"
import { CommandEmpty } from "cmdk"


interface Props {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const DashboardCommand = ({ open, setOpen }: Props) => {

    const router = useRouter()
    const trpc = useTRPC()
    const [search, setSearch] = useState("")

    const meetings = useQuery(
        trpc.meetings.getMany.queryOptions({
            search,
            pageSize: 100,
        })
    )

    // Fixed: Use the correct TRPC query for agents
    const agents = useQuery(
        trpc.agents.getMany.queryOptions({
            search,
            pageSize: 100,
        })
    )

    const hasMeetings = meetings.data?.items && meetings.data.items.length > 0
    const hasAgents = agents.data?.items && agents.data.items.length > 0

    return (
        <CommandResponsiveDialog shouldFilter={false} open={open} onOpenChange={setOpen}>
            <CommandInput
                placeholder="Search For a meeting Or Agent..."
                value={search}
                onValueChange={(value) => setSearch(value)} />
            <CommandList>
                {!hasMeetings && !hasAgents && (
                    <CommandEmpty>
                        <span className="text-muted-foreground text-sm">
                            No results found
                        </span>
                    </CommandEmpty>
                )}

                {hasMeetings && (
                    <CommandGroup heading="Meetings">
                        {meetings.data?.items.map((meeting) => (
                            <CommandItem
                                onSelect={() => {
                                    router.push(`/meetings/${meeting.id}`)
                                    setOpen(false)
                                }}
                                key={meeting.id}
                            >
                                {meeting.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}

                {hasAgents && (
                    <CommandGroup heading="Agents">
                        {agents.data?.items.map((agent) => (
                            <CommandItem
                                onSelect={() => {
                                    router.push(`/agents/${agent.id}`)
                                    setOpen(false)
                                }}
                                key={agent.id}
                                className="flex items-center gap-2"
                            >
                                <GeneratedAvatar
                                    seed={agent.name}
                                    variant={"botttsNeutral"}
                                    className="size-5" />
                                {agent.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
            </CommandList>
        </CommandResponsiveDialog>
    )
}

export default DashboardCommand