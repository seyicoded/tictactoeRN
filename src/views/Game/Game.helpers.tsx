import { winnerResults } from './Game.constants';
import { BoardType, GameStateType, GetBoardTitleColor } from './Game.types';

export const getBoardColors: GetBoardTitleColor = (params) => {
  const result: { backgroundColor: string; textColor: string } = {
    backgroundColor: params.colors.board,
    textColor: 'transparent',
  };

  if (params.type === 'X') {
    result.textColor = params.isWinner
      ? params.colors.white
      : params.isFinished
      ? params.colors.disabled
      : params.colors.primary;
    result.backgroundColor = params.isWinner
      ? params.colors.primary
      : params.colors.board;
  }

  if (params.type === 'O') {
    result.textColor = params.isWinner
      ? params.colors.white
      : params.isFinished
      ? params.colors.disabled
      : params.colors.secondary;
    result.backgroundColor = params.isWinner
      ? params.colors.secondary
      : params.colors.board;
  }

  return result;
};

export const checkFirstRound = (gameState: GameStateType[]) => {
  return !gameState.some((state) => typeof state === 'string');
};

export const checkLastRound = (gameState: GameStateType[]) => {
  return !gameState.some((state) => state === undefined);
};

export const computerAutoPlay = (gameState: GameStateType[]) => {
  //
  let bestPlaceToWin = null;

  // all O places
  const allO: any[] = [];

  gameState.map((_val, position) => {
    if (_val === 'O') {
      allO.push(position);
    }
  });

  // @TODO: check if computer is about to win then win
  // @DOING

  for (let i = 0; i < winnerResults.length; i++) {
    const _group = winnerResults[i];

    const found = _group.some((r) => allO.includes(r));

    if (found) {
      // okay a reasonable move is found, so let's check to see if all isn't played
      const [move1, move2, move3] = _group;

      if (allO.includes(move1) && allO.includes(move2)) {
        let move = move3;
        // check if opponent has played that move
        if (gameState[move] === undefined) {
          bestPlaceToWin = move;

          console.log('reached1', move);

          return move;
        }
      } else if (allO.includes(move1) && allO.includes(move3)) {
        let move = move2;
        // check if opponent has played that move
        if (gameState[move] === undefined) {
          bestPlaceToWin = move;

          console.log('reached1', move);

          return move;
        }
      } else if (allO.includes(move2) && allO.includes(move3)) {
        let move = move1;
        // check if opponent has played that move
        if (gameState[move] === undefined) {
          bestPlaceToWin = move;

          console.log('reached1', move);

          return move;
        }
      }
    }
  }

  // end checker for if computer is about to win

  // @TODO: check if player/enemy is about to win then blocks him
  // @DOING
  const enemyAll: any[] = [];

  gameState.map((_val, position) => {
    if (_val === 'X') {
      enemyAll.push(position);
    }
  });

  for (let i = 0; i < winnerResults.length; i++) {
    const _group = winnerResults[i];

    const found = _group.some((r) => enemyAll.includes(r));

    if (found) {
      // okay a reasonable move is found, so let's check to see if all isn't played
      const [move1, move2, move3] = _group;

      if (enemyAll.includes(move1) && enemyAll.includes(move2)) {
        let move = move3;
        // check if opponent has played that move
        if (gameState[move] === undefined) {
          bestPlaceToWin = move;

          console.log('reached1', move);

          return move;
        }
      } else if (enemyAll.includes(move1) && enemyAll.includes(move3)) {
        let move = move2;
        // check if opponent has played that move
        if (gameState[move] === undefined) {
          bestPlaceToWin = move;

          console.log('reached1', move);

          return move;
        }
      } else if (enemyAll.includes(move2) && enemyAll.includes(move3)) {
        let move = move1;
        // check if opponent has played that move
        if (gameState[move] === undefined) {
          bestPlaceToWin = move;

          console.log('reached1', move);

          return move;
        }
      }
    }
  }

  // end checker for if bot is about to lose

  for (let i = 0; i < winnerResults.length; i++) {
    const _group = winnerResults[i];

    const found = _group.some((r) => allO.includes(r));

    if (found) {
      // okay a reasonable move is found, so let's check to see if all isn't played
      const [move1, move2, move3] = _group;

      if (
        !allO.includes(move1) ||
        !allO.includes(move2) ||
        !allO.includes(move3)
      ) {
        // meaning atleast one of 3 moves hasn't been played yet

        // check if it's the first
        let move = null;

        move = !allO.includes(move1)
          ? move1
          : !allO.includes(move2)
          ? move2
          : move3;

        // check if opponent has played that move
        if (gameState[move] === undefined) {
          bestPlaceToWin = move;

          console.log('reached1', move);

          return move;
        } else {
          move = !allO.includes(move2) ? move2 : move3;

          // check if opponent has played that move
          if (gameState[move] === undefined) {
            bestPlaceToWin = move;

            console.log('reached2', move);

            return move;
          } else {
            move = move3;

            if (gameState[move] === undefined) {
              bestPlaceToWin = move;

              console.log('reached3', move);
              return move;
            }
          }
        }
      }
    }
  }

  // winnerResults.forEach((_group) => {

  // });

  if (bestPlaceToWin === null) {
    // just check for free position and play there since no logical option to win
    for (let position = 0; position < gameState.length; position++) {
      const _val = gameState[position];

      if (_val === undefined) {
        return position;
      }
    }

    // gameState.map((_val, position) => {
    //   if (_val === undefined) {
    //     return position;
    //   }
    // });
  }

  return bestPlaceToWin;
};

export const checkGameResult = (gameState: GameStateType[]) => {
  const gameResult: {
    isFinished: boolean;
    hasWinner: boolean;
    winnerResult: number[];
    winnerPlayerType: undefined | BoardType;
  } = {
    isFinished: false,
    hasWinner: false,
    winnerResult: [],
    winnerPlayerType: undefined,
  };

  winnerResults.forEach((result) => {
    const isResultFinished =
      gameState[result[0]] !== undefined &&
      gameState[result[0]] === gameState[result[1]] &&
      gameState[result[0]] === gameState[result[2]];

    if (isResultFinished) {
      gameResult.isFinished = true;
      gameResult.hasWinner = true;
      gameResult.winnerResult = result;
      gameResult.winnerPlayerType = gameState[result[0]];

      return;
    }
  });

  if (checkLastRound(gameState)) {
    gameResult.isFinished = true;
  }

  return gameResult;
};

export const checkIsWinnerBoard = (winnerResult: number[], index: number) => {
  const isWinner = winnerResult
    .find((resultItem) => resultItem === index)
    ?.toString();

  return isWinner ? true : false;
};
