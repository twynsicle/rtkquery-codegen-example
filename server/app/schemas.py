from pydantic import BaseModel


class Todo(BaseModel):
    id: int | None = None
    title: str
    complete: bool


class Todos(BaseModel):
    todos: list[Todo]


class HealthCheck(BaseModel):
    status: str
