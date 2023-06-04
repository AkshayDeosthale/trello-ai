import { database, storage } from "@/appwrite";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoard: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
  deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;
  newTaskInput: string;
  setNewTaskInput: (e: string) => void;
  newTaskType: TypedColumn;
  setNewTaskType: (columnId: TypedColumn) => void;

  image: File | null;
  setImage: (image: File | null) => void;

  addtask: (todo: string, columnId: TypedColumn, image?: File | null) => void;
}

const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoard: (board: Board) => {
    set({ board });
  },
  updateTodoInDB: async (todo, columnId) => {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },

  searchString: "",
  setSearchString: (searchString) => set({ searchString }),

  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
    const newColmins = new Map(get().board.columns);
    newColmins.get(id)?.todos.splice(taskIndex, 1);
    set({ board: { columns: newColmins } });

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }

    await database.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    );
  },

  newTaskInput: "",
  setNewTaskInput: (e: string) => {
    set({ newTaskInput: e });
  },

  newTaskType: "todo",
  setNewTaskType: (columnId: TypedColumn) => {
    set({ newTaskType: columnId });
  },

  image: null,
  setImage: (image: File | null) => {
    set({ image });
  },

  addtask: async () => {},
}));

export default useBoardStore;

// https://www.youtube.com/watch?v=TI2AvfCj5oM&list=WL&index=4&t=13s : 3:35:53
