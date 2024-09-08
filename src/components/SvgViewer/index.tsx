import type { FC } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

type SvgViewerProps = {
  svgString1: string;
  svgString2: string;
  err: string;
  score: number;
  scores: Float64Array;
};

const SvgViewer: FC<SvgViewerProps> = ({
  svgString1,
  svgString2,
  err,
  score,
  scores,
}) => {
  const data = [];
  let startIdx = 0;
  if (scores.length > 100) startIdx = 10;
  for (let i = startIdx; i < scores.length; i++) {
    data.push({ name: i, value: scores[i] });
  }

  return (
    <>
      <div>
        score={score.toFixed(5)}{' '}
        {err && <span style={{ color: 'red' }}>({err})</span>}
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: svgString1,
        }}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: svgString2,
        }}
      />

      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, bottom: 5, left: 30 }}
      >
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis tickMargin={30} />
      </LineChart>
    </>
  );
};

export default SvgViewer;
