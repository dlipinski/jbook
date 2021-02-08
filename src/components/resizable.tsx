import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import {useEffect, useState} from 'react';
import './resizable.css';

interface ResizableProps {
	direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * .75);

  useEffect(() => {
    let timer:any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * .75 < width) {
          setWidth(window.innerWidth * .75)
        }
      }, 100)
    
    }
    window.addEventListener('resize', listener)
    return () => {
      window.removeEventListener('resize', listener);
    }
  }, []);

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width,
      minConstraints: [innerWidth * .2, Infinity],
      maxConstraints: [Infinity, Infinity],
      resizeHandles: ['e'],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      }
    }
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      minConstraints: [Infinity, 100],
      maxConstraints: [Infinity, innerHeight * 0.9],
      resizeHandles: ['s'],
    }
  }
	return (
		<ResizableBox {...resizableProps}>
			{children}
		</ResizableBox>
	);
};

export default Resizable;
