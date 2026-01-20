import { Button, TextInput, Group } from '@mantine/core'

interface Props {
    value: string;
    onChange: (v: string) => void;
    onAdd: () => void;
    onDeleteCompleted?: () => void;
}


export default function NewTaskForm({ value, onChange, onAdd, onDeleteCompleted }: Props) {
    return (
        <Group className="newTask" gap="sm">
            <TextInput value={value} onChange={(e) => onChange(e.target.value)} placeholder="Task name" />
            <Button variant="light" size="md" radius="md" onClick={onAdd}>Add</Button>
            <Button variant="light" size="md" radius="md" onClick={onDeleteCompleted}>Delete all completed tasks</Button>
        </Group>
    );
}