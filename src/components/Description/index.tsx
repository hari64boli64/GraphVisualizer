import type { FC } from 'react';
import MathJax from 'react-mathjax';

const Description: FC = () => (
  <div>
    <div>
      <h1>Graph Visualizer</h1>
      <p>
        The Objective function is defined as:
      </p>
      <p>
        <MathJax.Provider>
          <MathJax.Node formula={'f(x) = \\sum_{i,j}\\left(\\frac{a_{i,j} d^3}{3k} - k^2\\log{d}\\right)'} />
        </MathJax.Provider>
      </p>
    </div>
    GitHub repository:{' '}
    <a href="https://github.com/hari64boli64/GraphVisualizer">
      <img
        style={{
          width: '25px',
          height: '25px',
          verticalAlign: 'middle',
        }}
        src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
        alt="GitHub"
      />
    </a>
  </div>
);

export default Description;
