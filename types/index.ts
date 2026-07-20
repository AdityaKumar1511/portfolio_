export interface Project {
  slug: string;
  name: string;
  status: string;
  statusLabel: string;
  description: string;
  thumbnail: string | null;
  tech: string[];
  impact: string;
  liveUrl: string | null;
  repoUrl: string;
  featured: boolean;
  category: string;
  year: string;
  heroDescription?: string;
  heroTech?: string[];
}

export interface Skills {
  [category: string]: string[];
}

export interface AchievementItem {
  title: string;
  organization: string;
  description: string;
  date: string;
  link?: string;
  metric?: string;
}

export interface Achievements {
  hackathons: AchievementItem[];
  competitiveProgramming: AchievementItem[];
  openSource: AchievementItem[];
}

export interface Meta {
  name: string;
  tagline: string;
  role: string;
  college: string;
  year: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  openToWork: boolean;
  statusText: string;
  profileImage: string;
  tickerText: string;
  sections: { id: string; label: string }[];
  seo: { title: string; description: string; url: string };
}

export interface TerminalCommand {
  command: string;
  description: string;
  output: string;
}
