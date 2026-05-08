import { useState } from "react";
import Navbar from "./components/Navbar";
import Cities from "./components/cities";
import Alarm from "./components/alarm";
// import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Cities />
      <Alarm />
    </>
  );
}

export default App;
