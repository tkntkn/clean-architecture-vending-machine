import { useState } from "react";
import reactLogo from "@/interface/assets/react.svg";
import "@/interface/pages/Root.css";

export function Root(props: {}) {
  const [count, setCount] = useState(0);

  return (
    <div className="Root">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="Root-logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="Root-logo--react" alt="React logo" />
        </a>
      </div>
      <h1 className="Root-h1">Vite + React</h1>
      <div className="Root-card">
        <button className="Root-button" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="Root-readTheDocs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}
