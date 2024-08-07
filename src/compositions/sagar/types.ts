export type Step = {
  title: string;
  children: Record<string, unknown>;
  code: {
    meta: string;
    value: string;
    lang: string;
    code: string;
    tokens: Array<string | string[]>;
    annotations: Array<{
      name: string;
      query: string;
      lineNumber: number;
      fromColumn: number;
      toColumn: number;
    }>;
    themeName: string;
    style: Record<string, string>;
  };
  duration: number;
};
