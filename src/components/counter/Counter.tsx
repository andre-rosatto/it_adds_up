import styles from './Counter.module.css';

interface CounterProps {
	count: number;
	size: number
}

export default function Counter({ count, size }: CounterProps) {
	const total = size * size / 2;

	const getClassName = () => {
		if (count === total) {
			return styles.correct;
		} else if (count > total) {
			return styles.wrong;
		} else {
			return '';
		}
	}

	const getElement = (idx: number) => {
		if (idx < total && idx < count) {
			return <span className={`${styles.check} ${styles.correct}`} key={idx}>✔</span>;
		} else if (idx < total) {
			return <span className={styles.check} key={idx}>✔</span>;
		} else {
			return <span className={`${styles.check}`} key={idx}>✔</span>;
		}
	}

	return (
		<div className={`${styles.Counter} ${getClassName()}`}>
			{count} / {total}
			<div className={styles.checksContainer}>
				{Array.from({ length: total }).map((_, idx) => getElement(idx))}
			</div>
		</div>
	);
}
