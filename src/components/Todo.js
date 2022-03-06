import React, { useEffect } from "react";
import cross from "../images/icon-cross.svg";
import check from "../images/icon-check.svg";
import Sortable from "sortablejs";

export default function Todo({
  isShowMessage,
  message,
  allRef,
  todoActive,
  showCompleted,
  todoList,
  showActive,
  showAll,
  clearCompleted,
  removeTodo,
  completeTodo,
}) {
  useEffect(() => {
    let sortable = new Sortable.create(document.querySelector(".todos-items"), {
      delayOnTouchOnly: true,
      delay: 200,
      draggable: ".todo-item",
    });
  }, []);

  return (
    <>
      <section className="todos-items">
        {isShowMessage ? (
          <ErrMessage message={message} />
        ) : (
          todoList.map((list) => {
            return (
              <div
                className={`todo-item ${list.complete && "complete"}`}
                key={list.id}
              >
                <div className="tickbox" onClick={() => completeTodo(list.id)}>
                  <img src={list.complete ? check : undefined} alt="" />
                </div>
                <p className="todo-title" onClick={() => completeTodo(list.id)}>
                  {list.todoData}
                </p>
                <button
                  className="closeBtn"
                  onClick={() => removeTodo(list.id)}
                >
                  <img src={cross} alt="" />
                </button>
              </div>
            );
          })
        )}
      </section>
      <section className="filter-and-clear">
        <p className="items-left">{todoActive} items left</p>
        <FilterMenu
          allRef={allRef}
          showCompleted={showCompleted}
          showActive={showActive}
          showAll={showAll}
        />
        <button className="clearAll" onClick={clearCompleted}>
          Clear Completed
        </button>
      </section>

        <section className="mobile-filter">
          <FilterMenu
            allRef={allRef}
            showCompleted={showCompleted}
            showAll={showAll}
            showActive={showActive}
          />
        </section>
    </>
  );
}

function FilterMenu({ allRef, showActive, showAll, showCompleted }) {
  return (
    <div className="filter">
      <p
        className={`filter-all ${allRef === "all" && "active"}`}
        onClick={() => {
          showAll();
          
        }}
        >
        All
      </p>
      <p
        className={`filter-active ${allRef === "active" && "active"}`}
        onClick={() => {
          showActive();
        }}
      >
        Active
      </p>
      <p
        className={`filter-completed ${allRef === "complete" && "active"}`}
        onClick={() => {
          showCompleted();
        }}
      >
        Completed
      </p>
    </div>
  );
}

function ErrMessage({ message }) {
  return (
    <div className="Messagecontainer">
      <h4>{message}</h4>
    </div>
  );
}