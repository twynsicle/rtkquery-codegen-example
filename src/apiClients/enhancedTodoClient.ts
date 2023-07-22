import { todoClientEndpoints } from './GENERATED_todoClientEndpoints.ts';

export const enhancedTodoClient = todoClientEndpoints.enhanceEndpoints({
    addTagTypes: ['Todo'],
    endpoints: {
        getTodos: {
            providesTags: (response) => {
                return response
                    ? [...response.todos.map((todo) => ({ type: 'Todo' as const, id: todo.id })), 'Todo']
                    : ['Todo'];
            },
            onQueryStarted: async (_, { queryFulfilled }) => {
                console.log('onQueryStarted');
                try {
                    const { data } = await queryFulfilled;
                    console.log('onQueryStarted onSuccess', data);
                } catch (err) {
                    console.log('onQueryStarted failure');
                }
            },
        },
        createTodo: {
            invalidatesTags: ['Todo'],
        },
        updateTodo: {
            invalidatesTags: (response) => {
                return [{ type: 'Todo', id: response.id }];
            },
        },
        deleteTodo: {
            invalidatesTags: (_, __, args) => {
                return [{ type: 'Todo', id: args.todoId }];
            },
        },
    },
});

export const { useGetTodosQuery, useUpdateTodoMutation, useCreateTodoMutation, useDeleteTodoMutation } =
    enhancedTodoClient;
