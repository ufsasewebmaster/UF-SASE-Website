export interface Blog {
  id: string;
  title: string;
  content: string;
  author_id?: string;
  published_date: Date;
  time_updated: Date;
  last_update_date?: string;
  tags?: string;
}
