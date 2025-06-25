
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { AgentGetOne } from "../types";
import { useForm } from "react-hook-form";
import z from "zod";
import { agentInsertSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { GeneratedAvatar } from "@/components/generate-avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


interface AgentFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    initialValues?: AgentGetOne;
}

export const AgentForm = ({
    onSuccess,
    onCancel,
    initialValues,
}: AgentFormProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions(),
                )

                if(initialValues?.id){
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({id: initialValues.id})
                    )
                }
                onSuccess?.();

             },
            onError: (error) => {
                toast.error(error.message)
                // Todo: Check if error code is "Forbidden" , redirect to "/upgrade"
             }
        })
    )

    const form = useForm<z.infer<typeof agentInsertSchema>>({
        resolver: zodResolver(agentInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instructions: initialValues?.instructions ?? "",
        }
    })

    const isEditMode = !!initialValues?.id
    const isPending = createAgent.isPending;

    const onSubmit = (values: z.infer<typeof agentInsertSchema>) => {
        if (isEditMode) {
            console.log("Edit mode is not implemented yet");
        } else {
            createAgent.mutate(values)
        }
    }

    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <GeneratedAvatar
                    seed={form.watch("name")}
                    variant={"botttsNeutral"}
                    className="border size-16" />

                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) =>
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g Rohan" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }
                />

                <FormField
                    name="instructions"
                    control={form.control}
                    render={({ field }) =>
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="you are a helpful math assistant that can answer any math related question"
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    }
                />

                <div className=" flex justify-between gap-x-2"> 
                    {
                        onCancel && 
                        <Button
                        variant="ghost"
                        disabled={isPending}
                        type="button"
                        onClick={()=> onCancel?.()}>
                            Cancel
                        </Button>
                    }

                    <Button disabled={isPending} type="submit" >
                        {isEditMode ? "Update" : "Create"}
                    </Button>
                </div>
            </form>

        </Form>
    )

};