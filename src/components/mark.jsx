import React from 'react';

export const Mark = ({ name, keyword }) => {
  if (!keyword) {
    return <>{ name }</>
  }
  const arr = name.split(keyword)
  return <>
    {
      arr.map((str, index) => <span key={index}>
        { str }
        {
          index === arr.length - 1 ? null : <span style={{color: '#2571FD'}}>{ keyword }</span>
        }
      </span>)
    }
  </>
}