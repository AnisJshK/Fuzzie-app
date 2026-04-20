'use server'

import { db } from '@/lib/db'
import {auth,currentUser} from '@clerk/nextjs/server'
export const getGoogleListener = async () => {
    const {userId} = await auth()

    if(userId){
        const listener = await db.user.findUnique({
            where:{
                clerkId:userId,
            },
            select : {
                googleResourceId:true,
            },
        })
        if(listener) return listener
    }
}

export const onFlowPublish = async(workflowId:string,state:boolean) =>{
    console.log(state);
    const published = await db.workflows.update({
        where:{
            id:workflowId,
        },
        data:{
            publish:state,
        },
    })

    if(published.publish) return 'Workflow published'
    return 'Workflow unpublished'
}

export const onGetWorkflows = async() =>{
    const user = await currentUser();
    if(user){
        const workflow = await db.workflows.findMany({
            where:{
                userId:user.id,
            },

        });
        if(workflow) return workflow;
    }
}

export const onCreateWorkflow = async (name:string,description:string) =>{
    const user = await currentUser()

    if(user){
        const workflow = await db.workflows.create({
            data:{
                userId:user.id,
                name,
                description
            },
        })

        if(workflow) return {message:'workflow created'}
        return {message:'Oops! try again'}

    }
}