export interface PPTPage {
  pageNo: number;
  title: string;
  description: string;
  points: string[];
  imageUrl?: string;
}

export interface PPT {
  _id: string;
  title: string;
  pages: PPTPage[];
  slug: string;
}

export interface SavedPPTData {
  ppt: PPT;
  slug: string;
}