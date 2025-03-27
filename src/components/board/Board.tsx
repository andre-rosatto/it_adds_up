import styles from './Board.module.css';
import useGame from '../hooks/useGame';
import { useState } from 'react';
import Cell from '../cell';
import Hints from '../hints';

const BOARD_SIZE = 5;

export default function Board() {
	const { values, cols, rows } = useGame(BOARD_SIZE);
	const [marks, setMarks] = useState(new Array(BOARD_SIZE * BOARD_SIZE).fill(0));

	const handleCellClick = (idx: number) => {
		const nextChecks = [...marks];
		nextChecks[idx] += 1;
		if (nextChecks[idx] > 2) {
			nextChecks[idx] = 0;
		}
		setMarks(nextChecks);
	}

	const getColsCurrentValues = (orientation: 'columns' | 'rows') => {
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
			<span></span>

			<Hints orientation='columns' values={cols} currentValues={getColsCurrentValues('columns')} />
			<Hints orientation='rows' values={rows} currentValues={getColsCurrentValues('rows')} />

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
