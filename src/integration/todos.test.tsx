import { render, screen, waitFor } from '@testing-library/react';
import TodoList from '../pages/todoList/todoList.tsx';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';
import { rest } from 'msw';
import { BASE_URL } from '../testUtils/constants.ts';
import { TODO_1, TODO_2 } from '../testUtils/objectMother.ts';
import { GetTodosApiResponse, Todo } from '../apiClients/GENERATED_todoClientEndpoints.ts';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';

const renderApp = async () => {
    render(
        <Provider store={store}>
            <TodoList />
        </Provider>,
    );
    await screen.findByText(TODO_1.title);
};

function buildGetTodoResponse(todos: Todo[]): GetTodosApiResponse {
    return {
        todos: todos,
    };
}

const todoHandlers = [
    rest.get(`${BASE_URL}/todo`, (_, result, context) => {
        return result(context.json(buildGetTodoResponse([TODO_1])));
    }),
];

export const server = setupServer(...todoHandlers);

describe('todos', () => {
    const user = userEvent.setup({ skipHover: true });

    beforeEach(() => {
        server.listen();
    });

    afterEach(() => {
        server.resetHandlers();
    });

    afterAll(() => {
        server.close();
    });

    test('list todos', async () => {
        render(
            <Provider store={store}>
                <TodoList />
            </Provider>,
        );
        await screen.findByText('Task List');
        await screen.findByText(TODO_1.title);
    });

    test('add todo', async () => {
        await renderApp();

        server.use(rest.post(`${BASE_URL}/todo`, (_, result, context) => result.once(context.json({ TODO_2 }))));
        server.use(
            rest.get(`${BASE_URL}/todo`, (_, result, context) =>
                result.once(context.json(buildGetTodoResponse([TODO_1, TODO_2]))),
            ),
        );

        await user.type(screen.getByRole('textbox'), TODO_2.title);
        await user.click(
            screen.getByRole('button', {
                name: 'Add',
            }),
        );

        await screen.findByText(TODO_1.title);
        await screen.findByText(TODO_2.title);
    });

    test('update todos', async () => {
        await renderApp();

        server.use(
            rest.put(`${BASE_URL}/todo/:todoId`, (_, result, context) =>
                result.once(context.json({ ...TODO_1, complete: true })),
            ),
        );
        server.use(
            rest.get(`${BASE_URL}/todo`, (_, result, context) =>
                result.once(context.json(buildGetTodoResponse([{ ...TODO_1, complete: true }]))),
            ),
        );

        await user.click(screen.getByText(TODO_1.title));

        await waitFor(() => {
            expect(
                screen.getByRole('checkbox', {
                    name: TODO_1.title,
                }),
            ).toBeChecked();
        });
    });

    test('delete todos', async () => {
        await renderApp();

        server.use(rest.delete(`${BASE_URL}/todo/:todoId`, (_, result, context) => result.once(context.text(''))));
        server.use(
            rest.get(`${BASE_URL}/todo`, (_, result, context) => result.once(context.json(buildGetTodoResponse([])))),
        );

        await user.click(
            screen.getByRole('button', {
                name: /delete/i,
            }),
        );

        await waitFor(() => {
            expect(screen.queryByText(TODO_1.title)).not.toBeInTheDocument();
        });
    });
});
