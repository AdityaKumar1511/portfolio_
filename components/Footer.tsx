const footerLinks = [
  { name: "GitHub", url: "https://github.com/AdityaKumar1511" },
  { name: "LeetCode", url: "https://leetcode.com/AdityaKumar1511" },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/aditya-kumar-57a988374/",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-6 px-6 md:px-12 lg:px-24">
      <div className="flex justify-between items-center">
        <span className="font-mono text-[12px] text-[var(--text-muted)]">
          Aditya Kumar · Patna, IN
        </span>
        <div className="flex items-center gap-4">
          {footerLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
