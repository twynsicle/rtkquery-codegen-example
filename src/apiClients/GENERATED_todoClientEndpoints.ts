import { todoClient as api } from './todoClient';
const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTodos: build.query<GetTodosApiResponse, GetTodosApiArg>({
            query: () => ({ url: `/todo/` }),
        }),
        createTodo: build.mutation<CreateTodoApiResponse, CreateTodoApiArg>({
            query: (queryArg) => ({ url: `/todo/`, method: 'POST', body: queryArg.todo }),
        }),
        updateTodo: build.mutation<UpdateTodoApiResponse, UpdateTodoApiArg>({
            query: (queryArg) => ({
                url: `/todo/todo_id`,
                method: 'PUT',
                body: queryArg.todo,
                params: { todo_id: queryArg.todoId },
            }),
        }),
        deleteTodo: build.mutation<DeleteTodoApiResponse, DeleteTodoApiArg>({
            query: (queryArg) => ({ url: `/todo/todo_id`, method: 'DELETE', params: { todo_id: queryArg.todoId } }),
        }),
    }),
    overrideExisting: false,
});
export { injectedRtkApi as todoClientEndpoints };
export type GetTodosApiResponse = /** status 200 Successful Response */ Todos;
export type GetTodosApiArg = void;
export type CreateTodoApiResponse = /** status 201 Successful Response */ any;
export type CreateTodoApiArg = {
    todo: Todo;
};
export type UpdateTodoApiResponse = /** status 200 Successful Response */ any;
export type UpdateTodoApiArg = {
    todoId: number;
    todo: Todo;
};
export type DeleteTodoApiResponse = /** status 200 Successful Response */ any;
export type DeleteTodoApiArg = {
    todoId: number;
};
export type Todo = {
    id?: number;
    title: string;
    complete: boolean;
};
export type Todos = {
    todos: Todo[];
};
export type ValidationError = {
    loc: (string | number)[];
    msg: string;
    type: string;
};
export type HttpValidationError = {
    detail?: ValidationError[];
};
export const { useGetTodosQuery, useCreateTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = injectedRtkApi;
