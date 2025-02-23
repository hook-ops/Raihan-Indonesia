// Home Page 02/25/2025 Raihan Hafiz
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function HomePage() {
    const router = useRouter();

    // Redirect to Library
    useEffect(() => {
        router.replace('/library');
    }, [router]);

    return <div>Redirecting...</div>;
}