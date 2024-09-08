import type { FC } from 'react';
import MathJax from 'react-mathjax';

import styles from './index.module.css';

const Description: FC = () => (
  <>
    <h1>Graph Visualizer</h1>
    <span>
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
    </span>
    <MathJax.Provider>
      <span>
        In Fruchterman&mdash;Reingold algorithm, the objective function is
        defined as:
        <MathJax.Node
          formula={
            '\\sum_{i,j}\\left(\\frac{a_{i,j} d_{i,j}^3}{3k} - k^2\\log{d_{i,j}}\\right)'
          }
        />
        where
        <MathJax.Node
          inline
          formula={'\\: d_{i,j} = \\sqrt{(x_i - x_j)^2+(y_i - y_j)^2}.'}
        />
      </span>
      <details>
        <summary>Output format</summary>
        <pre
          className={styles.inputStylePre} //eslint-disable-line
        >
          <MathJax.Node inline formula={'N \\: M \\: k'} />
          <br></br>
          <MathJax.Node inline formula={'u_1 \\: v_1 \\: a_{u_1,v_1}'} />
          <br></br>
          <MathJax.Node inline formula={'\\dots'} />
          <br></br>
          <MathJax.Node inline formula={'u_M \\: v_M \\: a_{u_M,v_M}'} />
          <br></br>
          <MathJax.Node inline formula={'t'} />
          <br></br>
          <MathJax.Node inline formula={'x_{1,1} \\: y_{1,1}'} />
          <br></br>
          <MathJax.Node inline formula={'\\dots'} />
          <br></br>
          <MathJax.Node inline formula={'x_{t,N} \\: y_{t,N}'} />
        </pre>
      </details>
    </MathJax.Provider>
  </>
);

export default Description;
