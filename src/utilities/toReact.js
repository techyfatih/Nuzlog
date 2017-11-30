import React from 'react';

export default text => {
  if (text && !text.split) text = JSON.stringify(text);
  return text ? text.split('\n').map((line, index) => (
    <span key={index}>{index != 0 ? <br/> : ''}
      {line}
    </span>
  )) : '';
};