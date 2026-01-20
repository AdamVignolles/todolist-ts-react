import { NativeSelect, Group } from '@mantine/core';

interface Props {
    value: string;
    onChange: (v: string) => void;
}


export default function Filter({ value, onChange }: Props) {
    return (
        <Group className="filter">
            <NativeSelect value={value} onChange={(e) => onChange(e.target.value)} data={[
                { value: 'all', label: 'All' },
                { value: 'completed', label: 'Completed' },
                { value: 'pending', label: 'Pending' },
            ]} />
        </Group>
    );
}