export interface Boat {
  id: string;
  name: string;
  series: string;
  slug: string;
  tagline: string;
  description: string;
  length_ft: number;
  top_speed_kts: number;
  horsepower: number;
  range_nm: number;
  engine_config: string;
  category: 'performance' | 'heritage' | 'stealth' | 'custom';
  badge_label: string;
  image_url: string;
  gallery_urls: string[];
  specs: Record<string, string>;
  price_on_request: boolean;
  featured: boolean;
  created_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  boat_id: string | null;
  boat_name: string | null;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface CreateInquiryDto {
  name: string;
  email: string;
  phone: string;
  message?: string;
  boat_id?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: { field: string; message: string }[];
}
