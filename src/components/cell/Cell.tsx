import styles from './Cell.module.css';

export interface CellProps {
	value: number;
	checked: boolean;
	onClick: () => void;
}

export default function Cell({ value, checked, onClick }: CellProps) {
	return (
		<div className={styles.Cell} onClick={onClick}>
			<span className={styles.value}>{value}</span>
			{checked && <span className={styles.checked}></span>}
		</div>
	);
}
