import { ResponsiveDailog } from "@/components/reponsvie-dialog";

import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";

interface NewMeetingDialogProps{
    open:boolean,
    onOpenChange:(open:boolean)=>void
}

export const NewMeetingDialog =({open , onOpenChange}:NewMeetingDialogProps)=>{
  const router = useRouter()
    return (
        <ResponsiveDailog title="New Meeting"
        description="Create New Meeting"
        open={open}
        onOpenChange={onOpenChange}
        >
          <MeetingForm
          onSuccess={(id)=>{
            onOpenChange(false)
            router.push(`/meetings/${id}`)
          }}
          
          onCancel={()=>onOpenChange(false)}/>
        </ResponsiveDailog>
    )

}