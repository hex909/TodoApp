import React, { useEffect, useRef, useState } from "react";
import Todo from "./Todo";
import { v4 } from "uuid";
import Header from "./Header";

export default function Todos({ isLight, changeLight }) {
  const mainTodo = useRef([]);
  const [todoActive, setTodoActive] = useState(0);
  const allRef = useRef("all");
  const [todoList, setTodoList] = useState([]);
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("there is no todos");
  const [isShowMessage, setIsShowMessage] = useState(true);
  
  useEffect(() => {
    if (localStorage.getItem("data")) {
      let data = JSON.parse(localStorage.getItem("data"));
      setTodoList(data);
      mainTodo.current = data;
    } else {
      console.log(localStorage.getItem("data"));
    }
  }, []);

  useEffect(() => {
    let data = JSON.stringify(mainTodo.current);
    localStorage.setItem("data", data);
    let newActiveData = mainTodo.current.filter((d) => !d.complete);
    setTodoActive(newActiveData.length);

    if (allRef.current !== "complete" && mainTodo.current.length > 0) {
      setIsShowMessage(false);
    }
  }, [todoList, allRef]);

  function handleSubmit(e) {
    e.preventDefault();
    if (value) {
      mainTodo.current = [
        ...mainTodo.current,
        { id: v4(), todoData: value, complete: false },
      ];

      if (allRef.current === "all") {
        setTodoList(mainTodo.current);
      } else if (allRef.current === "active") {
        setTodoList(mainTodo.current.filter(data => !data.complete));
      } else if (allRef.current === "complete") {
        setTodoList(mainTodo.current.filter(data => data.complete));
      }
    }
    setValue("");
  }

  function removeTodo(id) {
    mainTodo.current = mainTodo.current.filter((item) => item.id !== id);
    setTodoActive(mainTodo.current.filter((d) => !d.complete).length);
    setTodoList(mainTodo);
    if (allRef.current === "all") {
      showAll();
    } else if (allRef.current === "active") {
      showActive();
    } else if (allRef.current === "complete") {
      showCompleted();
    }
  }

  function clearCompleted() {
    mainTodo.current = mainTodo.current.filter(data => !data.complete);
    setTodoList(mainTodo.current);

    if (allRef.current === "complete") {
      showCompleted();
    } else if (allRef.current === "all" && todoList.length === 0) {
      displayNothingMessage("there is no todos", true);
    }
  }

  function completeTodo(id) {
    let newData = mainTodo.current.map(data => {
      if (data.id === id) {
        return { ...data, complete: !data.complete };
      }
      return { ...data };
    });
    mainTodo.current = newData;
    if (allRef.current === "all") {
      setTodoList(mainTodo.current);
    } else if (allRef.current === "active") {
      showActive();
      setTodoActive(mainTodo.current.filter((d) => !d.complete).length);
    } else if (allRef.current === "complete") {
      showCompleted();
      setTodoActive(mainTodo.current.filter((d) => !d.complete).length);
    }
  }

  function showAll() {
    allRef.current = "all";
    if (mainTodo.current.length > 0) {
      displayNothingMessage();
      setTodoList(mainTodo.current);
    } else {
      displayNothingMessage("there is no todos", true);
    }
  }

  function showActive() {
    let newData = mainTodo.current.filter(data => !data.complete);
    allRef.current = "active";
    if (newData.length !== 0) {
      displayNothingMessage();
      setTodoList(newData);
      return
    }
    displayNothingMessage("there is no active todos", true);
    
  }

  function showCompleted() {
    allRef.current = "complete";
    let newData = mainTodo.current.filter(data => data.complete);
    if (newData.length > 0) {
      displayNothingMessage();
      setTodoList(newData);
    } else {
      displayNothingMessage("there is no completed todos", true);
    }
  }

  function displayNothingMessage(message = "", condition = false) {
    setMessage(message);
    setIsShowMessage(condition);
  }

  return (
    <>
      <Header
        changeLight={changeLight}
        handleSubmit={handleSubmit}
        isLight={isLight}
        value={value}
        setValue={setValue}
      />

      <Todo
        isShowMessage={isShowMessage}
        message={message}
        allRef={allRef.current}
        todoActive={todoActive}
        mainTodo={mainTodo}
        todoList={todoList}
        showCompleted={showCompleted}
        showAll={showAll}
        showActive={showActive}
        clearCompleted={clearCompleted}
        removeTodo={removeTodo}
        completeTodo={completeTodo}
      />
      {mainTodo.current.length > 1 && (
        <p className="note">Drag and drop to reorder list</p>
      )}
    </>
  );
}