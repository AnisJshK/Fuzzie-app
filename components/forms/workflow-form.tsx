import { WorkflowFormSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {
    title?:string
    subTitle?:string
}

const WorkflowForm = (props: Props) => {
    const form = useForm<z.infer<typeof WorkflowFormSchema>>({
        mode:'onChange',
        resolver:zodResolver(WorkflowFormSchema),
        defaultValues:{
            name:'',
            description:'',
        },
    })
  return (
    <div>WorkflowForm</div>
  )
}

export default WorkflowForm