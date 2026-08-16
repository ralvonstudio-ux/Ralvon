import { useRef, useState } from "react";
import { FEATURED_PROJECT, PROJECTS, type Project } from "../data/projects";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * A horizontal deck of project screenshots — cards overlap slightly, the
 * active one sits largest and sharpest up front, and left/right arrows (or
 * a drag/swipe) step through them.
 *
 * The deck tracks the pointer live while dragging (transition disabled, 1:1
 * follow), then re-enables the eased transition on release so it either
 * continues smoothly into the next card or springs back — never just a
 * dead zone until you let go.
 *
 * Screenshots are shown at their full aspect ratio — never cropped — so
 * `h-auto` follows the image, nothing relies on `object-cover`.
 */

const DECK: Project[] = [FEATURED_PROJECT, ...PROJECTS];
const CARD_W = 440; // px, desktop active-card width (screenshots are 1.6:1, so ~275px tall)
const CARD_W_SM = 300; // px, side-card width
const STEP_RATIO = 0.6; // how much of the card width each neighbor is offset by (creates the overlap)
const DRAG_COMMIT_THRESHOLD = 60; // px of drag needed to actually change the active card

export function WorkCarousel() {
  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const reducedMotion = useReducedMotion();
  const dragState = useRef<{ startX: number; moved: boolean } | null>(null);

  const go = (dir: 1 | -1) => setActive((a) => (a + dir + DECK.length) % DECK.length);

  const onPointerDown = (e: React.PointerEvent) => {
    dragState.current = { startX: e.clientX, moved: false };
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const state = dragState.current;
    if (!state) return;
    const delta = e.clientX - state.startX;
    if (Math.abs(delta) > 4) state.moved = true;
    setDragOffset(delta);
  };

  const endDrag = () => {
    const state = dragState.current;
    if (!state) return;
    if (dragOffset > DRAG_COMMIT_THRESHOLD) go(-1);
    else if (dragOffset < -DRAG_COMMIT_THRESHOLD) go(1);
    dragState.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const onCardClick = (e: React.MouseEvent) => {
    // Suppress the navigation click that follows a drag/swipe release.
    if (dragState.current?.moved) {
      e.preventDefault();
    }
  };

  return (
    <div className="mt-6 sm:mt-8">
      <div
        className="relative h-[clamp(190px,32vh,340px)] cursor-grab active:cursor-grabbing select-none touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        {DECK.map((project, i) => {
          const offset = i - active;
          const dist = Math.abs(offset);
          const cardW = offset === 0 ? `min(${CARD_W}px, 80vw)` : `min(${CARD_W_SM}px, 60vw)`;
          const step = CARD_W * STEP_RATIO;
          const drag = isDragging ? dragOffset : 0;
          const x = offset * step + drag;
          const scale = offset === 0 ? 1 : dist === 1 ? 0.86 : 0.76;
          const opacity = dist > 2 ? 0 : offset === 0 ? 1 : dist === 1 ? 0.75 : 0.4;
          const z = 50 - dist;

          return (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="view"
              aria-label={`Visit ${project.name} (opens in a new tab)`}
              aria-hidden={dist > 2}
              tabIndex={dist > 2 ? -1 : undefined}
              onClick={onCardClick}
              onDragStart={(e) => e.preventDefault()}
              className="absolute left-1/2 top-1/2 block"
              style={{
                width: cardW,
                transform: `translate(-50%, -50%) translateX(${x}px) scale(${scale})`,
                opacity,
                zIndex: z,
                pointerEvents: dist > 2 ? "none" : "auto",
                transition:
                  reducedMotion || isDragging
                    ? "none"
                    : "transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.6s ease",
              }}
            >
              <div className="drop-shadow-[0_30px_45px_-12px_rgba(0,0,0,0.55)]">
                {/* Screen */}
                <div className="relative rounded-t-[8px] sm:rounded-t-xl bg-graphite p-[5px] sm:p-2 pb-[3px] sm:pb-1">
                  <span className="absolute left-1/2 top-[3px] sm:top-1.5 -translate-x-1/2 h-[3px] w-[3px] rounded-full bg-accent" />
                  <div className="rounded-[4px] sm:rounded-[7px] overflow-hidden bg-ink">
                    <img
                      src={project.image}
                      alt={`${project.name} homepage`}
                      width={960}
                      height={600}
                      loading={dist === 0 ? "eager" : "lazy"}
                      draggable={false}
                      className="block w-full h-auto"
                    />
                  </div>
                </div>
                {/* Base / hinge */}
                <div className="relative h-[4px] sm:h-2 -mx-[4%] rounded-b-[3px] sm:rounded-b-md bg-gradient-to-b from-stone/60 to-graphite">
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 h-[2px] sm:h-[3px] w-10 sm:w-14 rounded-b-full bg-ink/50" />
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Active card's name/category — readable without needing a hover state */}
      <div className="mt-3 text-center">
        <h3 className="font-display font-bold text-xl sm:text-2xl text-ivory tracking-tight">
          {DECK[active].name}
        </h3>
        <p className="font-body text-xs sm:text-sm text-stone mt-0.5">{DECK[active].category}</p>
      </div>

      {/* Prev / next controls */}
      <div className="mt-3 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous project"
          className="h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-ivory/25 flex items-center justify-center text-ivory transition-colors duration-300 hover:border-accent hover:bg-accent"
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M13 7H1M1 7L7 1M1 7L7 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Select project">
          {DECK.map((project, i) => (
            <button
              key={project.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show ${project.name}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-accent" : "w-1.5 bg-ivory/25 hover:bg-ivory/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next project"
          className="h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-ivory/25 flex items-center justify-center text-ivory transition-colors duration-300 hover:border-accent hover:bg-accent"
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M1 7H13M13 7L7 1M13 7L7 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
