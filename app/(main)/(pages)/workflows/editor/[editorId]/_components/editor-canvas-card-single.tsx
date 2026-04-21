
import { EditorCanvasCardType } from '@/lib/types'
import { useEditor } from '@/providers/editor-provider'
import React, { useMemo } from 'react'
import { Position, useNodeId } from 'reactflow'
import EditorCanvasIconHelper from './editor-canvas-icon-helper'
import CustomHandle from './custom-handle'
import { Badge } from '@/components/ui/badge'
import { NodeProps } from 'reactflow'



import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import clsx from 'clsx'

type Props = {}
const rand = Math.random();

const EditorCanvasCardSingle = (props:NodeProps) => {
  const { dispatch, state } = useEditor()
  const {data,id} = props
  const nodeId = useNodeId()
  const logo = useMemo(() => {
    return <EditorCanvasIconHelper type={data.type} />
  }, [data])

  return (
    <>
      {data.type !== 'Trigger' && data.type !== 'Google Drive' && (
        <CustomHandle
          type="target"
          position={Position.Top}
          style={{ zIndex: 100 }}
        />
      )}
      <Card
        onClick={(e) => {
          e.stopPropagation()
          
          dispatch({
            type:'SELECTED_ELEMENT',
            payload :{
              element:{
                id,
                data,
                type:data.type,
                position:{x:0,y:0},
              }
            }
          })
        }}
        className="relative max-w-[400px] dark:border-muted-foreground/70"
      >
        <CardHeader className="flex flex-row items-center gap-4">
          <div>{logo}</div>
          <div>
            <CardTitle className="text-md">{data.title}</CardTitle>
            <CardDescription>
              <span className="block text-xs text-muted-foreground/50">
        <b className="text-muted-foreground/80">ID: </b>
        {nodeId}
      </span>
      <span className="block">{data.description}</span>
            </CardDescription>
          </div>
        </CardHeader>
        <Badge
          variant="secondary"
          className="absolute right-2 top-2"
        >
          {data.type}
        </Badge>
        <div
          className={clsx('absolute left-3 top-4 h-2 w-2 rounded-full', {
            'bg-green-500': rand < 0.6,
            'bg-orange-500': rand >= 0.6 && rand < 0.8,
            'bg-red-500': rand >= 0.8,
          })}
        ></div>
      </Card>
      <CustomHandle
        type="source"
        position={Position.Bottom}
        id="a"
      />
    </>
  )
}

export default EditorCanvasCardSingle