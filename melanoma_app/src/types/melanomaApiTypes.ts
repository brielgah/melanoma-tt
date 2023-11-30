export interface PostUserResponse {
  id: number;
  userName: string;
}

export interface PostLoginResponse {
  user: PostUserResponse;
}

export interface ApiResponse {
  result: boolean;
  message: string;
}

export interface PostLesionResponse {
  result: boolean;
  message: string;
  id: number;
}

export interface DoctorAssociationRequest {
  userId: number;
  doctorUserName: string;
  lesionId: number;
}

interface FeaturesResult {
  roughness: number;
  color: number;
  symetry: number[];
}

interface Features {
  before: FeaturesResult;
  after: FeaturesResult;
}

interface ImagesResult {
  roughness: string;
  symetry: string;
  color: string;
}

interface Images {
  before: ImagesResult;
  after: ImagesResult;
  compare: ImagesResult;
}

export interface CompareResponse {
  features: Features;
  imgs: Images;
}
