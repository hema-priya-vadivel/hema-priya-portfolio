import { SocialIcons } from "./social-links";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-4 px-5 py-8 text-sm text-muted sm:px-8">
        <p>
          Built with <span aria-label="love" role="img" className="text-accent">♥</span> by Hema · ©{" "}
          {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-5">
          <SocialIcons />
          <a href="#" className="hover:text-foreground">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
