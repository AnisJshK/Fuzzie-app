import { ConnectionsProvider } from '@/providers/connection-provider'
import EditorProvider from '@/providers/editor-provider'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <div className='h-full'>
        <EditorProvider>
          <ConnectionsProvider>
            <></>
            </ConnectionsProvider>    
        </EditorProvider>
    </div>
  )
}

export default Page