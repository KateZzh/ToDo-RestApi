export interface iTasks {
  _id: string;
  title: string;
  description: string;
  completedTask: boolean;
}

export interface iTaskData {
  title?: string;
  description?: string;
  completedTask: boolean;
}

// export interface iTaskData extends Omit<iTasks, '_id'> {}

export interface iMyState {
  responseData: iTasks[];
  error: string;
}

export interface iMyStateObject {
  data: iTasks;
}

export interface iMyStateGetById {
  responseData: iTasks;
  error: string;
}

export interface iBodyAndId {
  _id: string;
  body: iTaskData;
}
