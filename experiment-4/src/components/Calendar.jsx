import React, { useMemo } from "react";
import DayColumn from "./DayColumn";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function Calendar({
  tasks,
  mode,
  onDrop,
  onDragStart,
}) {

  // 👇 RENDER TRACKING
  console.log("Calendar rendered");


  // 👇 OPTIMIZATION
  const visibleTasks = useMemo(() => {

    console.log(
      "Filtering tasks..."
    );

    return tasks.filter(
      (task) => task.type === mode
    );

  }, [tasks, mode]);


  return (

    <section className="calendar">

      {/* TITLE */}

      <div className="calendar-title">

        <div>

          <h2>
            Weekly Schedule
          </h2>

          <span>
            {mode} tasks
          </span>

        </div>

      </div>


      {/* 7 DAYS */}

      <div className="days">

        {days.map((day) => {

          const dayTasks =
            visibleTasks.filter(
              (task) =>
                task.day === day
            );

          return (

            <DayColumn

              key={day}

              day={day}

              tasks={dayTasks}

              onDrop={onDrop}

              onDragStart={onDragStart}

            />

          );

        })}

      </div>

    </section>
  );
}

export default Calendar;