import styles from './Board.module.css';
import { useEffect } from 'react';
import Cell from '../cell';
import Hints from '../hints';
import Counter from '../counter';

interface BoardProps {
	enabled: boolean;
	size: number;
	values: number[];
	cols: number[];
	rows: number[];
	marks: number[];
	onMark: (idx: number) => void;
	onWin: () => void;
}

export default function Board({ enabled, size, values, cols, rows, marks, onMark, onWin }: BoardProps) {
	useEffect(() => {
		const checkWin = () => {
			const markCount = marks.filter(mark => mark === 1).length;
			if (markCount !== Math.floor(size * size / 2)) {
				return;
			}
			const colValues = getCurrentValues('columns');
			const rowValues = getCurrentValues('rows');
			for (let i = 0; i < size; i++) {
				if (colValues[i] !== cols[i] || rowValues[i] !== rows[i]) {
					return false;
				}
			}
			onWin();
		}
		checkWin();
	}, [marks]);

	const handleCellClick = (idx: number) => {
		if (!enabled) return;
		onMark(idx);
	}

	const getCurrentValues = (orientation: 'columns' | 'rows') => {
		const result = new Array(size).fill(0);
		for (let i = 0; i < size * size; i++) {
			const idx = orientation === 'columns' ? i % size : Math.floor(i / size);
			if (marks[i] === 1) {
				result[idx] += values[i];
			}
		}
		return result;
	}

	return (
		<div className={styles.Board}>
			<Counter count={marks.filter(mark => mark === 1).length} size={size} />

			<Hints orientation='columns' values={cols} currentValues={getCurrentValues('columns')} />
			<Hints orientation='rows' values={rows} currentValues={getCurrentValues('rows')} />

			<div
				className={styles.values}
				style={{
					gridTemplateColumns: `repeat(${size}, 1fr)`,
					gridTemplateRows: `repeat(${size}, 1fr)`,
				}}
			>
				{values.map((value, idx) => (
					<Cell key={idx} value={value} mark={marks[idx]} onClick={() => handleCellClick(idx)} />
				))}
			</div>
		</div>
	);
}
