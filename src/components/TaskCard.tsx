import { Trash } from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

interface TaskCardProps {
  id: string
  taskName: string
  onTaskDone: (checked: boolean) => void
  onDeleteTask: (id: string) => void
}

export function TaskCard({id, onTaskDone, taskName, onDeleteTask}: TaskCardProps) {
  const [checked, setChecked] = useState(false)

  function handleChecked() {
    setChecked((checkedState) => !checkedState)
    onTaskDone(checked)
  }

  function handleDelete() {
    onDeleteTask(id)
  }

  return (
    <li className='pb-4 px-5 bg-zinc-800 rounded-lg flex gap-3 items-start mb-3'>
      <Checkbox.Root className={`mt-[14px] w-5 h-5 flex ${checked && 'bg-violet-500'} justify-center items-center rounded-full ${checked ? 'border-violet-500' : 'border-blue-400'} border-2`} checked={checked} onClick={handleChecked}>
        <Checkbox.Indicator>
          {checked && <CheckIcon />}
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span className={`mt-[10px] flex w-[39.5rem] ${checked && 'line-through'} ${checked && 'text-zinc-500'}`}>{taskName}</span>
      <Trash className='mt-4 cursor-pointer text-red-500 hover:text-red-600' size={16} onClick={handleDelete}/>
    </li>
  )
}