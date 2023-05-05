export interface Summary {
  title: string;
  subtitle?: string;
  summaries: Array<{
    title: string;
    value: number;
  }>;
}
