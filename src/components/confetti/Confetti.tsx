import { useEffect, useRef } from "react";
import styles from './Confetti.module.css';

interface ConfettiProps {
	count?: number;
	colors?: Array<string>;
	zIndex?: number;
}

interface IConfetti {
	x: number;
	y: number;
	w: number;
	h: number;
	r: number;
	color: string;
	speedY: number;
	speedX: number;
	speedR: number;
}

/**
 * Confetti component.
 * @param count The number of confetti to be generated (default 50);
 * @param colors Array of colors to be randomly picked (default ['red', 'blue', 'cyan', 'green', 'yellow', 'white', 'pink', 'orange', 'purple']);
 * @param zIndex Z-index of the component (default Number.MAX_SAFE_INTEGER).
 * @returns 
 */
export default function Confetti({
	count = 50,
	colors = ['red', 'blue', 'cyan', 'green', 'yellow', 'white', 'pink', 'orange', 'purple'],
	zIndex = Number.MAX_SAFE_INTEGER
}: ConfettiProps) {
	const canvas = useRef<HTMLCanvasElement>(null);
	const confetti = useRef<IConfetti[]>(
		Array.from(Array(count), () => ({
			x: Math.random() * window.innerWidth,
			y: Math.random() * -window.innerHeight,
			w: Math.random() * 10 + 8,
			h: Math.random() * 10 + 8,
			r: Math.random(),
			color: colors[Math.floor(Math.random() * colors.length)],
			speedY: Math.random() * 2 + 1,
			speedX: (Math.random() - 0.5) / 2,
			speedR: (Math.random() - 0.5) / 20
		}))
	);

	useEffect(() => {
		// resize
		const handleResize = () => {
			if (canvas.current) {
				const ctx = canvas.current.getContext('2d');
				const dpr = window.devicePixelRatio || 1;

				canvas.current.style.display = 'none';

				const width = window.visualViewport?.width ?? window.innerWidth;
				const height = window.visualViewport?.height ?? window.innerHeight;

				canvas.current.style.width = `${width}px`;
				canvas.current.style.height = `${height}px`;
				canvas.current.width = width * dpr;
				canvas.current.height = height * dpr;

				canvas.current.style.display = 'block';

				if (ctx) {
					ctx.scale(dpr, dpr);
				}
			}
		}
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		// confetti animation
		let animation: number;

		const updateConfetti = () => {
			if (!isCanvas(canvas.current)) return;
			const ctx = canvas.current.getContext('2d');
			if (!ctx) return;

			ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

			confetti.current.forEach(c => {
				c.x += c.speedX;
				if (c.y > canvas.current!.height) {
					c.x = Math.random() * window.innerWidth;
					c.y = Math.random() * -5;
					c.speedR = (Math.random() - 0.5) / 20;
				} else {
					c.y += c.speedY
					c.r += c.speedR;
				}
				ctx.fillStyle = c.color;
				ctx.save();
				ctx.translate(c.x, c.y);
				ctx.rotate(c.r);
				ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
				ctx.restore();
			});
			animation = requestAnimationFrame(updateConfetti);
		}
		animation = requestAnimationFrame(updateConfetti);
		return () => cancelAnimationFrame(animation);
	}, []);

	const isCanvas = (el: any): el is HTMLCanvasElement => typeof el === 'object' && 'getContext' in el;

	return (
		<canvas
			ref={canvas}
			className={styles.Confetti}
			style={{ zIndex }}
		></canvas>
	);
}