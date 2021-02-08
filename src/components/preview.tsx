import { useEffect, useRef } from 'react';
import './preview.css';

interface PreviewProps {
  code: string;
  bundlingError: string;
}

const html = `
<html>
  <head>
  <style>
  html {
    background: #fff;
  }
  </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (err) => {
        const root = document.querySelector("#root");
        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
      }
      window.addEventListener('error', (event) => {
        handleError(event.message);
      });
      window.addEventListener('message', (event) => {
        eval(event.data);
      }, false);
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, bundlingError }) => {
	const iframe = useRef<any>();

	useEffect(() => {
    iframe.current.srcDoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50)
	}, [code]);

	return (
		<div className="preview-wrapper">
			<iframe
				title='preview'
				sandbox='allow-scripts'
				srcDoc={html}
				ref={iframe}
			/>
      {bundlingError && <div className="preview-error"><h4>Bundling Error</h4>{bundlingError}</div>}
		</div>
	);
};

export default Preview;
