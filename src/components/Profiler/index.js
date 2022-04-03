import React from "react";

const logProfiler = (data) => {
  console.log("%c profiler", "color: LightCoral", data);
};

// Profiler custom for React.Profiler
function Profiler({ phases = [], ...props }) {
  const handleRender = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
  ) => {
    if (!phases.length || phases.includes(phase)) {
      logProfiler({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
      });
    }
  };
  return <React.Profiler onRender={handleRender} {...props} />;
}
export { Profiler };
