const inputData = {
  gridSize: 4,
  zombie: [
    {
      x: 3,
      y: 1,
    },
  ],
  creatures: [
    {
      x: 0,
      y: 1,
    },
    {
      x: 1,
      y: 2,
    },
    {
      x: 1,
      y: 1,
    },
  ],
  commands: "RDRU",
};

let zombies = inputData.zombie;
let creatures = inputData.creatures;
const commands = inputData.commands.split("");
const boardSize = inputData.gridSize;

const allZombies = [];

while (zombies.length > 0) {
  const zombie = zombies.splice(0, 1)[0];
  const zombieIndex = allZombies.length;
  //console.log(zombie);
  commands.forEach((command) => {
    let newPosition = null;
    let newX = null;
    let newY = null;

    switch (command) {
      case "U":
        newPosition = moveUp(zombie, zombieIndex);
        break;
      case "D":
        newPosition = moveDown(zombie, zombieIndex);
        break;
      case "L":
        newPosition = moveLeft(zombie, zombieIndex);
        break;
      case "R":
        newPosition = moveRight(zombie, zombieIndex);
        break;
      default:
        throw Error("undefined command");
    }

    newX = newPosition.x;
    newY = newPosition.y;

    const samePositionCreatures = creatures.filter((creature) => {
      return creature.x === newX && creature.y === newY;
    });

    if (samePositionCreatures.length > 0) {
      let logged = `Zombie ${zombieIndex} infected creature at (${newX},${newY})`;
      console.log(logged);
    }

    zombies.push(...samePositionCreatures);
    creatures = creatures.filter(
      (creature) => newX !== creature.x || newY !== creature.y
    );
    zombie.x = newX;
    zombie.y = newY;
  });
  allZombies.push(zombie);
}

function moveUp({ x, y }, zombie) {
  let yy = null;

  if (y === 0) {
    yy = boardSize - 1;
  } else {
    yy = y - 1;
  }

  let logged = `Zombie ${zombie} move to (${x},${yy})`;
  console.log(logged);
  return { x, y: yy };
}

function moveDown({ x, y }, zombie) {
  let yy = null;
  if (y === boardSize - 1) {
    yy = 0;
  } else {
    yy = y + 1;
  }
  let logged = `Zombie ${zombie} move to (${x},${yy})`;
  console.log(logged);
  return { x, y: yy };
}

function moveLeft({ x, y }, zombie) {
  let xx = null;
  if (x === 0) {
    xx = boardSize - 1;
  } else {
    xx = x - 1;
  }
  let logged = `Zombie ${zombie} move to (${xx},${y})`;
  console.log(logged);
  return { x: xx, y };
}

function moveRight({ x, y }, zombie) {
  let xx = null;
  if (x === boardSize - 1) {
    xx = 0;
  } else {
    xx = x + 1;
  }
  let logged = `Zombie ${zombie} move to (${xx},${y})`;
  console.log(logged);
  return { x: xx, y };
}

//finally output a JSON as the result
const outputData = {
  gridSize: boardSize,
  zombie: allZombies,
  creatures: creatures,
  commands: inputData.commands,
};

console.log(outputData);
