import React, { useState, useEffect } from "react";

const App = () => {
  const [hide, setHide] = useState(false);
  const [text, setText] = useState("Hello World IIMS");

  useEffect(() => {
    setText("text is changed");
  }, []);

  useEffect(() => {
    setText(hide ? "Value is hidden" : "Value is visible");
    return () => {
      console.log("cleanup");
    };
  }, [hide]);

  const onToggle = () => {
    setHide(!hide);
  };

  return (
    <div>
      <h1>{text}</h1>
      <button onClick={onToggle}>Toggle</button>
    </div>
  );
};

export default App;
