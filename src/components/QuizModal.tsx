"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { waLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type ResultKey = "kids" | "exam" | "speaking" | "business";

interface Question {
  key: "q1" | "q2" | "q3" | "q4";
  options: string[]; // message suffixes, e.g. "a" | "b" | ...
}

const QUESTIONS: Question[] = [
  { key: "q1", options: ["a", "b", "c"] },
  { key: "q2", options: ["a", "b", "c", "d"] },
  { key: "q3", options: ["a", "b", "c"] },
  { key: "q4", options: ["a", "b", "c"] },
];

function computeResult(answers: Record<string, string>): ResultKey {
  if (answers.q1 === "a") return "kids";
  if (answers.q2 === "b" || answers.q4 === "a") return "exam";
  if (answers.q2 === "d") return "business";
  return "speaking";
}

const RESULT_LABEL: Record<ResultKey, string> = {
  kids: "resultKids",
  exam: "resultExam",
  speaking: "resultSpeaking",
  business: "resultBusiness",
};

interface QuizTriggerProps {
  className?: string;
  children: React.ReactNode;
  /** Analytics source (page path or section) */
  source: string;
}

/** Lead-magnet quiz (PRD §6.2): 4 questions → path recommendation → capture. */
export function QuizTrigger({ className, children, source }: QuizTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={cn(className)}
        onClick={() => {
          setOpen(true);
          trackEvent("quiz_start", { source });
        }}
      >
        {children}
      </button>
      {open && <QuizModal onClose={() => setOpen(false)} source={source} />}
    </>
  );
}

function QuizModal({ onClose, source }: { onClose: () => void; source: string }) {
  const t = useTranslations("quiz");
  const tw = useTranslations("whatsapp");
  const locale = useLocale();
  const [step, setStep] = useState(0); // 0..3 questions, 4 = result+capture
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [captureState, setCaptureState] = useState<"idle" | "sending" | "done">(
    "idle",
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const result = computeResult(answers);
  const resultLabel = t(RESULT_LABEL[result]);

  const submitCapture = useCallback(async () => {
    if (!whatsapp.trim()) return;
    setCaptureState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Quiz lead",
          whatsapp,
          email,
          interest: `quiz:${result}`,
          message: `Quiz answers: ${JSON.stringify(answers)}`,
          source: `quiz:${source}`,
          locale,
        }),
      });
      if (!res.ok) throw new Error("failed");
      trackEvent("lead_captured", { source: "quiz" });
      setCaptureState("done");
    } catch {
      // Graceful degradation: open WhatsApp instead (PRD §10)
      window.open(waLink(tw("quizPrefill", { result: resultLabel })), "_blank");
      setCaptureState("done");
    }
  }, [whatsapp, email, result, answers, source, locale, tw, resultLabel]);

  const question = step < 4 ? QUESTIONS[step] : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-brand-ink/60 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t("title")}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-xl sm:rounded-3xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl font-extrabold text-brand-maroon">
            {t("title")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="rounded-full p-2 text-brand-ink/60 transition-all duration-200 hover:scale-110 hover:bg-brand-cream-soft hover:text-brand-maroon active:scale-90"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        {question ? (
          <div className="mt-6">
            <p className="text-sm font-semibold text-brand-blue">
              {step + 1} / {QUESTIONS.length}
            </p>
            <p className="mt-2 font-display text-lg font-bold text-brand-ink">
              {t(question.key)}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {question.options.map((opt) => {
                const selected = answers[question.key] === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setAnswers((a) => ({ ...a, [question.key]: opt }));
                      if (step === QUESTIONS.length - 1) {
                        trackEvent("quiz_completed", {
                          result_path: computeResult({
                            ...answers,
                            [question.key]: opt,
                          }),
                        });
                      }
                      setStep((s) => s + 1);
                    }}
                    className={cn(
                      "rounded-2xl border-2 px-4 py-3 text-left text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]",
                      selected
                        ? "border-brand-maroon bg-brand-cream text-brand-maroon shadow-sm"
                        : "border-brand-cream bg-white text-brand-ink hover:border-brand-yellow hover:bg-brand-cream-soft",
                    )}
                  >
                    {t(`${question.key}${opt}`)}
                  </button>
                );
              })}
            </div>
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue transition-transform hover:-translate-x-1 active:scale-95"
              >
                ← {t("back")}
              </button>
            )}
          </div>
        ) : (
          <div className="mt-6">
            <p className="text-sm font-semibold text-brand-blue">{t("resultTitle")}</p>
            <div className="mt-2 rounded-2xl bg-brand-yellow p-5 shadow-sm">
              <p className="font-display text-xl font-extrabold text-brand-maroon">
                {resultLabel}
              </p>
              <p className="mt-1 text-sm text-brand-ink/80">
                {t(`${RESULT_LABEL[result]}Desc`)}
              </p>
            </div>

            {captureState === "done" ? (
              <p className="mt-6 rounded-2xl bg-brand-cream-soft p-4 text-sm font-semibold text-brand-ink">
                {t("captureSuccess")}
              </p>
            ) : (
              <div className="mt-6">
                <p className="font-display font-bold text-brand-ink">
                  {t("captureTitle")}
                </p>
                <p className="mt-1 text-sm text-brand-ink/70">{t("captureDesc")}</p>
                <div className="mt-4 flex flex-col gap-3">
                  <label className="text-sm font-semibold text-brand-ink">
                    {t("captureWhatsappLabel")}
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="08xxxxxxxxxx"
                      className="mt-1 w-full rounded-xl border-2 border-brand-cream px-4 py-3 text-sm outline-none focus:border-brand-maroon"
                    />
                  </label>
                  <label className="text-sm font-semibold text-brand-ink">
                    {t("captureEmailLabel")}
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="mt-1 w-full rounded-xl border-2 border-brand-cream px-4 py-3 text-sm outline-none focus:border-brand-maroon"
                    />
                  </label>
                  <button
                    type="button"
                    disabled={captureState === "sending" || !whatsapp.trim()}
                    onClick={submitCapture}
                    className="btn-hover-glow rounded-full bg-brand-maroon px-6 py-3 font-bold text-white shadow-sm transition-all hover:bg-brand-maroon-dark active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t("captureSubmit")}
                  </button>
                  <a
                    href={waLink(tw("quizPrefill", { result: resultLabel }))}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("whatsapp_click", { source_page: source, context: "quiz-skip" })
                    }
                    className="text-center text-sm font-semibold text-brand-blue hover:underline"
                  >
                    {t("captureSkip")}
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
