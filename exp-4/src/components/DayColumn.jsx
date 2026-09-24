import React from "react";
import Task from "./Task";

const DayColumn = React.memo(function DayColumn({
  day,
  tasks,
  onDrop,
  onDragStart,
}) {

  // 👇 RENDER TRACKING
  console.log(
    `Day ${day} rendered`
  );

  return (
    <div
      className="day-column"

      onDragOver={(event) =>
        event.preventDefault()
      }

      onDrop={(event) =>
        onDrop(event, day)
      }
    >

      {/* DAY NAME */}

      <div className="day-header">
        {day}
      </div>


      {/* TASKS */}

      <div className="day-tasks">

        {tasks.map((task) => (

          <Task
            key={task.id}
            task={task}
            onDragStart={onDragStart}
          />

        ))}

      </div>

    </div>
  );
});

export default DayColumn;