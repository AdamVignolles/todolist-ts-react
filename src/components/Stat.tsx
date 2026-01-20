import { useMemo } from 'react';
import { type tache } from '../types';
import { Stack } from '@mantine/core';

interface Props {
    taches: tache[];
}

export default function Stats({ taches }: Props) {
    const total = taches.length;
    const completed = useMemo(() => taches.filter(t => t.completed).length, [taches]);
    const pending = total - completed;
    return (
        <Stack className="stats">
            <div>Total tasks: {total}</div>
            <div>Completed tasks: {completed}</div>
            <div>Pending tasks: {pending}</div>
        </Stack>
    );
}