import type { Task } from "../../types/Task";
import TaskItem from "./TaskItem";

interface Props {
    tasks: Task[];
    onDelete: (id: string) => Promise<void>;
    onToggle: (task: Task) => Promise<void>;
}

function TaskList({
    tasks,
    onDelete,
    onToggle,
}: Props) {
    if (tasks.length === 0) {
        return <p>No hay tareas.</p>;
    }

    return (
        <>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                    onToggle={onToggle}
                />
            ))}
        </>
    );
}

export default TaskList;