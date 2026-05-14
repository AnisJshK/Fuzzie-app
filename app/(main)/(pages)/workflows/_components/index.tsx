import React from 'react'
import Workflow from './workflow'
import { onGetWorkflows } from '../_actions/workflow-connections'
import MoreCredits from './more-credits'

type Props = {
  name:string,id:string,description:string,publish:boolean|null
}

const Workflows = async({name,id,description,publish}: Props) => {
  const workflows = await onGetWorkflows()
  return (
    <div className='relative flex flex-col gap-4'>
        <section className='flex flex-col m-2'>
          <MoreCredits/>
          {workflows?.length ? (
            workflows.map((flow)=>(
              <Workflow 
              key={flow.id}
              {...flow}
              />
            ))
          ) : (
            <div className='mt-28 flex text-muted-foreground items-center justify-center'>
              No WorkFlows
            </div>
          )}
        </section>
        </div>
  ) 
}

export default Workflows