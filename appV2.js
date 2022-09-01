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

const commandMap = {
  U: ({ x, y }) => ({
    x,
    y: y - 1 < 0 ? boardSize - 1 : y - 1,
  }),
  D: ({ x, y }) => ({
    x,
    y: y + 1 > boardSize - 1 ? 0 : y + 1,
  }),
  L: ({ x, y }) => ({
    x: x - 1 < 0 ? boardSize - 1 : x - 1,
    y,
  }),
  R: ({ x, y }) => ({
    x: x + 1 > boardSize - 1 ? 0 : x + 1,
    y,
  }),
};

while (zombies.length > 0) {
  const zombie = zombies.splice(0, 1)[0];
  const zombieIndex = allZombies.length;

  commands.forEach((command) => {
    const action = commandMap[command];
    const { x, y } = action(zombie);
    console.log(`Zombie ${zombieIndex} move to (${x},${y})`);

    const samePositionCreatures = creatures.filter((creature) => {
      return creature.x === x && creature.y === y;
    });

    if (samePositionCreatures.length > 0) {
      let logged = `Zombie ${zombieIndex} infected creature at (${x},${y})`;
      console.log(logged);
    }

    zombies.push(...samePositionCreatures);
    creatures = creatures.filter(
      (creature) => x !== creature.x || y !== creature.y
    );
    zombie.x = x;
    zombie.y = y;
  });
  allZombies.push(zombie);
}

//finally output a JSON as the result
const outputData = {
  gridSize: boardSize,
  zombie: allZombies,
  creatures: creatures,
  commands: inputData.commands,
};

console.log(outputData);
console.log(inputData);
