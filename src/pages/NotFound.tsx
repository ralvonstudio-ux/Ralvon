import { Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Container } from "../components/ui/Container";

export function NotFound() {
  return (
    <>
      <Navbar variant="page" />
      <main id="main-content" className="min-h-screen flex items-center bg-ivory">
        <Container className="text-center">
          <h1 className="font-display font-extrabold text-ink text-[clamp(4rem,14vw,10rem)] leading-none tracking-tightest">
            404
          </h1>
          <p className="mt-4 font-body text-lg text-graphite">This page doesn&rsquo;t exist.</p>
          <Link
            to="/"
            className="mt-10 inline-flex items-center gap-2 font-body text-sm font-medium text-ink border-b border-ink pb-1"
          >
            Back to home →
          </Link>
        </Container>
      </main>
    </>
  );
}
