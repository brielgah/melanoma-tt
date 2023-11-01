export interface RequestOptions<Model, Params> {
  body: Model;
  params: Params;
}

export interface ApiResult {
  result: boolean;
  message: string;
}
