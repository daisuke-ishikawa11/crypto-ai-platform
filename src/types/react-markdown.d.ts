declare module 'react-markdown' {
  import { ReactNode } from 'react';

  export interface ReactMarkdownProps {
    children: string;
    className?: string;
  }

  export default function ReactMarkdown(props: ReactMarkdownProps): ReactNode;
} 