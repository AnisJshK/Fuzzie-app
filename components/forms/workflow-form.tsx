'use client'
import { WorkflowFormSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod' 
import { useRouter } from 'next/navigation'
import React from 'react'
import { Form, useForm } from 'react-hook-form'
import {z} from 'zod'
import { Card } from '../global/container-scroll-animation'
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

type Props = {
    title?:string
    subTitle?:string
}

const WorkflowForm = ({title,subTitle}: Props) => {
    const form = useForm<z.infer<typeof WorkflowFormSchema>>({
        mode:'onChange',
        resolver:zodResolver(WorkflowFormSchema),
        defaultValues:{
            name:'',
            description:'',
        },
    })
    const isLoading = form.formState.isLoading
    const router = useRouter()

    const handleSubmit = async(values:z.infer<typeof WorkflowFormSchema>)=>{
        // const workflow = await onCreateWorkflow(values.name,values.description)
        // if(workflow){
        //     toast.message(workflow.message)
        //     router.refresh()
        // }
        // setClose()
    }
  return (
    <Card className="w-full max-w-[650px] border-none" >
        {title && subTitle && (
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subTitle}</CardDescription>
            </CardHeader>
        )}
        <CardContent>
            <form onSubmit={form.handleSubmit(handleSubmit)}
            className='flex flex-col gap-4 text-left'
            >
                <FieldGroup>
                    <Field
                    data-invalid = {!!form.formState.errors.name}
                    data-disabled = {isLoading}
                    >
                        <FieldLabel htmlFor='name'>Name</FieldLabel>
                        <Input id='name'
                        placeholder='Name'
                        disabled={isLoading}
                        {...form.register('name')}
                        />
                        
                        <FieldError errors = {[form.formState.errors.name]}/>
                    </Field>
                    <Field 
                    data-invalid = {!!form.formState.errors.description}
                    data-disabled = {isLoading}
                    >
                        <FieldLabel htmlFor='description'>Description</FieldLabel>
                        <Input
                        id='description'
                        placeholder='Description'
                        disabled={isLoading}
                        {...form.register('description')}
                        />
                        <FieldError errors={[form.formState.errors.description]}/>
                    </Field>
                </FieldGroup>
                <Button className='mt-4' disabled={isLoading} type='submit'>
                    {isLoading ? (
                        <>
                        <Loader2 className='mr-2 h-4 2-4 animate-spin'/> Saving
                        </>
                    ):(
                        'Save Settings'
                    )}

                </Button>
            </form>
        </CardContent>
    </Card>
  )
}

export default WorkflowForm