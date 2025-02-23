// Global App Setup 02/21/2025 Raihan Hafiz
import type { AppProps } from 'next/app';
import '../../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;