import { useState } from 'react';
import './App.css';
import Board from './components/board';
import useGame from './components/hooks/useGame';
import Menu from './components/menu';
import './i18n';
import { useTranslation } from 'react-i18next';
import Confetti from './components/confetti';

const BOARD_SIZE = 6;

export default function App() {
	const { values, cols, rows, resetGame } = useGame(BOARD_SIZE);
	const [marks, setMarks] = useState<number[]>(new Array(BOARD_SIZE * BOARD_SIZE).fill(0));
	const [win, setWin] = useState(false);
	const { t } = useTranslation();

	const handleMark = (idx: number) => {
		const nextMarks = [...marks];
		nextMarks[idx] += 1;
		if (nextMarks[idx] > 2) {
			nextMarks[idx] = 0;
		}
		setMarks(nextMarks);
	}

	const handleWin = () => {
		setWin(true);
	}

	const handleNewGame = () => {
		if (!win) {
			if (!window.confirm(t('restart_confirm'))) {
				return;
			}
		}
		setMarks(new Array(BOARD_SIZE * BOARD_SIZE).fill(0));
		resetGame();
		setWin(false);
	}

	const handleHelp = () => {

	}

	return (
		<div className='App'>
			<Board
				enabled={!win}
				size={BOARD_SIZE}
				values={values}
				cols={cols}
				rows={rows}
				marks={marks}
				onMark={handleMark}
				onWin={handleWin}
			/>

			<Menu
				onNewGame={handleNewGame}
				onHelp={handleHelp}
			/>

			{win && <Confetti />}
		</div>
	);
}