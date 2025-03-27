import styles from './Hints.module.css';

interface HintsProps {
	orientation: 'columns' | 'rows',
	values: number[];
	currentValues: number[];
}

export default function Hints({ orientation, values, currentValues }: HintsProps) {
	const getCurrentValueClass = (value: number, currentValue: number) => {
		if (currentValue === value) {
			return styles.correct;
		} else if (currentValue > value) {
			return styles.wrong;
		} else {
			return '';
		}
	}

	return (
		<div
			className={styles.Hints}
			style={{
				gridTemplateColumns: orientation === 'columns' ? `repeat(${values.length}, 1fr)` : 'none',
				gridTemplateRows: orientation === 'rows' ? `repeat(${values.length}, 1fr)` : 'none',
			}}
		>
			{values.map((value, idx) => (
				<span
					key={idx}
					className={`${styles.value} ${orientation === 'columns' ? styles.columns : ''}`}
				>
					{value}
					<span className={`${styles.currentValue} ${getCurrentValueClass(value, currentValues[idx])}`}>{currentValues[idx]}</span>
				</span>
			))}
		</div>
	);
}
