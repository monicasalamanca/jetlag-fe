export type BlogCountryResponse = {
  id: number;
  attributes: {
    name: string;
    tagline?: string;
    intro?: string;
    continent: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

export type BlogCountriesData = {
  data: BlogCountryResponse[];
};

export type Tag = {
  id: number;
  attributes: {
    name: string;
    slug: string;
    group: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

export type Tags = {
  data: Tag[];
};

export type Format = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInbytes: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
};
export type Formats = {
  large?: Format;
  small?: Format;
  medium?: Format;
  thumbnail?: Format;
};
export type Image = {
  id: string;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: Formats;
  };
};
export type Images = {
  data: Image[];
};

export type CountriesResponse = {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    tagline: string;
    intro: string;
    continent: string;
    slug: string;
    quickfacts: QuickFact[];
    deepInfo: DeepInfo[];
  };
};

export type Country = {
  id: number;
  name: string;
  slug: string;
  continent: string;
  tagline: string;
  intro: string;
  quickFacts: QuickFact[];
  deepInfo: DeepInfo[];
};

export type CountryName = {
  id: number;
  attributes: {
    slug: string;
    updatedAt: string;
  };
};

export type CountryNameFormatted = {
  id: number;
  slug: string;
  updatedAt: string;
};

export type QuickFact = {
  id: number;
  label: string;
  description: string;
  icon: string;
};

export type DeepInfo = {
  id: number;
  name: string;
  icon: string;
  description: string;
  keywords: string;
  image: string;
};

export type BlogPostResponse = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    content: string;
    views: number;
    lifestyle?: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    tags?: Tags;
    images?: Images;
    country?: {
      data?: {
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
  };
};

export type BlogPost = {
  id: number;
  title: string;
  description: string;
  content: string;
  views: number;
  lifestyle?: boolean;
  publishedAt: string;
  imageUrl: string;
  country?: string; // Single country from oneToMany relationship
  slug: string;
  tags: string[]; // Processed tag names from the relational data
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  publishedAt: string;
  views: number;
  imageUrl?: string;
};

export type Destination = {
  id: number;
  name: string;
  continent: string;
};

export type GroupedCountries = {
  [continent: string]: string[];
};

export type ContactUsInfo = {
  name: string;
  email: string;
  message: string;
};

export type SlugsResponseWithCountry = {
  id: number;
  attributes: {
    slug: string;
    updatedAt: string;
    country: {
      data: {
        id: number;
        attributes: {
          slug: string;
        };
      };
    };
  };
};

export type SlugWithCountry = {
  id: number;
  slug: string;
  updatedAt: string;
  countrySlug: string;
};

export type SlugsResponseForLifestyle = {
  id: number;
  attributes: {
    slug: string;
    updatedAt: string;
  };
};

export type SlugForLifestyle = {
  id: number;
  slug: string;
  updatedAt: string;
};
