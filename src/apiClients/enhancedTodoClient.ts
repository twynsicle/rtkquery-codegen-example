//TODO move generated version into codegen folder

import { todoClientEndpoints } from './GENERATED_todoClientEndpoints.ts';

export const enhancedTodoClient = todoClientEndpoints.enhanceEndpoints({
    addTagTypes: ['Todo'],
    endpoints: {
        getTodos: {
            providesTags: ['Todo'],
        },
        createTodo: {
            invalidatesTags: ['Todo'],
        },
        updateTodo: {
            invalidatesTags: ['Todo'],
        },
        deleteTodo: {
            invalidatesTags: ['Todo'],
        },
    },
});

export const { useGetTodosQuery, useUpdateTodoMutation, useCreateTodoMutation, useDeleteTodoMutation } =
    enhancedTodoClient;
