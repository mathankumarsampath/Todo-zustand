'use client'

import { Status, userTaskStore } from '@/lib/store'
import Task from './task'
import { useEffect, useMemo } from 'react'


export default function Column({
  title,
  status
}: {
  title: string
  status: Status
}) {

  const tasks = userTaskStore(state => state.tasks)
  const filteredTask = useMemo(
    () => tasks.filter(task => task.status === status),
    [tasks, status]
  )

  const filteredTasks = tasks.filter(task => task.status === status)

  const updateTask = userTaskStore(state => state.updateTask)
  const draggedTask = userTaskStore(state => state.draggedTask)
  const dragTask = userTaskStore(state => state.dragTask)

  useEffect(() => {
    userTaskStore.persist.rehydrate()
  }, [])

  const hadnleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggedTask) return
    updateTask(draggedTask, status)
    dragTask(null)
  }

  return (
    <section className='h-[600px] flex-1'>
      <h2 className='ml-1 font-serif text-2xl font-semibold'>{title}</h2>

      <div className='mt-3.5 h-full w-full flex-1 rounded-xl bg-gray-700/50 p-4'
        onDrop={hadnleDrop}
        onDragOver={e => e.preventDefault()}
      >
        <div className='flex flex-col gap-4'>
          {filteredTask.map(task => (
            <Task key={task.id} {...task} />
          ))}
        </div>
      </div>
    </section>
  )
}