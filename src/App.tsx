import Logo from './assets/Logo.svg'
import Clipboard from './assets/Clipboard.svg'
import { TaskCard } from './components/TaskCard'
import { ChangeEvent, useState } from 'react'
import { v4 } from 'uuid'

/*TODO 
 -Sinalizar ao tentar criar uma tarefa sem preencher o input
 */
interface Task {
  id: string
  name: string
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState<Task>()
  const [tasksDone, setTasksDone] = useState(0)

  function onTaskDone(checked: boolean) {
    if(!checked){
    return  setTasksDone(tasksDone + 1)
    }
    return setTasksDone(tasksDone - 1)
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask({id: v4(), name: event.target.value})
  }

  function handleNewTask() {
    if(newTask){
      setNewTask({id: '', name:''})
      return setTasks([...tasks, newTask])
    }
  }
  
  function onDeleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <>
      <header className='bg-zinc-999 pt-18 pb-20 flex justify-center'>
        <img className='w-[100px] sm:w-[126px]' src={Logo} alt="logo" />
      </header>
      
      <section className='w-full px-2 sm:px-0 flex gap-2 justify-center absolute top-[200px] -translate-y-7'>
        <input required className={`text-zinc-50 rounded-lg p-4 bg-zinc-800 max-w-[638px] w-full outline-none focus:ring focus:ring-blue-500 focus:outline focus:outline-2 caret-zinc-50`} type="text" placeholder='Adicione uma nova tarefa' onChange={handleNewTaskChange} value={newTask?.name || ''}/>
        <button className="rounded-lg bg-blue-500 p-4 text-zinc-50 font-bold text-sm flex gap-2 items-center" type='submit' onClick={handleNewTask}>
          Criar <span className='right-2 rounded-full border-2 border-zinc-50 text-center w-4 h-4 p-2 flex justify-center items-center'>+</span>
        </button>
      </section>

      <main className='w-full px-2 sm:px-0 mt-16 flex items-center flex-col'>
        <div className='w-[736px] flex justify-between text-sm mb-6'>
          <strong className='text-blue-300'>Tarefas criadas <span className='text-zinc-50 bg-zinc-700 px-2 py-[2px] rounded-full'>{tasks.length}</span></strong>
          <strong className='text-purple-400'>Concluídas <span className='text-zinc-50 bg-zinc-700 px-2 py-[2px] rounded-full'>{`${tasksDone} de ${tasks.length}`}</span></strong>
        </div>

        {tasks.length === 0 ? (
          <section className='w-[736px] border-t-[1px] border-zinc-600 rounded-lg text-zinc-400 flex flex-col items-center pt-16 pb-30'>
            <img className='max-w-[56px]' src={Clipboard} alt="clipboard" />
            <div className='text-center'>
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          </section>
        ) : (
          <section className='text-zinc-100 w-[736px]'>
            <ul>
              {
                tasks.map((task) => {
                  return <TaskCard 
                    key={task.id} 
                    onTaskDone={onTaskDone} 
                    taskName={task.name} 
                    id={task.id}
                    onDeleteTask={onDeleteTask}
                  />
                })
              }
            </ul>
          </section>
        )}
      </main>
    </>
  )
}
