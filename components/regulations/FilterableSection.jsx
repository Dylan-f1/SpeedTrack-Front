'use client'

import { matchesRegulationUnit, useRegulationsFilter } from './regulationsFilterContext'

export default function FilterableSection({
  as: Tag = 'div',
  category,
  searchIndex,
  className = '',
  children,
}) {
  const { filter, query } = useRegulationsFilter()
  const isVisible = matchesRegulationUnit({ category, searchIndex }, filter, query)

  return <Tag className={isVisible ? className : `${className} hidden`}>{children}</Tag>
}
