import { useEffect, useState } from "react";

export default function useGame(size: number) {
	const [values, setValues] = useState<number[]>([]);
	const [rows, setRows] = useState<number[]>([]);
	const [cols, setCols] = useState<number[]>([]);

	useEffect(() => {
		const nextValues = new Array(size * size).fill(-1);
		const nextRows = new Array(size).fill(0);
		const nextCols = new Array(size).fill(0);
		let solutionCount = 0;

		for (let i = 0; i < size * size; i++) {
			const emptyIndices = [];
			for (let idx = 0; idx < nextValues.length; idx++) {
				if (nextValues[idx] === -1) {
					emptyIndices.push(idx);
				}
			}
			const value = Math.floor(Math.random() * 9) + 1;
			const randomIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
			nextValues[randomIdx] = value;

			solutionCount++;
			if (solutionCount <= Math.floor(size * size / 2)) {
				const row = Math.floor(randomIdx / size);
				const col = randomIdx % size;
				nextRows[row] += value;
				nextCols[col] += value;
			}
		}

		setValues(nextValues);
		setCols(nextCols);
		setRows(nextRows);
	}, [size]);

	return { values, cols, rows };
}