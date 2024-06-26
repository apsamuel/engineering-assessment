import { useLayoutEffect, useState } from 'react';

export default function useParent(id = 'root') {
  // x, y
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  const [elementSize, setElementSize] = useState([window.innerWidth, window.innerHeight]);
  const [parentSize, setParentSize] = useState([window.innerWidth, window.innerHeight]);



  useLayoutEffect(() => {

    /*
      gets the parent size of the element with the id passed in
        - 'id' is null/root, all sizes are the same
        - 'id' is not root, return current size of the window, parent, and element (self)
    */
    // id = 'root' by default, root is the root DIV in body
    const element = id === 'root' ? document.getElementById(id).parentElement : document.getElementById(id);
    // if the parent is the body, we need to go one level up for the window/html element
    const parent = element.parentElement
    function updateSize() {
      setWindowSize([window.innerWidth, window.innerHeight]);
      element
        ? setElementSize([element.clientWidth, element.clientHeight])
        : setElementSize([window.innerWidth, window.innerHeight]);
      parent
        ? setParentSize([parent.clientWidth, parent.clientHeight])
        : setParentSize(
          element
            ? [element.clientWidth, element.clientHeight]
            : [window.innerWidth, window.innerHeight]
        );
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [id])

  return {
    windowSize,
    elementSize,
    parentSize
  };
}