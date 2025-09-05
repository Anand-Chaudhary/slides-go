type PPTPage = {
  pageNo: number;
  title: string;
  description: string;
  points: string[];
  imageUrl?: string;
};

export type PPT = {
  _id: string;
  title: string;
  pages: PPTPage[];
  slug?: string;
};

export interface TemplateProps {
  ppt: PPT;
}