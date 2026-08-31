export interface Photo {
  id: string;
  title: string;
  year: number;
  decade: string;
  category: 'Industry & Business' | 'Transit & Streets' | 'Historic Estates & Architecture' | 'Parks & Nature' | 'Civic Life & People';
  photographer: string;
  accessionNo: string;
  description: string;
  imageUrl: string;
  locationName: string;
  coordinates: { x: number; y: number }; // Percentage coords (0-100) on our custom Hamilton Map
  historicalFact: string;
  tags: string[];
}

export interface Landmark {
  id: string;
  name: string;
  description: string;
  coordinates: { x: number; y: number };
  associatedPhotoIds: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  referencedPhotoId?: string;
}

export interface AudioNarrativeResponse {
  audioBase64?: string;
  textNarrative: string;
}
