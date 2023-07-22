import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
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

    if (deleteResponse.isLoading || deleteResponse.isSuccess) {
        return null;
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
        createTodo({ todo: { title: title, complete: false } });
        setTitle('');
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

function TodoList() {
    const { data, isLoading, isError } = useGetTodosQuery();

    if (isLoading) {
        return <p>loading...</p>;
    }

    if (isError || !data) {
        return <p>failed to load todos</p>;
    }

    return (
        <div className="app">
            <div className="container">
                <Typography variant="h4" component="h2">
                    Task List
                </Typography>
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

export default TodoList;
