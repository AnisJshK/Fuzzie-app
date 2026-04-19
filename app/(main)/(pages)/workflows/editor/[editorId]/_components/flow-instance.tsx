import { Button } from '@/components/ui/button'
import { useNodeConnections } from '@/providers/connection-provider'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { onCreateNodesEdges, onFlowPublish } from '../_actions/workflow-connections'

type Props = {
    children:React.ReactNode 
    edges:any[]
    nodes:any[]
}

const FlowInstance = ({children,edges,nodes}: Props) => {
    const pathname = usePathname()
    const [isFlow,setIsFlow] = useState([])
    const {nodeConnection} = useNodeConnections()

    const onFlowAutomation = useCallback(async () => {
        const id = pathname.split('/').pop();
        if(!id) return;
        const flow = await onCreateNodesEdges(
            id,
            JSON.stringify(nodes),
            JSON.stringify(edges),
            JSON.stringify(isFlow)
        )
        if(flow) toast.message(flow.message)
    },[pathname,nodes,edges,isFlow])

    const onPublishWorkflow = useCallback(async ()=>{
        const response = await onFlowPublish(pathname.split('/').pop()!,true)
        if(response) toast.message(response)
    },[pathname])

    
    useEffect(()=>{
       const onAutomateFlow = async () =>{
        const flows:any = []
        const connectedEdges = edges.map((edge)=>edge.target)
        connectedEdges.map((target)=>{
            nodes.forEach((node)=>{
                if(node.id===target){
                    flows.push(node.type)
                }
            })
        })
        setIsFlow(flows)
    }
    },[edges])

    
  return (
    <div className='flex flex-col gap-2'>
        <div className='flex gap-3 p-4'>
            <Button 
            onClick={onFlowAutomation}
            disabled={isFlow.length<1}
            > 
                Save
            </Button>
            <Button 
            disabled={isFlow.length<1}
            onClick={onPublishWorkflow}
            >
                Publish
            </Button>
        </div>
        {children}
    </div>
  )
}

export default FlowInstance