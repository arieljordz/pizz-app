export interface IOrder {
  order_id: string;
  date: Date;
  time: Date;
}

export interface ApiResponseModel {
  message: string;
  result: string;
  data: any;
}

export interface ApiRespModel {
  data: any[];
  total: number;
}
