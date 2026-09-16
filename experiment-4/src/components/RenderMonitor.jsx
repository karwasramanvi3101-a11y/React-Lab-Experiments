import React from "react";
function RenderMonitor({  renderCount,
  optimizationRenders,
  nonOptimizationRenders,
  tasks,
}) {

  return (

    <aside className="right-panel">


      {/* =========================
          RENDER MONITOR
      ========================= */}

      <div className="panel">

        <div className="panel-heading">

          <span>
            Render Monitor
          </span>

          <span className="live">
            ● LIVE
          </span>

        </div>


        <div className="render-number">
          {renderCount}
        </div>


        <p>
          Current component renders
        </p>


        <div className="comparison">

          <div>

            <span>
              ⚡ Optimization
            </span>

            <strong>
              {optimizationRenders}
            </strong>

          </div>


          <div>

            <span>
              ○ Non-Optimization
            </span>

            <strong>
              {nonOptimizationRenders}
            </strong>

          </div>

        </div>

      </div>


      {/* =========================
          ALL TASKS
      ========================= */}

      <div className="panel">

        <div className="panel-heading">

          <span>
            All Tasks
          </span>

          <span>
            {tasks.length}
          </span>

        </div>


        <div className="all-tasks">

          {tasks.map((task) => (

            <div
              className="task-row"
              key={task.id}
            >

              <div
                className={
                  task.type === "Optimization"
                    ? "task-indicator green"
                    : "task-indicator orange"
                }
              />

              <div className="task-info">

                <strong>
                  {task.title}
                </strong>

                <span>
                  {task.day} • {task.time}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* =========================
          CURRENT MODE
      ========================= */}

      <div className="panel">

        <div className="panel-heading">
          Current Mode
        </div>

        <h3>
          {renderCount > 0
            ? "Active"
            : "Waiting"}
        </h3>

        <p>
          Drag a task to another day
          and observe the render monitor.
        </p>

      </div>

    </aside>
  );
}

export default RenderMonitor;