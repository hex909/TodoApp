import React from 'react'
import moon from "../images/icon-moon.svg";
import sun from "../images/icon-sun.svg";

export default function Header({changeLight, handleSubmit, isLight, value, setValue}) {
  return <>
<section className="todos-header">
        <h2 className="main-title">TODO</h2>
        <button className="theme-switch" onClick={() => changeLight()}>
          <img src={isLight ? sun : moon} alt="err" />
        </button>
      </section>
      <section className="todos-input">
        <form className="form-input" onSubmit={(e) => handleSubmit(e)}>
          <div className="input-container">
            <input
              type="text"
              name="todos"
              id="todos"
              placeholder="Create a new todo..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </form>
      </section>
              </>
}
