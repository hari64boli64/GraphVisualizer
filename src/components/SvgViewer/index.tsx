import type { FC } from 'react';

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
    </>
  );
};

export default SvgViewer;
