import { ResponsiveDailog } from "@/components/reponsvie-dialog";
import { AgentForm } from "./agent-form";

interface NewAgentDialogProps{
    open:boolean,
    onOpenChange:(open:boolean)=>void
}

export const NewAgentDialog =({open , onOpenChange}:NewAgentDialogProps)=>{
    return (
        <ResponsiveDailog title="New Agent"
        description="Create New Agent"
        open={open}
        onOpenChange={onOpenChange}
        >
          <AgentForm
          onSuccess={()=>{
            onOpenChange(false);
          }}
          
          onCancel={()=>{
            onOpenChange(false);
          }}/>
        </ResponsiveDailog>
    )

}