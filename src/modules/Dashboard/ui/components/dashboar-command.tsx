import { CommandResponsiveDialog, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dispatch, SetStateAction } from "react"


interface Props {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const DashboardCommand = ({ open, setOpen }: Props) => {
    return (
        <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
            <CommandInput
                placeholder="Search For a meeting Or Agent" />
            <CommandList>
                <CommandItem>
                    test
                </CommandItem>
            </CommandList>
        </CommandResponsiveDialog>
    )
}

export default DashboardCommand