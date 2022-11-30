import { useRef, useEffect, HTMLProps } from 'react'
function IndeterminateCheckbox({
  indeterminate,
  className = '',
  checked,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !checked && indeterminate
    }
  }, [ref, indeterminate, checked])

  return (
    <input
      type='checkbox'
      ref={ref}
      className={className + ' cursor-pointer'}
      checked={checked}
      {...rest}
    />
  )
}

export { IndeterminateCheckbox }
