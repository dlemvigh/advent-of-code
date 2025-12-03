require('dotenv').config();
const fs = require('fs');
const path = require('path');

module.exports = function (plop) {
  plop.setActionType('fetchInput', async (answers) => {
    const { year, day } = answers;
    const url = `https://adventofcode.com/${year}/day/${day}/input`;

    const sessionCookie = process.env.AOC_SESSION;

    if (!sessionCookie) {
      return '⚠️  Skipped fetching input (no AOC_SESSION found in .env). Please add AOC_SESSION=your_cookie to your .env file.';
    }

    try {
      const response = await fetch(url, {
        headers: {
          Cookie: `session=${sessionCookie}`,
          'User-Agent': 'github.com/yourusername/advent-of-code',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const input = await response.text();
      const inputPath = path.join(__dirname, `src/y${year}/day${day}/input.txt`);
      fs.writeFileSync(inputPath, input);

      return `✓ Successfully fetched input from Advent of Code`;
    } catch (error) {
      return `⚠️  Failed to fetch input: ${error.message}. You'll need to manually add it.`;
    }
  });

  plop.setGenerator('day', {
    description: 'Generate a new Advent of Code day',
    prompts: [
      {
        type: 'input',
        name: 'year',
        message: 'Year (e.g., 2024):',
        default: new Date().getFullYear().toString(),
      },
      {
        type: 'input',
        name: 'day',
        message: 'Day number (1-25):',
        default: new Date().getDate().toString(),
        validate: (input) => {
          const day = parseInt(input);
          if (isNaN(day) || day < 1 || day > 25) {
            return 'Please enter a valid day number between 1 and 25';
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/y{{year}}/day{{day}}/day{{day}}.ts',
        templateFile: 'templates/day.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/y{{year}}/day{{day}}/day{{day}}.test.ts',
        templateFile: 'templates/day.test.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/y{{year}}/day{{day}}/sample.txt',
        templateFile: 'templates/sample.txt.hbs',
      },
      {
        type: 'add',
        path: 'src/y{{year}}/day{{day}}/input.txt',
        templateFile: 'templates/input.txt.hbs',
      },
      {
        type: 'fetchInput',
      },
    ],
  });
};