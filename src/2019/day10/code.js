function part1(input) {
  const map = input.split("\r\n");
  // get list of asteroids [x, y]
  const asteroids = getAsteroids(map);

  const best = {
    angles: -Infinity,
    asteroid: null
  };

  // for each asteroid
  for (const asteroid of asteroids) {
    // create set of angles with visible asteroids
    const angles = getAngles(asteroid, asteroids);
    if (angles.size > best.angles) {
      best.angles = angles.size;
      best.asteroid = asteroid;
    }
  }
  return best;
  // largests set wins
}

function part2(input, [top, left]) {
  let count = 0;
  const map = input.split("\r\n").map(line => line.split(""));
  // get list of asteroids [x, y]
  const asteroid = [top, left];
  const asteroids = getAsteroids(map);
  // console.log(asteroids);

  // :loop: get angles
  const angles = getAngles(asteroid, asteroids);
  const degrees = [...angles].map(angle => {
    const [dTop, dLeft] = angle.split("/").map(Number);
    const dx = dLeft;
    const dy = -dTop;
    const degree = toDegrees(dx, dy);
    return { dx, dy, dTop, dLeft, degree };
  });
  degrees.sort((a, b) => a.degree - b.degree);
  console.log(degrees);
  // degrees.forEach(degree => {
  //   const [top, left] = findClosest(asteroid, degree, map);
  //   map[top][left] = String(count++);
  //   console.log("foo", top, left);
  // });
  // degress.forEach(([dx, dy]) => {});
  // console.log("angles", angles);
  // sort angles
  // for each angle
  // find nearest asteroid
  // destroy asteroid
  // count destroyed
  // if count == target return asteroid
  // if count < target goto :loop:
}

function getAngles(asteroid, asteroids) {
  const angles = new Set();
  // for each other asteroid
  for (const other of asteroids) {
    // determine angle [dx, dy] / gcd(|dx|, |dy|)
    const delta = [asteroid[0] - other[0], asteroid[1] - other[1]];
    const factor = gcd(delta[0], delta[1]);
    if (factor === 0) {
      continue;
    }
    const angle = `${delta[0] / factor}/${delta[1] / factor}`;
    // add angle to set
    angles.add(angle);
  }
  return angles;
}

function getAsteroids(map) {
  const asteroids = [];
  for (let top = 0; top < map.length; top++) {
    for (let left = 0; left < map[top].length; left++) {
      if (map[top][left] === "#") {
        asteroids.push([top, left]);
      }
    }
  }
  return asteroids;
}

function findClosest([top, left], { dTop, dLeft }, map) {
  for (let i = 1; i < 100; i++) {
    const mapLeft = left + i * dLeft;
    const mapTop = top + i * dTop;
    if (map[mapTop][mapLeft] === "#") {
      return [mapTop, mapLeft];
    }
  }
}

function toDegrees(dx, dy) {
  const degree = (Math.atan2(dy, dx) * 180) / Math.PI;
  const degreeFromUp = (360 - (degree + 270) + 360) % 360;
  // console.log(`${dx}/${dy} = ${degreeFromUp}`);
  return degreeFromUp;
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}
// part1(".#..#\r\n.....\r\n#####\r\n....#\r\n...##");
part2(
  ".#....#####...#..\r\n##...##.#####..##\r\n##...#...#.#####.\r\n..#.....#...###..\r\n..#.#.....#....##",
  [3, 8]
);

module.exports = { gcd, toDegrees, part1, part2 };
