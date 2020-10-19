function part1(input) {
  const map = input.split("\r\n");
  // get list of asteroids [x, y]
  const asteroids = getAsteroids(map);

  const best = {
    angles: -Infinity,
    asteroid: null
  };

  // for each asteroid
  for (let i = 0; i < asteroids.length; i++) {
    // create set of angles with visible asteroids
    const angles = new Set();
    // for each other asteroid
    for (let j = 0; j < asteroids.length; j++) {
      if (i === j) continue;
      // determine angle [dx, dy] / gcd(|dx|, |dy|)
      const delta = [
        asteroids[i][0] - asteroids[j][0],
        asteroids[i][1] - asteroids[j][1]
      ];
      const factor = gcd(delta[0], delta[1]);
      if (factor === 0) {
        continue;
      }
      const angle = `${delta[0] / factor}/${delta[1] / factor}`;
      // add angle to set
      angles.add(angle);
    }
    // console.log(asteroids[i], angles);
    if (angles.size > best.angles) {
      best.angles = angles.size;
      best.asteroid = asteroids[i];
    }
  }
  return best;
  // largests set wins
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

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}
// part1(".#..#\r\n.....\r\n#####\r\n....#\r\n...##");
module.exports = { gcd, part1 };
