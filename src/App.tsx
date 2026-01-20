import { useState, useEffect } from 'react';
import { type tache } from './types';
import NewTaskForm from './components/NewTaskForm';
import Filter from './components/Filter';
import TaskList from './components/TaskList';
import Stats from './components/Stat';
import Search from './components/Search';
import './App.css';


import '@mantine/core/styles.css';
import { MantineProvider, Stack, Center, Space } from '@mantine/core';

export default function TaskManager() {
  const [taches, setTaches] = useState<tache[]>([]);
  const [currentName, setCurrentName] = useState('');
  const [filtre, setFiltre] = useState('all');
  const [query, setQuery] = useState('');

  const STORAGE_KEY = 'tasks_v1';
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setTaches(JSON.parse(stored));
    } catch (err) { /* ignore */ }
  }, []);



  function addTask() {
    if (!currentName.trim()) return;
    setTaches(prev => {
      const maxId = prev.length ? Math.max(...prev.map(t => t.id)) : 0;
      const next = [...prev, { id: maxId + 1, nom: currentName.trim(), completed: false }];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (err) { /* ignore */ }
      return next;
    });
    setCurrentName('');
  }

  function toggleTask(target: tache) {
    setTaches(prev => {
      const next = prev.map(t => t.id === target.id ? { ...t, completed: !t.completed } : t);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (err) { /* ignore */ }
      return next;
    });
  }

  function removeTask(target: tache) {
    setTaches(prev => {
      const next = prev.filter(t => t.id !== target.id);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (err) { /* ignore */ }
      return next;
    });
  }

  function deleteCompleted() {
    setTaches(prev => {
      const next = prev.filter(t => !t.completed);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (err) { /* ignore */ }
      return next;
    });
  }



  return <MantineProvider>{
    <Stack
      className="app"
      align="center"
      justify="center"
      gap="md">
      <Stack align="stretch"
        justify="center"
        gap="md">

        <Center>
          <h1>TO-DO List</h1>
        </Center>
        <Space h="md" />
        <NewTaskForm value={currentName} onChange={setCurrentName} onAdd={addTask} onDeleteCompleted={deleteCompleted} />
        <Stats taches={taches} />
        <Search value={query} onChange={setQuery} />
        <Filter value={filtre} onChange={setFiltre} />
        <Space h="md" />
        <TaskList taches={taches} filtre={filtre} query={query} onToggle={toggleTask} onRemove={removeTask} onSelect={(t) => setCurrentName(t.nom)} />
      </Stack>
    </Stack>
  }</MantineProvider>;
}