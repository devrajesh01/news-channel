import { NormalizedComment } from "@/app/lib/api/normalize";

export type Comment = NormalizedComment & {
  replies?: Comment[];
};