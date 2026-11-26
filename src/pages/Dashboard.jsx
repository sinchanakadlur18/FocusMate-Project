import { useState, useEffect } from "react";
import "./Dashboard.css";

const appList = [
  { name: "Instagram", icon: "📸" },
  { name: "YouTube", icon: "▶️" },
  { name: "Facebook", icon: "📘" },
  { name: "WhatsApp", icon: "💬" },
  { name: "TikTok", icon: "🎵" },
  { name: "Snapchat", icon: "👻" },
  { name: "Twitter", icon: "🐦" },
  { name: "Netflix", icon: "🎬" },
  { name: "Telegram", icon: "✈️" },
  { name: "Games", icon: "🎮" }
];

function Dashboard() {
  const [page, setPage] = useState("select");
  const [selectedApps, setSelectedApps] = useState([]);

  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const progress = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  // App selection
  const toggleApp = (appName) => {
    setSelectedApps((previousApps) =>
      previousApps.includes(appName)
        ? previousApps.filter((app) => app !== appName)
        : [...previousApps, appName]
    );
  };

  // Navigate to timer
  const goToTimer = () => {
    if (selectedApps.length === 0) {
      alert("Please select at least one app.");
      return;
    }

    setPage("timer");
  };

  // Add task
  const addTask = (event) => {
    event.preventDefault();

    const newTask = taskInput.trim();

    if (!newTask) return;

    setTasks((previousTasks) => [
      ...previousTasks,
      {
        id: Date.now(),
        text: newTask,
        completed: false
      }
    ]);

    setTaskInput("");
  };

  // Complete task
  const toggleTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId)
    );
  };

  // Start timer
  const startTimer = () => {
    if (minutes === 0 && seconds === 0) {
      alert("Please reset the timer first.");
      return;
    }

    setIsRunning(true);
  };

  // Pause timer
  const pauseTimer = () => {
    setIsRunning(false);
  };

  // Reset timer
  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
  };

  // Change timer duration
  const changeTimer = (event) => {
    const value = Number(event.target.value);

    if (
      Number.isInteger(value) &&
      value >= 1 &&
      value <= 180
    ) {
      setIsRunning(false);
      setMinutes(value);
      setSeconds(0);
    }
  };

  // Countdown timer
  useEffect(() => {
    if (!isRunning) return undefined;

    if (minutes === 0 && seconds === 0) {
      return undefined;
    }

    const timer = setTimeout(() => {
      if (seconds > 0) {
        setSeconds((previous) => previous - 1);
      } else {
        setMinutes((previous) => previous - 1);
        setSeconds(59);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isRunning, minutes, seconds]);

  const formattedTime =
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0");

  return (
    <div className="dashboard-container">

      {page === "select" && (
        <div className="select-card">

          <div className="step-heading">
            <span className="step-label">STEP 1 OF 2</span>
            <h1>Select Apps</h1>
            <p>
              Choose the applications you want to avoid
              during your focus session.
            </p>
          </div>

          <div className="selection-count">
            {selectedApps.length} apps selected
          </div>

          <div className="app-grid">
            {appList.map((app) => (
              <button
                type="button"
                key={app.name}
                className={
                  "app-card " +
                  (selectedApps.includes(app.name)
                    ? "app-selected"
                    : "")
                }
                onClick={() => toggleApp(app.name)}
                aria-pressed={selectedApps.includes(app.name)}
              >
                <span className="app-icon">{app.icon}</span>
                <span className="app-name">{app.name}</span>

                {selectedApps.includes(app.name) && (
                  <span className="selected-check">✓</span>
                )}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="next-button"
            onClick={goToTimer}
          >
            Continue to Timer →
          </button>

        </div>
      )}

      {page === "timer" && (
        <div className="timer-dashboard">

          <div className="timer-header">
            <span className="step-label">STEP 2 OF 2</span>
            <h1>Focus Dashboard</h1>
            <p>Stay focused. Complete your goals.</p>
          </div>

          <div className="selected-apps-section">
            <h3>Selected Apps</h3>

            <div className="selected-app-list">
              {appList
                .filter((app) =>
                  selectedApps.includes(app.name)
                )
                .map((app) => (
                  <span
                    className="selected-app-tag"
                    key={app.name}
                  >
                    {app.icon} {app.name}
                  </span>
                ))}
            </div>

            <button
              type="button"
              className="edit-button"
              onClick={() => {
                setIsRunning(false);
                setPage("select");
              }}
            >
              Edit Selected Apps
            </button>
          </div>

          <div className="timer-card">
            <h2>Focus Timer</h2>

            <p className="timer-description">
              Concentrate on your work and avoid distractions.
            </p>

            <div className="timer-circle">
              <div className="timer-time">
                {formattedTime}
              </div>

              <span className="timer-status">
                {minutes === 0 && seconds === 0
                  ? "COMPLETED"
                  : isRunning
                    ? "FOCUSING..."
                    : "READY TO FOCUS"}
              </span>
            </div>

            <div className="timer-settings">
              <label htmlFor="timer-minutes">
                Set Timer (Minutes)
              </label>

              <input
                id="timer-minutes"
                type="number"
                min="1"
                max="180"
                value={minutes}
                disabled={isRunning}
                onChange={changeTimer}
              />
            </div>

            <div className="timer-controls">
              <button
                type="button"
                className="start-button"
                onClick={startTimer}
                disabled={isRunning || (minutes === 0 && seconds === 0)}
              >
                Start
              </button>

              <button
                type="button"
                className="pause-button"
                onClick={pauseTimer}
                disabled={!isRunning}
              >
                Pause
              </button>

              <button
                type="button"
                className="reset-button"
                onClick={resetTimer}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="task-card">
            <h2>My Tasks</h2>
            <p>Keep track of your daily goals.</p>

            <form className="task-form" onSubmit={addTask}>
              <input
                type="text"
                placeholder="Enter your task..."
                value={taskInput}
                onChange={(event) =>
                  setTaskInput(event.target.value)
                }
              />

              <button type="submit">
                Add Task
              </button>
            </form>

            <div className="task-progress">
              <div className="progress-info">
                <span>Task Progress</span>
                <strong>{progress}%</strong>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: progress + "%" }}
                />
              </div>

              <p>
                {completedTasks} of {tasks.length} tasks completed
              </p>
            </div>

            <div className="task-list">
              {tasks.length === 0 ? (
                <p className="empty-tasks">
                  No tasks added yet. Add your first task!
                </p>
              ) : (
                tasks.map((task) => (
                  <div className="task-item" key={task.id}>
                    <label className="task-label">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                      />

                      <span
                        className={
                          task.completed ? "task-done" : ""
                        }
                      >
                        {task.text}
                      </span>
                    </label>

                    <button
                      type="button"
                      className="delete-task"
                      onClick={() => deleteTask(task.id)}
                      aria-label="Delete task"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default Dashboard;