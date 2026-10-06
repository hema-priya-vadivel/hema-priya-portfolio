"use client";

export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-start justify-center px-5">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Error</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="mt-4 text-muted">An unexpected error occurred. Please try again.</p>
      <button onClick={() => retry()} className="mt-8 rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground">
        Try again
      </button>
    </main>
  );
}
