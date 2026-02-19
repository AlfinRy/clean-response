import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'clean-response | Standardize API Responses',
	description: 'Works like your response formatter. Standardize API responses with type-safe, lightweight functions.',
	keywords: ['api', 'response', 'express', 'fastify', 'typescript', 'backend', 'rest'],
	authors: [{ name: 'alfinry' }],
	icons: {
		icon: '/icon.svg',
		shortcut: '/favicon.ico',
		apple: '/apple-touch-icon.png',
	},
	openGraph: {
		title: 'clean-response | Standardize API Responses',
		description: 'Standardize API responses with type-safe, lightweight functions',
		type: 'website',
	}
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="font-mono">{children}</body>
		</html>
	);
}
