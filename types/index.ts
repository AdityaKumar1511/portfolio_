export interface Project {
  slug: string;
  name: string;
  description: string;
  thumbnail: string;
  tech: string[];
  impact: string;
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
  category: string;
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
}

export interface TerminalCommand {
  command: string;
  description: string;
  output: string;
}
