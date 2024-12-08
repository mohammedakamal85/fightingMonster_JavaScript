let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting = null;
let monsterHealth = null;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
  { name: "stick", power: 5 },
  { name: "dagger", power: 30 },
  { name: "claw hammer", power: 50 },
  { name: "sword", power: 100 },
];

const locations = [
  { 
    name: "town square", 
    "button text": ["Go to store", "Go to cave", "Fight dragon"], 
    "button functions": [goStore, goCave, fightDragon], 
    text: 'You are in the town square. You see a sign that says "store".' 
  },
  { 
    name: "store", 
    "button text": ["Buy 10 health (10 gold)", "Buy Weapon (30 gold)", "Go to town square"], 
    "button functions": [buyHealth, buyWeapon, goTown], 
    text: "You entered the store." 
  },
  { 
    name: "cave", 
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"], 
    "button functions": [fightSlime, fightBeast, goTown], 
    text: "You entered the cave. You see some monsters." 
  },
  { 
    name: "fight", 
    "button text": ["Attack", "Dodge", "Run"], 
    "button functions": [attack, dodge, goTown], 
    text: "You are fighting a monster." 
  },
  { 
    name: "kill monster", 
    "button text": ["Go to town square", "Go to town square", "Go to town square"], 
    "button functions": [goTown, goTown, easterEgg], 
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.' 
  },
  { 
    name: "lose", 
    "button text": ["Replay?", "Replay?", "Replay?"], 
    "button functions": [restart, restart, restart], 
    text: "You died. ☠" 
  },
  { 
    name: "win", 
    "button text": ["Play Again?", "Play Again?", "Play Again?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeated the dragon! YOU WIN!" 
  },
  { 
    name: "easter egg", 
    "button text": ["2", "8", "Go to town square"], 
    "button functions": [pickTwo, pickEight, goTown], 
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!" 
  }
];

const monsters = [
  { name: "Slime", level: 2, health: 15 },
  { name: "Fanged Beast", level: 8, health: 60 },
  { name: "Dragon", level: 20, health: 300 },
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText = "You bought 10 health.";
  } else {
    text.innerText = "You don't have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1 && gold >= 30) {
    gold -= 30;
    currentWeapon++;
    inventory.push(weapons[currentWeapon].name);
    goldText.innerText = gold;
    text.innerText = "You bought a " + weapons[currentWeapon].name + ".";
  } else if (currentWeapon >= weapons.length - 1) {
    text.innerText = "You already own the most powerful weapon!";
  } else {
    text.innerText = "You don't have enough gold.";
  }
}

function fightSlime() {
  fighting = 0;
  startFight();
}

function fightBeast() {
  fighting = 1;
  startFight();
}

function fightDragon() {
  fighting = 2;
  startFight();
}

function startFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  let damage = weapons[currentWeapon].power + Math.floor(Math.random() * xp);
  monsterHealth -= damage;
  health -= monsters[fighting].level * 5;
  monsterHealthText.innerText = monsterHealth;
  healthText.innerText = health;

  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
}

function dodge() {
  text.innerText = "You dodged the attack!";
}

function defeatMonster() {
  xp += monsters[fighting].level;
  gold += monsters[fighting].level * 10;
  xpText.innerText = xp;
  goldText.innerText = gold;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 11));
  if (numbers.includes(guess)) {
    gold += 20;
    goldText.innerText = gold;
    text.innerText = "You guessed correctly and won 20 gold!";
  } else {
    health -= 10;
    healthText.innerText = health;
    text.innerText = "Wrong guess! You lose 10 health.";
    if (health <= 0) lose();
  }
}
