from typing import List, Type

from fastapi import Depends, APIRouter, Response

from sqlalchemy.orm import Session
from starlette import status

from app import schemas, models
from app.database import get_db
from app.models import Todo

router = APIRouter()


@router.get("/", operation_id="get_todos", response_model=schemas.Todos)
def get_todos(db: Session = Depends(get_db)):
    todos = db.query(Todo).all()

    return {"todos": [{"id": todo.id, "title": todo.title, "complete": todo.complete} for todo in todos]}


@router.post("/", status_code=status.HTTP_201_CREATED, operation_id="create_todo")
def create_todo(payload: schemas.Todo,  db: Session = Depends(get_db)):
    new_todo = models.Todo(**payload.dict())
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo


@router.put("/todo_id", status_code=status.HTTP_200_OK, operation_id="update_todo")
def update_todo(todo_id: int, payload: schemas.Todo,  db: Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()
    todo.title = payload.title
    todo.complete = payload.complete
    db.commit()
    db.refresh(todo)
    return todo


@router.delete("/todo_id", status_code=status.HTTP_200_OK, operation_id="delete_todo")
def delete_todo(todo_id: int,  db: Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not todo:
        return Response(status_code=status.HTTP_410_GONE)
    db.delete(todo)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
