import { useEffect, useState } from 'react';
import Cell from '../cell';
import styles from './Board.module.css';
import { CellData } from '../typings/cellData';

export default function Board() {
	const [cells, setCells] = useState<CellData[]>([]);

	useEffect(() => {
		const nextCells: CellData[] = [];
		for (let i = 0; i < 16; i++) {
			nextCells.push({
				value: Math.floor(Math.random() * 10),
				checked: false,
			});
		}
		setCells(nextCells);
	}, []);

	const handleCellClick = (idx: number) => {
		console.log('toggle');

		const nextCells = [...cells];
		nextCells[idx].checked = !nextCells[idx].checked;
		setCells(nextCells);
	}

	return (
		<div className={styles.Board}>
			{cells.map((cell, idx) => (
				<Cell key={idx} value={cell.value} checked={cell.checked} onClick={() => handleCellClick(idx)} />
			))}
		</div>
	);
}
