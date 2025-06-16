import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuSeparator,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { GeneratedAvatar } from "@/components/generate-avatar";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import {  ChevronUpIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


export const DashboardUserButton = () => {
    const router = useRouter()
    const isMobile = useIsMobile()
    const { data, isPending } = authClient.useSession();


    const OnLogout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in")
                }
            }
        })
    }

    if (isPending || !data?.user) {
        return null;
    }

    if(isMobile){
        return (
            <Drawer>
               <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex 
            items-center justify-between bg-white/ hover:bg-white/10 overflow-hidden gap-x-3">
                 {data.user.image ? (
                    <Avatar>
                        <AvatarImage src={data.user.image} />
                    </Avatar>
                ) : (<GeneratedAvatar
                    seed={data.user.name}
                    className="size-9  mr-3"
                    variant="initials" />)}

                <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 ">
                    <p className="text-sm truncate w-full">
                        {data.user.name}
                    </p>
                    <p className="text-xs truncate w-full">
                        {data.user.email}
                    </p>
                </div>

                <ChevronUpIcon className="shrink-0 size-4" />

                </DrawerTrigger> 
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{data.user.name}</DrawerTitle>
                         <DrawerDescription>{data.user.email}</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button
                        variant="outline"
                        onClick={()=>{
                        }}
                        >
                            <CreditCardIcon className="size-4 text-black"/>
                            Billing
                        </Button>
                            <Button
                        variant="outline"
                        onClick={OnLogout}
                        >
                            <LogOutIcon className="size-4 text-black"/>
                            Logout
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )

    }

    return (


        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex 
            items-center justify-between bg-white/ hover:bg-white/10 overflow-hidden gap-x-3">
                {data.user.image ? (
                    <Avatar>
                        <AvatarImage src={data.user.image} />
                    </Avatar>
                ) : (<GeneratedAvatar
                    seed={data.user.name}
                    className="size-9  mr-3"
                    variant="initials" />)}

                <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 ">
                    <p className="text-sm truncate w-full">
                        {data.user.name}
                    </p>
                    <p className="text-xs truncate w-full">
                        {data.user.email}
                    </p>
                </div>

                <ChevronUpIcon  className="shrink-0 size-4"/>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" side="right" className="w-72" >
                <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                        <span className="font-medium truncate ">{data.user.name}</span>
                        <span className="font-normal text-sm  text-muted-foreground truncate ">{data.user.email}</span>

                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer flex items-center justify-between ">
                    Billing
                    <CreditCardIcon className="size-4" />
                </DropdownMenuItem>

                <DropdownMenuItem onClick={OnLogout} className="cursor-pointer flex items-center justify-between">
                    Logout
                    <LogOutIcon className="size-4" />
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )

}