import { TextInput, Group } from '@mantine/core'

interface Props {
    value: string;
    onChange: (v: string) => void;
}

export default function Search({ value, onChange }: Props) {
    return (
        <Group className="search">
            <TextInput
                type="text"
                placeholder="Search tasks..."
                size="md"
                radius="md"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </Group>
    );
}