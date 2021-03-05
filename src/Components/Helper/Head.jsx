/* eslint-disable prefer-template */
import React, { useEffect } from 'react';

const Head = (props) => {
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    document.title = props.title + ' | Burger';
    document
      .querySelector("meta[name='description']")
      // eslint-disable-next-line react/prop-types
      .setAttribute('content', props.description || '');
  }, [props]);

  return <></>;
};

export default Head;
