/**
 * Per-section atmosphere layer — sits behind a section's content to give each
 * major area a distinct mood while the global network field stays consistent.
 * Purely decorative; never intercepts pointer events.
 */
export type Tone = "calm" | "control" | "focused" | "warm";

const LAYERS: Record<Tone, React.ReactNode> = {
  // services / work — quiet, recedes so cards lead
  calm: (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(70% 50% at 50% -10%, rgba(214,165,68,0.05), transparent 70%)",
      }}
    />
  ),
  // media / creative — control-room: cool top-left + faint REC-red bottom-right
  control: (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 12% 0%, rgba(214,165,68,0.08), transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 92% 100%, rgba(239,68,68,0.06), transparent 70%)",
        }}
      />
    </>
  ),
  // contact — darker, focused single glow that pulls the eye to the panel
  focused: (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 70% 45%, rgba(214,165,68,0.10), transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 50%, transparent 35%, rgba(3,3,3,0.65) 100%)",
        }}
      />
    </>
  ),
  // about / experience — subtle warm graphite lift
  warm: (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(60% 55% at 85% 10%, rgba(148,163,184,0.05), transparent 70%)",
      }}
    />
  ),
};

export function SectionAtmosphere({ tone }: { tone: Tone }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden">
      {LAYERS[tone]}
    </div>
  );
}
