import { useState, useEffect } from 'react';
import {
  Gantt,
  Task,
  EventOption,
  StylingOption,
  ViewMode,
  DisplayOption,
} from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import dateFormat, { masks } from "dateformat";

export default function GanttChart({ projectData }) {

  let tasks = projectData?.map(item => (
    {
      start: new Date(dateFormat(item.startingDate, "yyyy, mm, dd")),
      end: new Date(dateFormat(item.endingDate, "yyyy, mm, dd")),
      name: item?.projectName,
      id: item?._id,
      dependencies: item?.workArea,
      type: "task",
      progress: 100,
      isDisabled: true,
      // styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
      styles: { progressColor: "#1BA50D", progressSelectedColor: "#ff9e0d" },
    }
  ))

  // let tasks = [
  //   {
  //     start: new Date(2020, 1, 1),
  //     end: new Date(2020, 1, 2),
  //     name: data?.projectName,
  //     id: data?._id,
  //     type: "task",
  //     progress: 45,
  //     isDisabled: true,
  //     styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
  //   },
  // ];

  if (!projectData) return <div>Gantt Chart Loading...</div>;

  return (
    <>
      <Gantt
        tasks={tasks}
        // viewMode={view}
        // onDateChange={onTaskChange}
        // onTaskDelete={onTaskDelete}
        // onProgressChange={onProgressChange}
        // onDoubleClick={onDblClick}
        // onClick={onClick}
        viewMode={'Month'}
        columnWidth={150}
      />
    </>
  );
}
