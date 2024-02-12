export interface iTasks {
  _id: string;
  title: string;
  description: string;
  completedTask: boolean;
}

export interface iTaskData extends Omit<iTasks, '_id'> {}

export interface iMyState {
  responseData: iTasks[];
  error: string;
}

export interface iMyStateGetById {
  responseData: iTasks;
  error: string;
}
