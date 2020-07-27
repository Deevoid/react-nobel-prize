import React from "react";
import Data from "./components/Data";
import { Gradient } from "react-gradient";
import ScrollToTop from "react-scroll-to-top";

export default function App() {
  return (
    <>
      <ScrollToTop smooth color="#6f00ff" />
      <header className="header">
        <Gradient
          gradients={[
            ["#6f00ff", "#9CA2FF"],
            ["#FF47F4", "#6DFF5C"],
          ]}
          property="text"
          duration="2000"
          element="h1"
          angle="30deg"
          className="text"
        >
          Nobel Prize
        </Gradient>
      </header>
      <main className="main">
        <Data />
      </main>
      <footer className="header">
        Developed by
        <a href="https://deevoid.netlify.app/" rel="noopener noreferrer">
          Dev
        </a>
      </footer>
    </>
  );
}
