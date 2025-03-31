import styles from './Board.module.css';
import useGame from '../hooks/useGame';
import { useEffect, useState } from 'react';
import Cell from '../cell';
import Hints from '../hints';
import Counter from '../counter';

const BOARD_SIZE = 6;

export default function Board() {
	const { values, cols, rows } = useGame(BOARD_SIZE);
	const [marks, setMarks] = useState<number[]>(new Array(BOARD_SIZE * BOARD_SIZE).fill(0));
	const [win, setWin] = useState(false);

	useEffect(() => {
		const checkWin = () => {
			const markCount = marks.filter(mark => mark === 1).length;
			if (markCount !== Math.floor(BOARD_SIZE * BOARD_SIZE / 2)) {
				return;
			}
			const colValues = getCurrentValues('columns');
			const rowValues = getCurrentValues('rows');
			for (let i = 0; i < BOARD_SIZE; i++) {
				if (colValues[i] !== cols[i] || rowValues[i] !== rows[i]) {
					return false;
				}
			}
			setWin(true);
			console.log('win!');
		}
		checkWin();
	}, [marks]);

	const handleCellClick = (idx: number) => {
		if (win) return;
		const nextMarks = [...marks];
		nextMarks[idx] += 1;
		if (nextMarks[idx] > 2) {
			nextMarks[idx] = 0;
		}
		setMarks(nextMarks);
	}

	const getCurrentValues = (orientation: 'columns' | 'rows') => {
		const result = new Array(BOARD_SIZE).fill(0);
		for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
			const idx = orientation === 'columns' ? i % BOARD_SIZE : Math.floor(i / BOARD_SIZE);
			if (marks[i] === 1) {
				result[idx] += values[i];
			}
		}
		return result;
	}

	return (
		<div className={styles.Board}>
			<Counter count={marks.filter(mark => mark === 1).length} size={BOARD_SIZE} />

			<Hints orientation='columns' values={cols} currentValues={getCurrentValues('columns')} />
			<Hints orientation='rows' values={rows} currentValues={getCurrentValues('rows')} />

			<div
				className={styles.values}
				style={{
					gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
					gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
				}}
			>
				{values.map((value, idx) => (
					<Cell key={idx} value={value} mark={marks[idx]} onClick={() => handleCellClick(idx)} />
				))}
			</div>
		</div>
	);
}
