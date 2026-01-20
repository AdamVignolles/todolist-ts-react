import { type tache } from '../types';
import { Button, Checkbox, Group } from '@mantine/core'

interface Props {
    tache: tache;
    onToggle: () => void;
    onRemove: () => void;
    onSelect?: () => void;
}


export default function Task({ tache, onToggle, onRemove, onSelect }: Props) {
    return (
        <Group className={tache.completed ? 'completed' : ''} onClick={onSelect}>
            <Checkbox checked={tache.completed} onChange={(e) => { e.stopPropagation(); onToggle(); }} />
            {tache.nom} (ID: {tache.id})
            <Button variant="light" size="md" radius="md" onClick={(e) => { e.stopPropagation(); onRemove(); }}>Delete</Button>
        </Group>
    );
}