import { z } from 'zod';

// Validation schemas
export const ProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  href: z.string().url('Must be a valid URL'),
  dates: z.string().min(1, 'Dates are required'),
  active: z.boolean(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  links: z.array(z.object({
    type: z.string(),
    href: z.string().url('Must be a valid URL'),
    icon: z.any(), // React component
  })),
  image: z.string().min(1, 'Image path is required'),
  video: z.string().optional(),
});

export const WorkExperienceSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  href: z.string().url('Must be a valid URL'),
  badges: z.array(z.string()),
  location: z.string().optional(),
  title: z.string().min(1, 'Job title is required'),
  logoUrl: z.string().min(1, 'Logo URL is required'),
  start: z.string().min(1, 'Start date is required'),
  end: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

export const EducationSchema = z.object({
  school: z.string().min(1, 'School name is required'),
  href: z.string().url('Must be a valid URL'),
  degree: z.string().min(1, 'Degree is required'),
  logoUrl: z.string().min(1, 'Logo URL is required'),
  start: z.string().min(1, 'Start date is required'),
  end: z.string().min(1, 'End date is required'),
});

export const HackathonSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  dates: z.string().min(1, 'Dates are required'),
  location: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image: z.string().min(1, 'Image path is required'),
  links: z.array(z.object({
    title: z.string(),
    href: z.string().url('Must be a valid URL'),
    icon: z.any(), // React component
  })),
});

export const TweetSchema = z.object({
  id: z.string().min(1, 'Tweet ID is required'),
  title: z.string().min(1, 'Title is required'),
});

export const SocialLinkSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  url: z.string().url('Must be a valid URL'),
  icon: z.any(), // React component
  navbar: z.boolean(),
});

export const ContactSchema = z.object({
  email: z.string().email('Must be a valid email'),
  tel: z.string().min(1, 'Phone number is required'),
  social: z.record(z.string(), SocialLinkSchema),
});

export const NavbarItemSchema = z.object({
  href: z.string().min(1, 'Href is required'),
  icon: z.any(), // React component
  label: z.string().min(1, 'Label is required'),
});

export const PortfolioDataSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  initials: z.string().min(1, 'Initials are required'),
  url: z.string().url('Must be a valid URL'),
  location: z.string().min(1, 'Location is required'),
  locationLink: z.string().url('Must be a valid URL'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  avatarUrl: z.string().min(1, 'Avatar URL is required'),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  navbar: z.array(NavbarItemSchema),
  contact: ContactSchema,
  work: z.array(WorkExperienceSchema),
  education: z.array(EducationSchema),
  projects: z.array(ProjectSchema),
  hackathons: z.array(HackathonSchema),
  tweets: z.array(TweetSchema),
});

// Validation functions
export const validateProject = (data: unknown) => {
  return ProjectSchema.safeParse(data);
};

export const validateWorkExperience = (data: unknown) => {
  return WorkExperienceSchema.safeParse(data);
};

export const validateEducation = (data: unknown) => {
  return EducationSchema.safeParse(data);
};

export const validateHackathon = (data: unknown) => {
  return HackathonSchema.safeParse(data);
};

export const validateTweet = (data: unknown) => {
  return TweetSchema.safeParse(data);
};

export const validatePortfolioData = (data: unknown) => {
  return PortfolioDataSchema.safeParse(data);
};

// Utility function to validate all data
export const validateAllData = (data: unknown) => {
  const result = validatePortfolioData(data);
  
  if (!result.success) {
    console.error('Data validation failed:', result.error);
    return false;
  }
  
  return true;
}; 