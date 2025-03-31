import styles from './Cell.module.css';

export interface CellProps {
	value: number;
	mark: number;
	onClick: () => void;
}

export default function Cell({ value, mark, onClick }: CellProps) {
	const getClassName = () => {
		switch (mark) {
			case 1:
				return styles.checked;
			case 2:
				return styles.deleted;
			default:
				return '';
		}
	}

	return (
		<div className={styles.Cell} onClick={onClick}>
			<span className={`${styles.value} ${getClassName()}`}>{value}</span>
		</div>
	);
}
