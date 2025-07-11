export interface Project {
  title: string;
  href: string;
  dates: string;
  active: boolean;
  description: string;
  technologies: string[];
  links: {
    type: string;
    href: string;
    icon: React.ReactNode;
  }[];
  image: string;
  video?: string;
}

export interface WorkExperience {
  company: string;
  href: string;
  badges: string[];
  location?: string;
  title: string;
  logoUrl: string;
  start: string;
  end?: string;
  description: string;
}

export interface Education {
  school: string;
  href: string;
  degree: string;
  logoUrl: string;
  start: string;
  end: string;
}

export interface Hackathon {
  title: string;
  dates: string;
  location?: string;
  description: string;
  image: string;
  links: {
    title: string;
    href: string;
    icon: React.ReactNode;
  }[];
}

export interface Tweet {
  id: string;
  title: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  navbar: boolean;
}

export interface Contact {
  email: string;
  tel: string;
  social: {
    [key: string]: SocialLink;
  };
}

export interface NavbarItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export interface PortfolioData {
  name: string;
  initials: string;
  url: string;
  location: string;
  locationLink: string;
  description: string;
  summary: string;
  avatarUrl: string;
  skills: string[];
  navbar: NavbarItem[];
  contact: Contact;
  work: WorkExperience[];
  education: Education[];
  projects: Project[];
  hackathons: Hackathon[];
  tweets: Tweet[];
} 