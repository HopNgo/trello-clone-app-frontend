import React from "react";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <nav className="navbar app">App Bar</nav>
      <nav className="navbar board">Board Bar</nav>
      <div className="board-columns">
        <div className="column">
          <header>Brainstorm</header>
          <ul>
            <li>
              <img
                src="data:image/png;base64,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"
                alt=""
              />
            </li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
          </ul>
          <footer>Add another card</footer>
        </div>
        <div className="column">
          <header>Brainstorm</header>
          <ul>
            <li>
              <img
                src="data:image/png;base64,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"
                alt=""
              />
            </li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
          </ul>
          <footer>Add another card</footer>
        </div>
        <div className="column">
          <header>Brainstorm</header>
          <ul>
            <li>
              <img
                src="data:image/png;base64,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"
                alt=""
              />
            </li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
          </ul>
          <footer>Add another card</footer>
        </div>
        <div className="column">
          <header>Brainstorm</header>
          <ul>
            <li>
              <img
                src="data:image/png;base64,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"
                alt=""
              />
            </li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
          </ul>
          <footer>+ Add another card</footer>
        </div>
        <div className="column">
          <header>Brainstorm</header>
          <ul>
            <li>
              <img
                src="data:image/png;base64,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"
                alt=""
              />
            </li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
          </ul>
          <footer>Add another card</footer>
        </div>
        <div className="column">
          <header>Brainstorm</header>
          <ul>
            <li>
              <img
                src="data:image/png;base64,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"
                alt=""
              />
            </li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
          </ul>
          <footer>Add another card</footer>
        </div>
        <div className="column">
          <header>Brainstorm</header>
          <ul>
            <li>
              <img
                src="data:image/png;base64,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"
                alt=""
              />
            </li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
            <li>Clasmenemaoasdmsdmsmdsmdsmdsm</li>
          </ul>
          <footer>Add another card</footer>
        </div>
      </div>
    </div>
  );
}

export default App;
