export class ReadAttributesDto {
  response?: {
    id: string;
    name: string;
    subAttrs?: {
      id: string;
      value: string;
    }[];
  }[];
  error?: string;
  message?: string;
}
