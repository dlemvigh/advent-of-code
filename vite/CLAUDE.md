# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Advent of Code solutions repository using TypeScript with Vitest for testing. Solutions are organized by year (y2022, y2024, y2025) with each day in its own directory.

## Common Commands

### Testing
- `npm test` - Run all tests with Vitest
- `npm run test:watch` - Watch mode with auto-run on changes (changed files only, fails fast with --bail=1)
- Run a single test file: `npx vitest src/y2025/day12/day12.test.ts`
- Run a single test: `npx vitest src/y2025/day12/day12.test.ts -t "part 1"`

### Generating New Day Scaffolding
- `npm run generate` - Interactive Plop generator to create new day structure
  - Prompts for year and day number
  - Creates `dayN.ts`, `dayN.test.ts`, `sample.txt`, and `input.txt`
  - Automatically fetches puzzle input from adventofcode.com if `AOC_SESSION` is configured in `.env`

### Environment Setup
Copy `.env.example` to `.env` and add your Advent of Code session cookie:
1. Log in to https://adventofcode.com
2. Extract session cookie from browser DevTools
3. Set `AOC_SESSION=your_session_cookie_here` in `.env`

## Code Structure

### Directory Layout
```
src/
├── y2025/day1/          # Solutions organized by year and day
│   ├── day1.ts          # Solution implementation (part1 and part2 functions)
│   ├── day1.test.ts     # Vitest tests for both sample and actual input
│   ├── sample.txt       # Sample input from problem description
│   └── input.txt        # Actual puzzle input
├── util.ts              # String parsing utilities (readInput, splitIntoLines, etc.)
├── math.ts              # Math utilities (sum, sumBy, average, averageBy)
├── list.ts              # List utilities (quicksort)
└── tree.ts              # Tree printing utilities
```

### Solution Pattern
Each day follows a standard pattern:
- Export `part1(input: string)` and `part2(input: string)` functions
- Parse input using utilities from `../../util` (typically `splitIntoLines`)
- Tests verify against both sample input (from problem) and actual input (expected values hardcoded)
- Some days split complex solutions into separate files (e.g., `day10part1.ts`, `day10part2.ts`)

### Key Dependencies
- **graphology** - Graph data structures and algorithms (components, DAG, shortest path)
- **yalps** - Integer Linear Programming solver (used for optimization problems)
- **vitest** - Test framework and runner

### Utility Functions
Common utilities in `src/util.ts`:
- `readInput(folder: string, filename: string)` - Read puzzle input files
- `splitIntoLines(input: string)` - Split input into lines with trimming
- `splitIntoGroups(input: string)` - Split input into groups separated by blank lines
- `splitAndMapIntoLines/Groups<T>` - Parse and transform lines/groups
- `chunk<T>(array: T[], chunkSize: number)` - Split array into chunks

## Development Workflow

1. Generate new day: `npm run generate`
2. Add sample input to `sample.txt` from problem description
3. Implement solution in `dayN.ts` (start with `part1`)
4. Write test with expected sample output
5. Run tests: `npx vitest src/y2025/dayN/dayN.test.ts --watch`
6. Once sample passes, run against actual input
7. Implement `part2` following same pattern

## TypeScript Configuration
- Strict mode enabled with comprehensive error checking
- Target: ESNext with Node module resolution
- No emit (tests run directly via Vitest)
- Unused locals/parameters and implicit returns all flagged as errors
