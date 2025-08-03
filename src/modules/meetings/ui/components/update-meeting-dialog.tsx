import { ResponsiveDailog } from "@/components/reponsvie-dialog";

import { MeetingForm } from "./meeting-form";
import { MeetingGetOne } from "../../types";

interface UpdateMeetingDialogProps {
  open: boolean,
  onOpenChange: (open: boolean) => void,
  initialValues: MeetingGetOne
}

export const UpdateMeetingDialog = ({ open, onOpenChange, initialValues }: UpdateMeetingDialogProps) => {
  
  return (
    <ResponsiveDailog title="Edit Meeting"
      description="Edit the Meeting details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDailog>
  )

}