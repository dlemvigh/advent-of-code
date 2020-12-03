type Trajectory = [number, number];

export function countTreesOnTrajectory(
  map: string[],
  trajectory: Trajectory
): number {
  let row = 0;
  let column = 0;
  let count = 0;

  const height = map.length;
  const width = map[0].length;
  const [dr, dc] = trajectory;

  while (row < height) {
    if (map[row][column] === "#") {
      count++;
    }
    row += dr;
    column = (column + dc) % width;
  }
  return count;
}

export function countMultiple(
  map: string[],
  trajectories: Trajectory[] = [
    [1, 1],
    [1, 3],
    [1, 5],
    [1, 7],
    [2, 1],
  ]
) {
  let res = 1;
  debugger;
  trajectories.forEach((t) => {
    const count = countTreesOnTrajectory(map, t);
    res *= count;
    // console.log("count", count, t);
  });
  return res;
}
