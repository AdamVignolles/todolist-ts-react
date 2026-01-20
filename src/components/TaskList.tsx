import Task from './Task';
import { type tache } from '../types';
import { Space } from '@mantine/core';

interface Props {
    taches: tache[];
    filtre: string;
    query?: string;
    onToggle: (t: tache) => void;
    onRemove: (t: tache) => void;
    onSelect?: (t: tache) => void;
}

export default function TaskList({ taches, filtre, query, onToggle, onRemove, onSelect }: Props) {
    const filtered = taches.filter(t => {
        if (filtre === 'completed') return t.completed;
        if (filtre === 'pending') return !t.completed;
        return true;
    });
    const finalFiltered = query && query.trim()
        ? filtered.filter(t => t.nom.toLowerCase().includes(query.toLowerCase()))
        : filtered;

    if (finalFiltered.length === 0) return <p>Aucune tâche disponible.</p>;

    return <div>{finalFiltered.map((t, index) => (
        <>
            <Task key={t.id} tache={t} onToggle={() => onToggle(t)} onRemove={() => onRemove(t)} onSelect={() => onSelect?.(t)} />
            {index < finalFiltered.length - 1 && <Space h="sm" />}
        </>
    ))}</div>;
}