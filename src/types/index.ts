export interface User {
  username: string;
  role: string;
}

export type EducationLevel = 'PAUD' | 'SD' | 'SMP';

export interface RaporData {
  level: EducationLevel;
  fileName: string;
  uploadDate: string;
  summary: {
    literacy: number;
    numeracy: number;
    character: number;
    environment: number;
  };
}
