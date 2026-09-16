import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";

import Calendar from "./components/Calendar";
import RenderMonitor from "./components/RenderMonitor";

import { initialTasks } from "./data/tasks";


function App() {

  // =====================================
  // MODE
  // =====================================

  const [mode, setMode] =
    useState("Optimization");


  // =====================================
  // TASK STATE
  // =====================================

  const [tasks, setTasks] =
    useState(initialTasks);


  // =====================================
  // CURRENT RENDER COUNT
  // =====================================

  const renderCount = useRef(0);

  renderCount.current++;


  // =====================================
  // PERFORMANCE COUNTERS
  // =====================================

  const [
    optimizationRenders,
    setOptimizationRenders
  ] = useState(0);


  const [
    nonOptimizationRenders,
    setNonOptimizationRenders
  ] = useState(0);


  // =====================================
  // COUNT MODE RENDERS
  // =====================================

  useEffect(() => {

    if (mode === "Optimization") {

      setOptimizationRenders(
        (count) => count + 1
      );

    }

    else {

      setNonOptimizationRenders(
        (count) => count + 1
      );

    }

  }, [tasks, mode]);


  // =====================================
  // DRAG START
  // =====================================

  const handleDragStart = useCallback(
    (event, taskId) => {

      event.dataTransfer.setData(
        "taskId",
        taskId
      );

    },
    []
  );


  // =====================================
  // DROP
  // =====================================

  const handleDrop = useCallback(
    (event, newDay) => {

      event.preventDefault();


      const taskId = Number(
        event.dataTransfer.getData(
          "taskId"
        )
      );


      setTasks((previousTasks) => {

        return previousTasks.map(
          (task) => {

            if (
              task.id === taskId
            ) {

              return {
                ...task,
                day: newDay,
              };

            }

            return task;

          }
        );

      });

    },
    []
  );


  // =====================================
  // UI
  // =====================================

  return (

    <div className="app">


      {/* =================================
          HEADER
      ================================= */}

      <header className="header">

        <div>

          <div className="eyebrow">
            REACT • HCI • INFORMATION
            VISUALIZATION
          </div>


          <h1>
            CodeFlow Scheduler
          </h1>


          <p>
            Interactive weekly task
            scheduling system
          </p>

        </div>


        {/* HEADER RENDER COUNTER */}

        <div className="render-header">

          <span className="green-dot" />

          <div>

            <strong>
              {renderCount.current}
            </strong>

            <small>
              current renders
            </small>

          </div>

        </div>

      </header>


      {/* =================================
          OPTIMIZATION TOGGLE
      ================================= */}

      <div className="mode-container">


        <button

          className={
            mode === "Optimization"
              ? "mode-btn active"
              : "mode-btn"
          }

          onClick={() =>
            setMode(
              "Optimization"
            )
          }

        >

          ⚡ Optimization

        </button>


        <button

          className={
            mode === "Non-Optimization"
              ? "mode-btn active orange"
              : "mode-btn"
          }

          onClick={() =>
            setMode(
              "Non-Optimization"
            )
          }

        >

          ○ Non-Optimization

        </button>

      </div>


      {/* =================================
          MAIN CONTENT
      ================================= */}

      <div className="main-layout">


        {/* LEFT SIDE */}

        <Calendar

          tasks={tasks}

          mode={mode}

          onDrop={handleDrop}

          onDragStart={
            handleDragStart
          }

        />


        {/* RIGHT SIDE */}

        <RenderMonitor

          renderCount={
            renderCount.current
          }

          optimizationRenders={
            optimizationRenders
          }

          nonOptimizationRenders={
            nonOptimizationRenders
          }

          tasks={tasks}

        />

      </div>

    </div>
  );
}


export default App;