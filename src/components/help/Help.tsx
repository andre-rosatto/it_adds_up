import { useTranslation } from 'react-i18next';
import styles from './Help.module.css';

interface HelpProps {
	onClose: () => void;
}

export default function Help({ onClose }: HelpProps) {
	const { t } = useTranslation();

	const handleWindowClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	}

	return (
		<div
			className={styles.Help}
			onClick={onClose}
		>
			<div
				className={styles.window}
				onClick={e => handleWindowClick(e)}
			>
				<h2 className={styles.title}>{t('help_title')}</h2>

				<p className={styles.text}>{t('help_text_1')}</p>
				<p className={styles.text}>{t('help_text_2')}</p>
				<p className={styles.text}>{t('help_text_3')}</p>
				<p className={styles.text}>{t('help_text_4')}</p>

				<button
					className={styles.button}
					onClick={onClose}
				>OK</button>
			</div>
		</div>
	);
}
