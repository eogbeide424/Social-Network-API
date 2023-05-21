const connection = require('../config/connection');
const { User, Thought,reactionSchema } = require('../models');
const { getRandomName, getRandomThought, getReactions, getRandomEmail } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [];
  const thoughts = getRandomThought(10);

  for (let i = 0; i < 20; i++) {
    const userName = getRandomName();
    const email = getRandomEmail();
    const friends = getRandomName()

    users.push({
      userName,
      email,
      thoughts,
      friends,
    });
  }

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  // loop through the saved applications, for each application we need to generate a application response and insert the application responses
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
