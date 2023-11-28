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
