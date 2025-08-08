export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface WebsiteLink {
  id: string;
  title: string;
  url: string;
  description?: string;
}

export interface Profile {
  avatar: string;
  name: string;
  bio: string;
}

export interface ProfileConfig {
  profile: Profile;
  socialLinks: SocialLink[];
  websiteLinks: WebsiteLink[];
}
