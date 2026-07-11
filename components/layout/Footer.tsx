import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-6 px-6 md:px-12 lg:px-24">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-mono text-[12px] text-[var(--text-muted)]">
          Aditya Kumar · Patna, IN
        </p>
        <div className="flex items-center gap-6">
          <Link href="https://github.com/AdityaKumar1511" target="_blank"
                className="font-mono text-[12px] text-[var(--text-muted)] hover:text-[var(--text)] 
                           transition-colors">
            GitHub
          </Link>
          <Link href="https://linkedin.com/in/aditya-kumar-57a988374/" target="_blank"
                className="font-mono text-[12px] text-[var(--text-muted)] hover:text-[var(--text)] 
                           transition-colors">
            LinkedIn
          </Link>
          <Link href="mailto:aditya.kumar00706@gmail.com"
                className="font-mono text-[12px] text-[var(--text-muted)] hover:text-[var(--text)] 
                           transition-colors">
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
