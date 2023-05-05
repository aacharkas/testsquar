import React, { Ref, PropsWithChildren } from 'react'
import classnames from 'classnames';

interface BaseProps {
  className: string
  [key: string]: unknown
}
type OrNull<T> = T | null

export const ActionItem = React.forwardRef(
    (
      {
        className,
        active,
        reversed,
        ...props
      }: PropsWithChildren<
        {
          active: boolean
          reversed: boolean
        } & BaseProps
      >,
      ref: Ref<OrNull<HTMLSpanElement>>
    ) => (
      <span
        {...props}
        ref={ref}
        className={classnames('cursor-pointer',
          className,
          {
            'text-gray-400': !active,
            'text-gray-700': active,
          }
        )}
      />
    )
)

export const Menu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={classnames(
        'flex gap-3',
        className,
      )}
    />
  )
)

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={classnames(
        'relative p-1 mb-2 border-b border-gray-200	',
        className,
      )}
    />
  )
)
