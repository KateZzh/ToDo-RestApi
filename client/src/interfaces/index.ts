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

export interface iMyState {
  responseData: iTasks[];
  error: string;
}

export interface iInp {
  title: string;
  description: string;
  completedTask: boolean;
  [key: string]: string | boolean;
}

export interface iArrayInp {
  name: string;
  placeholder: string;
}
