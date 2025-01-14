import { Student } from "./Student";

export interface Event {
  id: string;
  name: string;
  date: string;
  avatar: string;
  description: string;
  participents: Map<String,Student>;
}
