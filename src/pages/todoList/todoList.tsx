import { Button, Checkbox, FormControlLabel, TextField, FormGroup, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    useCreateTodoMutation,
    useDeleteTodoMutation,
    useGetTodosQuery,
    useUpdateTodoMutation,
} from '../../apiClients/enhancedTodoClient.ts';
import { Todo } from '../../apiClients/GENERATED_todoClientEndpoints.ts';
import React, { ChangeEvent } from 'react';

function TodoCard({ todo }: { todo: Todo }) {
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo, deleteResponse] = useDeleteTodoMutation();

    const toggleComplete = (event: ChangeEvent<HTMLInputElement>) => {
        updateTodo({
            todoId: todo.id as number,
            todo: {
                ...todo,
                complete: event.target.checked,
            },
        });
    };

    const removeTodo = () => {
        deleteTodo({
            todoId: todo.id as number,
        });
    };

    if (deleteResponse.isLoading) {
        return (
            <ListItem>
                <p>deleting todo</p>
            </ListItem>
        );
    }

    return (
        <ListItem
            style={{ outline: '1px solid #CCC' }}
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={removeTodo}>
                    <DeleteIcon />
                </IconButton>
            }>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={todo.complete} onChange={toggleComplete} />}
                    label={<span style={{ textDecoration: todo.complete ? 'line-through' : '' }}>{todo.title}</span>}
                />
            </FormGroup>
        </ListItem>
    );
}

function CreateTodo() {
    const [title, setTitle] = React.useState('');
    const [createTodo, createTodoResponse] = useCreateTodoMutation();

    const updateName = (event: any) => {
        setTitle(event.target.value ?? '');
    };

    const submitTodo = () => {
        setTitle('');
        createTodo({ todo: { title: title, complete: false } });
    };

    if (createTodoResponse.isError) {
        return <p>failed to create todo</p>;
    }

    return (
        <ListItem>
            <TextField variant="outlined" size="small" placeholder="New Task" value={title} onChange={updateName} />
            <Button style={{ marginLeft: '20px' }} variant="outlined" onClick={submitTodo}>
                Add
            </Button>
        </ListItem>
    );
}

function App() {
    const { data, isError } = useGetTodosQuery();

    if (isError || !data) {
        return <p>failed to load todos</p>;
    }

    return (
        <div className="app">
            <div className="container">
                <h1 className="text-center mb-4">Task List</h1>
                <CreateTodo />
                <List dense={true}>
                    {data.todos.map((todo: Todo) => (
                        <TodoCard key={todo.id} todo={todo} />
                    ))}
                </List>
            </div>
        </div>
    );
}

export default App;
