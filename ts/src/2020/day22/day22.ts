import { splitIntoGroups } from "../../util";

export function part1(input: string) {
  const groups = splitIntoGroups(input);
  const decks = groups.map((group) => group.slice(1).map(Number));
  const deck = playWar(decks[0], decks[1]);
  const score = calcScore(deck);
  return score;
}

function playWar(deck1: number[], deck2: number[]): number[] {
  while (deck1.length > 0 && deck2.length > 0) {
    const card1 = deck1.shift();
    const card2 = deck2.shift();
    if (card1 > card2) {
      deck1.push(card1, card2);
    } else {
      deck2.push(card2, card1);
    }
  }
  return deck1.length === 0 ? deck2 : deck1;
}

function calcScore(deck: number[]) {
  const len = deck.length;
  return deck.reduce((acc, val, idx) => acc + val * (len - idx), 0);
}

export function part2(input: string) {
  const groups = splitIntoGroups(input);
  const decks = groups.map((group) => group.slice(1).map(Number));
  const [_, deck1, deck2] = playRecursiveWar(decks[0], decks[1]);
  const res = calcScore([...deck1, ...deck2]);
  return res;
}

export function playRecursiveWar(
  deck1: number[],
  deck2: number[],
  game: number = 1
): [winner: number, deck1: number[], deck2: number[]] {
  const seen = new Set<string>();
  let round = 1;
  //   const maxGame = 10;
  const texts = [];
  texts.push(`=== Game ${game} ===\n`);
  //   if (game > maxGame) {
  //     throw new Error("too many sub-games");
  //   }
  while (deck1.length > 0 && deck2.length > 0) {
    texts.push(`-- Round ${round} (Game ${game}) --`);
    texts.push(`Player 1's deck: ${deck1.join(", ")}`);
    texts.push(`Player 2's deck: ${deck2.join(", ")}`);

    const state = deck1.join(",") + "x" + deck2.join(",");
    if (seen.has(state)) {
      return [1, deck1, deck2];
    } else {
      seen.add(state);
    }
    const card1 = deck1.shift();
    const card2 = deck2.shift();

    texts.push(`Player 1 plays: ${card1}`);
    texts.push(`Player 2 plays: ${card2}`);

    if (card1 > deck1.length || card2 > deck2.length) {
      if (card1 > card2) {
        deck1.push(card1, card2);
        texts.push(`Player 1 wins round ${round} of game ${game}!\n`);
      } else {
        deck2.push(card2, card1);
        texts.push(`Player 2 wins round ${round} of game ${game}!\n`);
      }
    } else {
      texts.push("Playing a sub-game to determine the winner...");
      //   console.log(texts.join("\n"));
      texts.length = 0;

      const subDeck1 = deck1.slice(0, card1);
      const subDeck2 = deck2.slice(0, card2);
      const [winner] = playRecursiveWar(subDeck1, subDeck2, game + 1);

      texts.push(`...anyway, back to game ${game}`);
      if (winner === 1) {
        deck1.push(card1, card2);
        texts.push(`Player 1 wins round ${round} of game ${game}!\n`);
      } else {
        deck2.push(card2, card1);
        texts.push(`Player 2 wins round ${round} of game ${game}!\n`);
      }
    }
    round++;
  }
  const winner = deck1.length > 0 && deck2.length === 0 ? 1 : 2;
  texts.push(`The winner of game ${game} is player ${winner}!`);

  //   console.log(texts.join("\n"));
  return [winner, deck1, deck2];
}
