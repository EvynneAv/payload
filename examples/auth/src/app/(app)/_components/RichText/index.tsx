import React from 'react'
import classes from './index.module.scss'
import serialize from './serialize'

type Props = {
  className?: string
  content: Parameters<typeof serialize>[0]
}

const RichText: React.FC<Props> = ({ className, content }) => {
  if (!content) {
    return null
  }

  return (
    <div className={[classes.richText, className].filter(Boolean).join(' ')}>
      {serialize(content)}
    </div>
  )
}

export default RichText
