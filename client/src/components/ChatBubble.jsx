import React from 'react'

import '../css/ChatBubble.css'

const ChatBubble = ({message, align}) => {
  return (
    <div className={`chatBubble__main ${align}`}>{message}</div>
  )
}

export default ChatBubble