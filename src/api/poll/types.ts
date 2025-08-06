export interface PollOption {
  id: number;
  label: string;
  votes: number;
}

export interface Poll {
  id: number;
  slug: string;
  question: string;
  status: "draft" | "live" | "archived";
  options: PollOption[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  publishedAt?: string;
  updatedAt?: string;
}

// API Response Types
export interface PollOptionResponse {
  id: number;
  label: string;
  votes: number;
}

export interface PollDataResponse {
  id: number;
  attributes: {
    slug: string;
    question: string;
    status: "draft" | "live" | "archived";
    options: PollOptionResponse[];
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonText: string;
    publishedAt?: string;
    updatedAt?: string;
  };
}

export interface PollApiResponse {
  data: PollDataResponse;
  meta?: Record<string, unknown>;
}

export interface PollsApiResponse {
  data: PollDataResponse[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Vote Types
export interface VoteRequest {
  optionId: number;
  metadata?: {
    timestamp?: number;
    userAgent?: string;
    referrer?: string;
  };
}

export interface VoteResponse {
  success: boolean;
  message: string;
  poll?: Poll;
  error?: string;
}

// API Error Type
export interface ApiError {
  error: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, unknown>;
  };
}
