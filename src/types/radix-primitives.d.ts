// Minimal Radix UI primitive type declarations to ensure className and children are allowed
// NOTE: These are intentionally lightweight to unblock type-check; refine as real types if needed.
import * as React from "react"

declare module '@radix-ui/react-tabs' {
  export interface TabsRootProps extends React.ComponentPropsWithoutRef<'div'> {
    className?: string
    children?: React.ReactNode
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
  }
  export interface TabsListProps extends React.ComponentPropsWithoutRef<'div'> {
    className?: string
    children?: React.ReactNode
  }
  export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
    className?: string
    children?: React.ReactNode
    value: string
    disabled?: boolean
  }
  export interface TabsContentProps extends React.ComponentPropsWithoutRef<'div'> {
    className?: string
    children?: React.ReactNode
    value: string
    forceMount?: boolean
  }

  export const Root: React.FC<TabsRootProps>
  export const List: React.ForwardRefExoticComponent<TabsListProps & React.RefAttributes<HTMLDivElement>>
  export const Trigger: React.ForwardRefExoticComponent<TabsTriggerProps & React.RefAttributes<HTMLButtonElement>>
  export const Content: React.ForwardRefExoticComponent<TabsContentProps & React.RefAttributes<HTMLDivElement>>
}

declare module '@radix-ui/react-switch' {
  export type SwitchProps = React.ComponentPropsWithoutRef<'button'> & { className?: string; children?: React.ReactNode; checked?: boolean; onCheckedChange?: (checked: boolean) => void }
  export type SwitchThumbProps = React.ComponentPropsWithoutRef<'span'> & { className?: string; children?: React.ReactNode }
  export const Root: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>
  export const Thumb: React.ForwardRefExoticComponent<SwitchThumbProps & React.RefAttributes<HTMLSpanElement>>
}

declare module '@radix-ui/react-tooltip' {
  export interface TooltipProviderProps extends React.PropsWithChildren {
    delayDuration?: number
    skipDelayDuration?: number
    disableHoverableContent?: boolean
    children?: React.ReactNode
  }

  export interface TooltipRootProps extends React.PropsWithChildren {
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
    delayDuration?: number
    disableHoverableContent?: boolean
    children?: React.ReactNode
  }

  export interface TooltipTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
    asChild?: boolean
    children?: React.ReactNode
  }

  export interface TooltipContentProps extends React.ComponentPropsWithoutRef<'div'> {
    side?: 'top' | 'right' | 'bottom' | 'left'
    sideOffset?: number
    align?: 'start' | 'center' | 'end'
    alignOffset?: number
    avoidCollisions?: boolean
    collisionPadding?: number | { top?: number; right?: number; bottom?: number; left?: number }
    arrowPadding?: number
    sticky?: 'partial' | 'always'
    hideWhenDetached?: boolean
    onEscapeKeyDown?: (event: KeyboardEvent) => void
    onPointerDownOutside?: (event: Event) => void
    onFocusOutside?: (event: Event) => void
    onInteractOutside?: (event: Event) => void
    asChild?: boolean
    children?: React.ReactNode
  }

  export const Provider: React.FC<TooltipProviderProps>
  export const Root: React.FC<TooltipRootProps>
  export const Trigger: React.ForwardRefExoticComponent<TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>
  export const Content: React.ForwardRefExoticComponent<TooltipContentProps & React.RefAttributes<HTMLDivElement>>
}

declare module '@radix-ui/react-dropdown-menu' {
  export interface DropdownMenuRootProps extends React.PropsWithChildren {
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
    modal?: boolean
    dir?: 'ltr' | 'rtl'
    children?: React.ReactNode
  }
  export const Root: React.FC<DropdownMenuRootProps>
  export interface DropdownMenuTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
    asChild?: boolean
    children?: React.ReactNode
  }
  export const Trigger: React.ForwardRefExoticComponent<DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>>
  export interface DropdownMenuContentProps extends React.ComponentPropsWithoutRef<'div'> {
    side?: 'top' | 'right' | 'bottom' | 'left'
    sideOffset?: number
    align?: 'start' | 'center' | 'end'
    alignOffset?: number
    avoidCollisions?: boolean
    collisionPadding?: number | { top?: number; right?: number; bottom?: number; left?: number }
    arrowPadding?: number
    sticky?: 'partial' | 'always'
    hideWhenDetached?: boolean
    onEscapeKeyDown?: (event: KeyboardEvent) => void
    onPointerDownOutside?: (event: Event) => void
    onFocusOutside?: (event: Event) => void
    onInteractOutside?: (event: Event) => void
    asChild?: boolean
    children?: React.ReactNode
    className?: string
  }
  export const Content: React.ForwardRefExoticComponent<DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>>
  export interface DropdownMenuSubProps extends React.PropsWithChildren {
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
    children?: React.ReactNode
  }
  export const Sub: React.FC<DropdownMenuSubProps>
  export interface DropdownMenuSubTriggerProps extends React.ComponentPropsWithoutRef<'div'> {
    asChild?: boolean
    children?: React.ReactNode
    className?: string
  }
  export const SubTrigger: React.ForwardRefExoticComponent<DropdownMenuSubTriggerProps & React.RefAttributes<HTMLDivElement>>
  export const SubContent: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>>

  export interface DropdownMenuGroupProps extends React.ComponentPropsWithoutRef<'div'> {
    children?: React.ReactNode
    asChild?: boolean
  }
  export const Group: React.FC<DropdownMenuGroupProps>

  export interface DropdownMenuPortalProps {
    children?: React.ReactNode
    container?: HTMLElement
    forceMount?: boolean
  }
  export const Portal: React.FC<DropdownMenuPortalProps>

  export interface DropdownMenuRadioGroupProps extends React.ComponentPropsWithoutRef<'div'> {
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
    children?: React.ReactNode
    asChild?: boolean
  }
  export const RadioGroup: React.FC<DropdownMenuRadioGroupProps>

  export const Item: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & { asChild?: boolean; checked?: boolean } & React.RefAttributes<HTMLDivElement>>
  export const CheckboxItem: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & { checked?: boolean; onCheckedChange?: (checked: boolean) => void; children?: React.ReactNode } & React.RefAttributes<HTMLDivElement>>
  export const RadioItem: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>>
  export const Label: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & { className?: string } & React.RefAttributes<HTMLDivElement>>
  export const Separator: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>>
  export const ItemIndicator: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'span'> & React.RefAttributes<HTMLSpanElement>>
}

declare module '@radix-ui/react-select' {
  export interface SelectRootProps extends React.ComponentPropsWithoutRef<'div'> {
    className?: string
    children?: React.ReactNode
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
  }
  export interface SelectItemProps extends React.ComponentPropsWithoutRef<'div'> {
    value: string
    children?: React.ReactNode
    className?: string
  }
  export interface SelectGroupProps extends React.ComponentPropsWithoutRef<'div'> {
    className?: string
    children?: React.ReactNode
  }
  export interface SelectValueProps extends React.ComponentPropsWithoutRef<'span'> {
    className?: string
    children?: React.ReactNode
  }
  export const Root: React.FC<SelectRootProps>
  export const Group: React.FC<SelectGroupProps>
  export const Value: React.FC<SelectValueProps>
  export const Trigger: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'button'> & { className?: string; children?: React.ReactNode } & React.RefAttributes<HTMLButtonElement>>
  export const Icon: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'span'> & { asChild?: boolean; className?: string; children?: React.ReactNode } & React.RefAttributes<HTMLSpanElement>>
  export interface SelectPortalProps {
    children?: React.ReactNode
    container?: HTMLElement
    forceMount?: boolean
  }
  export const Portal: React.FC<SelectPortalProps>
  export const Content: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & { position?: 'popper'|'item-aligned'; side?: 'top'|'right'|'bottom'|'left' } & React.RefAttributes<HTMLDivElement>>
  export const Viewport: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>>
  export const ScrollUpButton: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>>
  export const ScrollDownButton: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>>
  export const Label: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>>
  export const Item: React.ForwardRefExoticComponent<SelectItemProps & React.RefAttributes<HTMLDivElement>>
  export interface ItemTextProps {
    children?: React.ReactNode
    className?: string
  }
  export const ItemText: React.FC<ItemTextProps>
  export const ItemIndicator: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'span'> & React.RefAttributes<HTMLSpanElement>>
  export const Separator: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>>
}

declare module '@radix-ui/react-scroll-area' {
  export type ScrollAreaProps = React.ComponentPropsWithoutRef<'div'>
  export type ScrollAreaViewportProps = React.ComponentPropsWithoutRef<'div'>
  export type ScrollAreaScrollbarProps = React.ComponentPropsWithoutRef<'div'> & { orientation?: 'vertical' | 'horizontal' }
  export type ScrollAreaThumbProps = React.ComponentPropsWithoutRef<'div'>

  export const Root: React.ForwardRefExoticComponent<ScrollAreaProps & React.RefAttributes<HTMLDivElement>>
  export const Viewport: React.ForwardRefExoticComponent<ScrollAreaViewportProps & React.RefAttributes<HTMLDivElement>>
  export const ScrollAreaScrollbar: React.ForwardRefExoticComponent<ScrollAreaScrollbarProps & React.RefAttributes<HTMLDivElement>>
  export const ScrollAreaThumb: React.ForwardRefExoticComponent<ScrollAreaThumbProps & React.RefAttributes<HTMLDivElement>>
  export const Corner: React.FC<Record<string, unknown>>
}

declare module '@radix-ui/react-radio-group' {
  export type RadioGroupProps = React.ComponentPropsWithoutRef<'div'> & { className?: string; children?: React.ReactNode; value?: string; onValueChange?: (value: string) => void }
  export type RadioGroupItemProps = React.ComponentPropsWithoutRef<'button'> & { className?: string; children?: React.ReactNode }
  export type RadioGroupIndicatorProps = React.ComponentPropsWithoutRef<'span'> & { className?: string }
  export const Root: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>>
  export const Item: React.ForwardRefExoticComponent<RadioGroupItemProps & React.RefAttributes<HTMLButtonElement>>
  export const Indicator: React.ForwardRefExoticComponent<RadioGroupIndicatorProps & React.RefAttributes<HTMLSpanElement>>
}

declare module '@radix-ui/react-separator' {
  export type SeparatorProps = React.ComponentPropsWithoutRef<'div'> & { orientation?: 'horizontal' | 'vertical'; decorative?: boolean }
  export const Root: React.ForwardRefExoticComponent<SeparatorProps & React.RefAttributes<HTMLDivElement>>
}

declare module '@radix-ui/react-label' {
  export type LabelProps = React.ComponentPropsWithoutRef<'label'> & { asChild?: boolean }
  export const Root: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLLabelElement>>
}

declare module '@radix-ui/react-progress' {
  export type ProgressProps = React.ComponentPropsWithoutRef<'div'> & { className?: string; max?: number; getValueLabel?: (value: number, max: number) => string }
  export type ProgressIndicatorProps = React.ComponentPropsWithoutRef<'div'> & { className?: string }
  export const Root: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>
  export const Indicator: React.ForwardRefExoticComponent<ProgressIndicatorProps & React.RefAttributes<HTMLDivElement>>
}

declare module '@radix-ui/react-dialog' {
  export const Root: React.FC<Record<string, unknown>>
  export const Trigger: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'button'> & { asChild?: boolean; className?: string; children?: React.ReactNode } & React.RefAttributes<HTMLButtonElement>>
  export const Portal: React.FC<Record<string, unknown>>
  export const Close: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'button'> & { asChild?: boolean; className?: string; children?: React.ReactNode } & React.RefAttributes<HTMLButtonElement>>
  export const Overlay: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & { className?: string; children?: React.ReactNode } & React.RefAttributes<HTMLDivElement>>
  export const Content: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & { className?: string; children?: React.ReactNode } & React.RefAttributes<HTMLDivElement>>
  export const Title: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'h2'> & { className?: string; children?: React.ReactNode } & React.RefAttributes<HTMLHeadingElement>>
  export const Description: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'p'> & { className?: string; children?: React.ReactNode } & React.RefAttributes<HTMLParagraphElement>>
}

declare module '@radix-ui/react-checkbox' {
  export type CheckboxProps = React.ComponentPropsWithoutRef<'button'> & { className?: string; children?: React.ReactNode; checked?: boolean; onCheckedChange?: (checked: boolean) => void }
  export type CheckboxIndicatorProps = React.ComponentPropsWithoutRef<'span'> & { className?: string }
  export const Root: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLButtonElement>>
  export const Indicator: React.ForwardRefExoticComponent<CheckboxIndicatorProps & React.RefAttributes<HTMLSpanElement>>
}

declare module '@radix-ui/react-avatar' {
  export type AvatarRootProps = React.ComponentPropsWithoutRef<'span'> & { className?: string; children?: React.ReactNode }
  export type AvatarImageProps = React.ComponentPropsWithoutRef<'img'> & { className?: string }
  export type AvatarFallbackProps = React.ComponentPropsWithoutRef<'span'> & { className?: string; delayMs?: number; children?: React.ReactNode }
  export const Root: React.ForwardRefExoticComponent<AvatarRootProps & React.RefAttributes<HTMLSpanElement>>
  export const Image: React.ForwardRefExoticComponent<AvatarImageProps & React.RefAttributes<HTMLImageElement>>
  export const Fallback: React.ForwardRefExoticComponent<AvatarFallbackProps & React.RefAttributes<HTMLSpanElement>>;
}
