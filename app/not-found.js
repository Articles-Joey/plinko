import ArticlesButton from "@/components/UI/Button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="not-found-page">
            <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center">

                <img
                    src="/img/preview.png"
                    alt="Not Found"
                    style={{
                        width: '100%',
                        maxWidth: 300,
                        marginBottom: '1rem',
                    }}
                />

                <h1>404 - Page Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>

                <Link href="/">
                    <ArticlesButton>
                        Return Home
                    </ArticlesButton>
                </Link>

            </div>
        </div>
    );
}