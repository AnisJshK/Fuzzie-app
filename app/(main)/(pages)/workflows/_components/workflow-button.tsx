import CustomModal from '@/components/global/custom-modal'
import { useModal } from '@/providers/modal-provider'
import React, { Children } from 'react'

type Props = {}

const WorkflowButton = (props: Props) => {
    const {setOpen,setClose} = useModal()

    const handleClick = () => {
        setOpen(
            <CustomModal
            title='Create a Workflow Automation'
            subheading='Workflows are a powerfull that help you automate tasks'
            >
                <WorkFlowForm/>
            </CustomModal>
        )
    }

  return (
    <div>WorkflowButton</div>
  )
}

export default WorkflowButton