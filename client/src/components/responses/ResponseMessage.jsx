import React from 'react'

const ResponseMessage = ({backgroundColor, color, message}) => {
  
  const styles= {
    padding: '5px',
    width: '100%',
    border: `1px solid ${color}`,
    color: color,
    fontSize: '100%',
    textAlign: 'center',
    backgroundColor: backgroundColor
  }

  return (
    <div style={styles}>
      {message}
    </div>
  )
}

export default ResponseMessage