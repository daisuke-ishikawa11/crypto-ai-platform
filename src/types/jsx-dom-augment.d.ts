import * as React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      className?: string
      children?: React.ReactNode
    }

    // Ensure common intrinsic elements explicitly accept children/className
    interface IntrinsicElements {
      a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & { children?: React.ReactNode; className?: string }
      button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { children?: React.ReactNode; className?: string }
      li: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> & { children?: React.ReactNode; className?: string }
      ol: React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement> & { children?: React.ReactNode; className?: string }
      label: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & { children?: React.ReactNode; className?: string }
      input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { className?: string }
      textarea: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & { className?: string }
      img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & { className?: string }
      table: React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> & { children?: React.ReactNode; className?: string }
      th: React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement> & { children?: React.ReactNode; className?: string }
      td: React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement> & { children?: React.ReactNode; className?: string }
    }
  }
}
