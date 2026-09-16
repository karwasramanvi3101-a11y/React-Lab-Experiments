import React from "react";

const Task = React.memo(function Task({
  task,
  onDragStart,
}) {

  // 👇 RENDER TRACKING
  console.log(
    `Task ${task.title} rendered`
  );

  return (
    <div
      className={
        task.type === "Optimization"
          ? "task optimized"
          : "task non-optimized"
      }

      draggable

      onDragStart={(event) =>
        onDragStart(event, task.id)
      }
    >

      <strong>
        {task.title}
      </strong>

      <span>
        {task.time}
      </span>

      <small>
        Drag me ↕
      </small>

    </div>
  );
});

export default Task;