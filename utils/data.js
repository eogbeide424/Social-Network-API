const names = [
  "Aaban",
  "Aabid",
  "Aaran",
  "Aaren",
  "Aarez",
  "Aarman",
  "Aaron",
  "Aaron-James",
  "Aarron",
  "Aaryan",
  "Aaryn",
  "Aayan",
  "Aazaan",
  "Abaan",
  "Abbas",
  "Abdallah",
  "Abdalroof",
  "Abdihakim",
  "Abdirahman",
  "Abdisalam",
  "Abdul",
  "Abdul-Aziz",
  "Abdulbasir",
  "Abdulkadir",
  "Abdulkarem",
  "Smith",
  "Jones",
  "Coollastname",
  "enter_name_here",
  "Ze",
  "Zechariah",
  "Zeek",
  "Zeeshan",
  "Zeid",
  "Zein",
  "Zen",
  "Zendel",
  "Zenith",
  "Zennon",
  "Zeph",
  "Zerah",
  "Zhen",
  "Zhi",
  "Zhong",
  "Zhuo",
  "Zi",
  "Zidane",
  "Zijie",
  "Zinedine",
  "Zion",
  "Zishan",
  "Ziya",
  "Ziyaan",
  "Zohaib",
  "Zohair",
  "Zoubaeir",
  "Zubair",
  "Zubayr",
  "Zuriel",
  "Xander",
  "Jared",
  "Grace",
  "Alex",
  "Mark",
  "Tamar",
  "Farish",
  "Sarah",
  "Nathaniel",
  "Parker"
  
  
];

const thoughtDescriptions = [
  "Decision  I need to make",
  'Find a job after bootcamp',
  'I want to learn Piano',
  'Starting a business 101',
  'Tower Defense',
  'Monopoly Money Manager',
  'Movie night who is in?',
  'Hello world',
  'Stupid Social Media App I keep using',
  'Notes to self ☺ to do list',
  'Messages at 3am',
  'Email',
  'Compass',
  'Firefox',
  'Running app',
  'Cooking app',
  'Poker',
  'Deliveries',
];

const possibleReactions = [
  'cool',
  '👿',
  '🤢',
  'your fire',
  '👍',
  '👎',
  '🤯',
  '🤔',
  '🤫',
  '🤐',
  '🤨',
  'This is a reaction',
  'Vue',
  'mongodb',
  'sql',
];

const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random email address
const getRandomEmail = () =>
  `${getRandomArrItem(names)}@${getRandomArrItem(names)}.com`;

const getRandomFriends = (int) =>{
  let results = [];
  for (let i=0; i<int; i++){
  results.push({
 friends: [getRandomArrItem(names)]})};
  return results;
}
  

  const getRandomName = () =>
  `${getRandomArrItem(names)}`;

// Function to generate random applications that we can add to the database. Includes application tags.
const getRandomThought = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughtDescriptions),
      createdAt: new Date(),
      userName: getRandomName(),
      reactions: [...getReactions(3)],
    });
  }
  return results;
};

// Create the tags that will be added to each application
const getReactions = (int) => {
  if (int === 1) {
    return getRandomArrItem(possibleReactions);
  }
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactions: getRandomArrItem(possibleReactions),
      username: getRandomName(),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThought, getReactions, getRandomEmail, getRandomFriends };
