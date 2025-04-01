import { useTranslation } from 'react-i18next';
import styles from './Menu.module.css';
import flagPt from '../../assets/flag_pt.webp';
import flagEn from '../../assets/flag_en.webp';

interface MenuProps {
	onNewGame: () => void;
	onRestartGame: () => void;
	onHelp: () => void;
}

export default function Menu({ onNewGame, onRestartGame, onHelp }: MenuProps) {
	const { t, i18n } = useTranslation();

	const currentLanguage = i18n.language;

	const handleLanguageClick = (language: string) => {
		i18n.changeLanguage(language);
	}

	return (
		<div className={styles.Menu}>
			<ul className={styles.container}>
				<li
					className={styles.menuItem}
					onClick={onNewGame}
				>
					<span className={styles.menuContent}>{t('menu_new_game')}</span>
				</li>

				<li
					className={styles.menuItem}
					onClick={onRestartGame}
				>
					<span className={styles.menuContent}>{t('menu_restart')}</span>
				</li>

				<li
					className={styles.menuItem}
					onClick={onHelp}
				>
					<span className={styles.menuContent}>{t('menu_help')}</span>
				</li>

				<li className={styles.menuItem}>
					<img
						className={`${styles.flag} ${currentLanguage === 'pt' ? styles.selected : ''}`}
						src={flagPt}
						alt='Português'
						title='Português'
						onClick={() => handleLanguageClick('pt')}
					/>
					<img
						className={`${styles.flag} ${currentLanguage === 'en' ? styles.selected : ''}`}
						src={flagEn}
						alt='English'
						title='English'
						onClick={() => handleLanguageClick('en')}
					/>
				</li>
			</ul>
		</div>
	);
}
