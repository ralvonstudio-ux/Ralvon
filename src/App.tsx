import { Routes, Route } from "react-router-dom";
import { CustomCursor } from "./components/layout/CustomCursor";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { PageTransition } from "./components/layout/PageTransition";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

export function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <CustomCursor />
      <SmoothScroll />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </>
  );
}
