const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const addressDirectory = (() => {
  let data = [];

  class AddressEntry {
    constructor(name, phoneNumber) {
      this.name = name;
      this.phoneNumber = phoneNumber;
    }
  }

  async function addEntry() {
    const name = await askQuestion('Enter the name: ');
    const phoneNumber = await askQuestion('Enter the phone number: ');

    try {
      const existingEntry = data.find(entry => entry.name === name);
      if (existingEntry) {
        throw new Error('Entry with the same name already exists.');
      }

      const newEntry = new AddressEntry(name, phoneNumber);
      data.push(newEntry);
      console.log(`New entry added: ${name} - ${phoneNumber}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  function viewEntries() {
    if (data.length === 0) {
      console.log('No entries found in the directory.');
    } else {
      console.log('Address Directory:');
      data.forEach(entry => {
        console.log(`Name: ${entry.name}, Phone Number: ${entry.phoneNumber}`);
      });
    }
  }

  return {
    addEntry,
    viewEntries,
  };
})();

async function askQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

async function start() {
  const answer = await askQuestion('Choose an action: (1) Add Entry, (2) View Entries, (3) Exit: ');

  switch (answer) {
    case '1':
      await addressDirectory.addEntry();
      break;

    case '2':
      addressDirectory.viewEntries();
      break;

    case '3':
      console.log('Exiting...');
      rl.close();
      break;

    default:
      console.log('Invalid choice. Please enter 1, 2, or 3.');
  }


  start();
}

start();
