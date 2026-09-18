import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Droplets, Flame, Heart, Home, Leaf, Phone, RotateCcw, ShieldPlus, Sparkles, Sprout, Wheat, type LucideIcon } from "lucide-react";
import { STORE, recommend, type Goal, type Need, type Product } from "@/data/products";
import { t, useLang } from "@/lib/i18n";
import { ProductQuickView } from "./ProductQuickView";
import { cn } from "@/lib/utils";

const needs: { id: Need; icon: LucideIcon }[] = [
  { id: "food", icon: Wheat },
  { id: "remedies", icon: Droplets },
  { id: "care", icon: Sparkles },
];
const goals: { id: Goal; icon: LucideIcon }[] = [
  { id: "immunity", icon: ShieldPlus },
  { id: "digestion", icon: Leaf },
  { id: "energy", icon: Flame },
  { id: "skin", icon: Heart },
  { id: "glutenfree", icon: Sprout },
  { id: "eco", icon: Home },
];

export function BioMatchQuiz() {
  const { tr } = useLang();
  const [need, setNeed] = useState<Need | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [open, setOpen] = useState<Product | null>(null);
  const step = need === null ? 1 : goal === null ? 2 : 3;
  const results = need && goal ? recommend(need, goal) : [];

  const option = (active: boolean) =>
    cn(
      "flex items-center gap-3 rounded-2xl border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-soft",
      active ? "border-primary ring-2 ring-primary/30" : "border-border",
    );

  return (
    <section id="bio-match" className="scroll-mt-24">
      <div className="bio-match-shell grain overflow-hidden rounded-[2rem] text-white shadow-lift">
        <div className="relative z-10 grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <span className="eyebrow bio-match-accent">{tr(t.quiz.eyebrow)}</span>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl">{tr(t.quiz.title)}</h2>
            <p className="mt-4 max-w-md text-white/80">{tr(t.quiz.sub)}</p>
            <ol className="mt-8 flex gap-2">
              {[1, 2, 3].map((n) => (
                <li key={n} className={cn("h-1.5 flex-1 rounded-full transition-colors", n <= step ? "bio-match-step-active" : "bg-white/25")} aria-label={`${tr(t.quiz.step)} ${n}`} />
              ))}
            </ol>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">{tr(t.quiz.step)} {step} / 3</p>
          </div>

          <div className="bio-match-panel rounded-3xl p-4 text-foreground sm:p-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="font-display text-xl">{tr(t.quiz.q1)}</h3>
                  <div className="mt-4 grid gap-3">
                    {needs.map(({ id, icon: Icon }) => (
                      <button key={id} type="button" className={option(false)} onClick={() => setNeed(id)}>
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Icon className="h-5 w-5" /></span>
                        <span className="font-medium">{tr(t.quiz.what[id])}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="font-display text-xl">{tr(t.quiz.q2)}</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {goals.map(({ id, icon: Icon }) => (
                      <button key={id} type="button" className={option(false)} onClick={() => setGoal(id)}>
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Icon className="h-5 w-5" /></span>
                        <span className="font-medium">{tr(t.quiz.goals[id])}</span>
                      </button>
                    ))}
                  </div>
                  <button type="button" onClick={() => setNeed(null)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" /> {tr(t.quiz.back)}
                  </button>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="font-display text-xl">{tr(t.quiz.q3)}</h3>
                  <div className="mt-4 grid gap-3">
                    {results.map((p, i) => (
                      <motion.button
                        key={p.id}
                        type="button"
                        onClick={() => setOpen(p)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-border bg-card p-2.5 text-left hover:shadow-soft"
                      >
                        <img src={p.image} alt="" width={816} height={816} loading="lazy" className="h-16 w-16 rounded-xl object-cover" />
                        <span className="min-w-0">
                          <span className="block truncate font-medium">{tr(p.name)}</span>
                          <span className="block text-sm text-muted-foreground line-clamp-2">{tr(p.short)}</span>
                        </span>
                      </motion.button>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{tr(t.quiz.resultNote)}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a href={`tel:${STORE.phoneTel}`} className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground">
                      <Phone className="h-4 w-4" /> {tr(t.quiz.askInStore)}
                    </a>
                    <button type="button" onClick={() => { setNeed(null); setGoal(null); }} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
                      <RotateCcw className="h-4 w-4" /> {tr(t.quiz.restart)}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <ProductQuickView product={open} onClose={() => setOpen(null)} />
    </section>
  );
}
