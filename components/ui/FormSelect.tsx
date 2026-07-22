"use client";

import { useEffect, useRef, useState } from "react";

/**
 * FormSelect — accessible custom select (combobox + listbox), styled to
 * match the site's dark inputs instead of the native browser menu.
 * Keyboard: ArrowUp/Down, Home/End, Enter/Space select, Escape closes.
 * The chosen value is exposed to the surrounding <form> via a hidden input.
 */
export function FormSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  invalid = false,
  describedBy,
  className = "",
}: {
  id: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listboxId = `${id}-listbox`;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  useEffect(() => {
    if (!open || activeIdx < 0) return;
    listRef.current?.children[activeIdx]?.scrollIntoView({ block: "nearest" });
  }, [open, activeIdx]);

  function openList() {
    setOpen(true);
    setActiveIdx(Math.max(0, options.indexOf(value)));
  }

  function choose(i: number) {
    onChange(options[i]);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) openList();
        else setActiveIdx((i) => Math.min(options.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) openList();
        else setActiveIdx((i) => Math.max(0, i - 1));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open && activeIdx >= 0) choose(activeIdx);
        else openList();
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActiveIdx(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setActiveIdx(options.length - 1);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-activedescendant={
          open && activeIdx >= 0 ? `${id}-opt-${activeIdx}` : undefined
        }
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`flex items-center justify-between gap-3 text-left ${className} ${
          open ? "!border-accent/50" : ""
        }`}
      >
        <span className={`truncate ${value ? "text-mist-100" : "text-mist-600"}`}>
          {value || placeholder}
        </span>
        <svg
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-mist-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-labelledby={id}
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-64 overflow-auto rounded-xl border border-white/10 bg-ink-900 py-1.5 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)]"
        >
          {options.map((opt, i) => {
            const selected = opt === value;
            const active = i === activeIdx;
            return (
              <li
                key={opt}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={selected}
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => choose(i)}
                onMouseEnter={() => setActiveIdx(i)}
                className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-base transition-colors duration-150 sm:text-sm ${
                  active ? "bg-accent/[0.08] text-mist-100" : "text-mist-300"
                }`}
              >
                <span className="min-w-0 break-words">{opt}</span>
                {selected && (
                  <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 text-accent"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
