'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';

type Submission = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Submission>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get('name') ?? '').toString().trim();
    const email = (data.get('email') ?? '').toString().trim();
    const type = (data.get('type') ?? '').toString();
    const context = (data.get('context') ?? '').toString().trim();

    // Boundary validation — kept conservative; final validation happens server-side
    const next: Record<string, string> = {};
    if (name.length < 2) next.name = 'A name we can address you by, please.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'A working email so we can reply.';
    }
    if (!type) next.type = 'Pick one — business or individual.';
    if (context.length < 10) {
      next.context = 'A line of context — what would you like to discuss?';
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus('submitting');
    // TODO: wire to a server-side handler (rate-limited, no raw PII logged) —
    // brief §7.6. For now, simulate success.
    setTimeout(() => {
      setStatus('success');
      form.reset();
    }, 700);
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-accent/40 bg-accent/[0.06] p-8">
        <p className="eyebrow text-accent">Received</p>
        <p className="mt-3 font-serif text-2xl tracking-tight">
          Thank you. We’ll be in touch within two working days.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-foreground/75">
          If your matter is urgent, please call or write to one of the
          named email channels listed below.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor="name" className="eyebrow text-foreground/70">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="mt-2"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-err' : undefined}
        />
        {errors.name && (
          <p id="name-err" className="mt-2 text-xs text-red-500/80">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="eyebrow text-foreground/70">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-err' : undefined}
        />
        {errors.email && (
          <p id="email-err" className="mt-2 text-xs text-red-500/80">{errors.email}</p>
        )}
      </div>

      <fieldset>
        <legend className="eyebrow text-foreground/70">
          You’re writing as
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {['Business', 'Individual'].map((opt) => (
            <label
              key={opt}
              className="flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-foreground/15 px-4 text-sm text-foreground/80 transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent has-[:checked]:text-background"
            >
              <input
                type="radio"
                name="type"
                value={opt.toLowerCase()}
                className="sr-only"
                required
              />
              {opt}
            </label>
          ))}
        </div>
        {errors.type && (
          <p className="mt-2 text-xs text-red-500/80">{errors.type}</p>
        )}
      </fieldset>

      <div>
        <label htmlFor="context" className="eyebrow text-foreground/70">
          A line of context
        </label>
        <textarea
          id="context"
          name="context"
          rows={4}
          required
          className="mt-2"
          placeholder="What would you like to talk about?"
          aria-invalid={Boolean(errors.context)}
          aria-describedby={errors.context ? 'context-err' : undefined}
        />
        {errors.context && (
          <p id="context-err" className="mt-2 text-xs text-red-500/80">
            {errors.context}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send to the firm'}
        <ArrowUpRight size={16} strokeWidth={1.8} />
      </button>

      <p className="text-xs text-foreground/55">
        Your message is sent to the firm via secure email. We do not share
        it with third parties or use it for marketing.
      </p>
    </form>
  );
}
