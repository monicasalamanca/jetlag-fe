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
export type Category = {
  data: {
    id: number;
    attributes: {
      name: string;
      slug: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
};
export type BlogPostResponse = {
  id: number;
  attributes: {
    title: string;
    description: string;
    content: string;
    likes: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    images?: Images;
    category?: Category;
  };
};

export type BlogPost = {
  id: number;
  title: string;
  description: string;
  content: string;
  likes: number;
  publishedAt: string;
  imageUrl: string;
  category: string;
};

export type Post = {
  id: number;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  likes: number;
};

export type CountriesResponse = {
  id: number;
  attributes: {
    name: string;
    continent: string;
    headline: string;
    description: string;
    mapLink: string;
    language: string;
    power: string;
    currency: string;
    timeZone: string;
    summerTemp: string;
    winterTemp: string;
    springTemp: string;
    automnTemp: string;
    springBestTimeToTravel: string;
    summerBestTimeToTravel: string;
    automnBestTimeToTravel: string;
    winterBestTimeToTravel: string;
    foodDishes: string;
    foodDescription: string;
    religions: string;
    religionDescription: string;
    cultureItems: string;
    cultureDescription: string;
    crimeAndSafetyIndex: number;
    crimeAndSafetyDescription: string;
  };
};

export type Country = {
  id: number;
  name: string;
  continent: string;
  headline: string;
  description: string;
  mapLink: string;
  language: string;
  power: string;
  currency: string;
  timeZone: string;
  summerTemp: string;
  winterTemp: string;
  springTemp: string;
  automnTemp: string;
  springBestTimeToTravel: string;
  summerBestTimeToTravel: string;
  automnBestTimeToTravel: string;
  winterBestTimeToTravel: string;
  foodDishes: string;
  foodDescription: string;
  religions: string;
  religionDescription: string;
  cultureItems: string;
  cultureDescription: string;
  crimeAndSafetyIndex: number;
  crimeAndSafetyDescription: string;
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
