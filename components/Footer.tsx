const Footer = () => {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <p className="font-display text-lg font-semibold tracking-wide text-foreground">
          WULIBER<span className="text-primary">.</span>
        </p>
        <p className="text-xs text-muted-foreground tracking-wider">
          © {new Date().getFullYear()} Wulibe car service. All rights reserved.
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">Privacy</a>
          <a href="#" className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
