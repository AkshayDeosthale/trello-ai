import React from "react";
import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import useBoardStore from "@/store/BoardStore";

type Props = {
  id: string;
  index: number;
  todos: Todo[];
};

// const idToColumnText: {
//   [key in TypedColumn]: string;
// } = {
//   todo: "To Do",
//   inprogress: "In Progress",
//   done: "Done",
// } ;

const idToColumnText: any = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

const Column = (props: Props) => {
  const [searchString, setSearchString] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString,
  ]);
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {/* render dropable column with nested dropable */}
          <Droppable droppableId={props.index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`pb-2 p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                }`}
              >
                <h2 className="flex justify-between font-bold text-xl p-2 ">
                  {idToColumnText[props.id]}
                  <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-2 text-sm">
                    {!searchString
                      ? props.todos.length
                      : props.todos.filter((todo) =>
                          todo.title
                            .toLocaleLowerCase()
                            .includes(searchString.toLocaleLowerCase())
                        ).length}
                  </span>
                </h2>

                <div className="space-y-2 ">
                  {props.todos.map((todo, index) => {
                    if (
                      searchString &&
                      !todo.title
                        .toLocaleLowerCase()
                        .includes(searchString.toLocaleLowerCase())
                    )
                      return null;
                    return (
                      <Draggable
                        draggableId={todo.$id}
                        key={todo.$id}
                        index={index}
                      >
                        {(provided) => {
                          return (
                            <TodoCard
                              todo={todo}
                              index={index}
                              id={props.id}
                              innerRef={provided.innerRef}
                              draggableProps={provided.draggableProps}
                              dragHandleProps={provided.dragHandleProps}
                            />
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                  <div className="flex items-end justify-end">
                    <button className=" text-green-500 hover:text-green-600">
                      <PlusCircleIcon className="h-10 w-10  " />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
