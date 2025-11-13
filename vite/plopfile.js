module.exports = function (plop) {
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
    ],
  });
};