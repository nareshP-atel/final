export default function TimerControls({ isRunning, onStart, onStop, onReset }) {
  return (
    <div className="timer-controls">
      {!isRunning ? (
        <button onClick={onStart} className="start-btn fade-in">
          <span className="icon">▶️</span> Start
        </button>
      ) : (
        <button onClick={onStop} className="stop-btn fade-in">
          <span className="icon">⏹️</span> Stop
        </button>
      )}
      <button onClick={onReset} className="reset-btn">
        <span className="icon">🔄</span> Reset
      </button>
    </div>
  );
}