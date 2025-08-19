declare module '@google/generative-ai' {
  export class GoogleGenerativeAI {
    constructor(apiKey: string)
    getGenerativeModel(config: Record<string, unknown>): GenerativeModel
  }

  export interface GenerateContentResult {
    response: { text(): string }
  }

  export interface GenerativeModel {
    generateContent(prompt: string): Promise<GenerateContentResult>
  }

  export enum HarmCategory {
    HARM_CATEGORY_HARASSMENT = 'HARM_CATEGORY_HARASSMENT',
    HARM_CATEGORY_HATE_SPEECH = 'HARM_CATEGORY_HATE_SPEECH',
    HARM_CATEGORY_SEXUALLY_EXPLICIT = 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
    HARM_CATEGORY_DANGEROUS_CONTENT = 'HARM_CATEGORY_DANGEROUS_CONTENT',
  }

  export enum HarmBlockThreshold {
    BLOCK_MEDIUM_AND_ABOVE = 'BLOCK_MEDIUM_AND_ABOVE',
  }
}
