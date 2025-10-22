export interface Project {
  id: string;
  name: string;
  type: 'Portfolio' | 'Blog' | 'E-commerce' | 'Startup' | string;
  features: string[];
  status: 'Queued' | 'In Progress' | 'Delivered';
  previewUrl: string;
}
