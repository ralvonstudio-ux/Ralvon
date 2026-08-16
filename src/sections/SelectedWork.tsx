import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { DarkSectionBackdrop } from "../components/ui/DarkSectionBackdrop";
import { WorkCarousel } from "./WorkCarousel";

export function SelectedWork() {
  return (
    <section
      id="work"
      className="window-section relative overflow-hidden bg-ink text-ivory pt-[clamp(88px,14vh,120px)] pb-[clamp(24px,5vh,48px)] flex flex-col justify-center"
    >
      <DarkSectionBackdrop glow="90% 8%" />

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <SectionHeading
            label="Selected Work"
            tone="dark"
            lines={["Products & Systems", "We've Shaped."]}
            description="A selection of digital products, experiences and systems we've designed and built."
          />
        </div>

        <WorkCarousel />
      </Container>
    </section>
  );
}
