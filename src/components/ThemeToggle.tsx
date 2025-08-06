import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
	const [isDark, setIsDark] = React.useState(() => {
		if (typeof window !== 'undefined') {
			return document.documentElement.classList.contains('dark');
		}
		return false;
	});

	const toggleTheme = () => {
		const newTheme = !isDark;
		setIsDark(newTheme);

		if (newTheme) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	};

	React.useEffect(() => {
		const savedTheme = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
			setIsDark(true);
			document.documentElement.classList.add('dark');
		} else {
			setIsDark(false);
			document.documentElement.classList.remove('dark');
		}
	}, []);

	return (
		<Button
			variant="outline"
			onClick={toggleTheme}
			className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all duration-300 p-2 rounded-full"
		>
			{isDark ? (
				<Sun className="h-8 w-8 text-yellow-500" />
			) : (
				<Moon className="h-8 w-8 text-blue-500" />
			)}
		</Button>
	);
};