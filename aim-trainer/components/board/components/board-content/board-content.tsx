import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';

import { TargetField } from '../target-field/target-field';
import { SecondsToStart, StartGameButton } from '../../board.styles';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import {
  selectGameIsIdle,
  selectGameIsOver,
  selectGameIsPending,
  selectGameIsStarted,
  setGameStatus,
} from '../../../../reducers/game-slice';
import { clearTargets } from '../../../../reducers/targets-slice';
import { BoardStatistics } from '../board-statistics/board-statistics';
import { GameStatus } from '../../../../utils/enums/game-status';
import { selectBoardSizes } from '../../../../reducers/board-slice';

import { StyledBoardContent } from './board-content.styles';
import { BoardStartScreen } from '../board-start-screen/board-start-screen';

type BoardContentProps = {
  missHandler: () => void;
};

export const BoardContent = (props: BoardContentProps) => {
  const { missHandler } = props;

  const dispatch = useAppDispatch();
  const gameIsOver = useAppSelector(selectGameIsOver);
  const gameIsIdle = useAppSelector(selectGameIsIdle);
  const gameIsStarted = useAppSelector(selectGameIsStarted);
  const gameIsPending = useAppSelector(selectGameIsPending);
  const boardSize = useAppSelector(selectBoardSizes);

  const [secondsToStart, setSecondsToStart] = useState<number>(3);

  useEffect(
    () => () => {
      dispatch(setGameStatus(GameStatus.Idle));
      dispatch(clearTargets());
    },
    [],
  );

  useEffect(() => {
    if (gameIsPending) {
      const timerID = setInterval(() => setSecondsToStart((prev) => prev - 1), 1000);

      return () => clearInterval(timerID);
    }

    setSecondsToStart(3);
  }, [gameIsPending]);

  useEffect(() => {
    if (!secondsToStart) {
      dispatch(setGameStatus(GameStatus.Start));
    }
  }, [secondsToStart]);

  const screen = useMemo(() => {
    if (gameIsOver) {
      return <BoardStatistics />;
    }
    if (gameIsIdle) {
      return <BoardStartScreen />;
    }
    if (gameIsPending) {
      return <SecondsToStart>{secondsToStart}</SecondsToStart>;
    }

    return <TargetField />;
  }, [gameIsIdle, gameIsOver, gameIsPending, secondsToStart]);

  const onMissHandler = useCallback(() => {
    if (gameIsStarted) {
      missHandler();
    }
  }, [missHandler, gameIsStarted]);

  return (
    <StyledBoardContent onClick={onMissHandler} size={boardSize}>
      {screen}
    </StyledBoardContent>
  );
};
