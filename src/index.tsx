import * as esbuild from 'esbuild-wasm';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
	const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const ref = useRef<any>();

	const startService = async () => {
		ref.current = await esbuild.startService({
			worker: true,
			wasmURL: '/esbuild.wasm',
		}); 
	};

	useEffect(() => {
		startService();
	}, []);

	const onClick = () => {
		if (!ref.current) {
      return;
    }

    console.log(ref.current);
	};

	return (
		<div>
			<textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
			<div>
				<button onClick={onClick}>Submit</button>
			</div>
			<pre>{code}</pre>
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
