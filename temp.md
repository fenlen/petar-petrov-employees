a) Each project holds employees and their intervals.
Find intersecting pairs.
Add them up.

b) Each employee holds a map of {projects: time}.
Compare all employees for matching keys.
Check for intersections.
Add them up.

{
  project 10: {
    employee1: {started: x, ended: y},
    employee2: {started: x, ended: y},
  }...
}


{
  pairId: [totalDaysWorked, [[projectId, daysOnProject], [...]]]
}