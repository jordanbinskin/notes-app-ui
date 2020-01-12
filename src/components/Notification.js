import React from 'react';

export const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const baseStyle = {
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  }

  console.log('type')


  type == 'error' ? baseStyle.color = 'red' : baseStyle.color = 'green';

  return (
    <div style={baseStyle}>
      {message}
    </div>
  )
}