import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { get_max_turn as getMaxTurn, vis } from '../../public/wasm/rust';
import type { VisualizerSettingInfo, VisualizerResult } from '../types';
import Description from './Description';
import FileUploader from './FileUploader';
import InputOutput from './InputOutput';
import SaveButtons from './SaveButtons';
import SvgViewer from './SvgViewer';
import TurnSlider from './TurnSlider';

const AHCLikeVisualizer: FC = () => {
  const [visualizerSettingInfo, setVisualizerSettingInfo] =
    useState<VisualizerSettingInfo>({
      output: [
        `3 3 1.0`,
        `0 1 0.0`,
        `1 2 0.0`,
        `2 0 0.0`,
        `1`,
        `0.1 0.1`,
        `0.1 0.9`,
        `0.9 0.1`,
      ].join('\n'),
      turn: 0,
      maxTurn: 0,
      visualizerMode: true,
    });

  const [visualizerResult, setVisualizerResult] = useState<VisualizerResult>({
    svgString1: '',
    svgString2: '',
    err: '',
    score: 0,
    scores: Float64Array.from([0]),
  });

  useEffect(() => {
    try {
      const maxTurn = getMaxTurn(visualizerSettingInfo.output);
      setVisualizerSettingInfo((prev) => ({
        ...prev,
        maxTurn,
        turn: 0,
      }));
    } catch (e) {
      // outputが不正な場合には計算ができない。そのときにはmaxTurnを0にする
      setVisualizerSettingInfo((prev) => ({
        ...prev,
        maxTurn: 0,
        turn: 0,
      }));
    }
  }, [visualizerSettingInfo.output, setVisualizerSettingInfo]);

  useEffect(() => {
    try {
      const ret = vis(
        visualizerSettingInfo.output,
        visualizerSettingInfo.turn,
        visualizerSettingInfo.visualizerMode
      );
      console.log(ret);
      setVisualizerResult({
        svgString1: ret.svg1,
        svgString2: ret.svg2,
        err: ret.err,
        score: Number(ret.score),
        scores: ret.scores,
      });
    } catch (e) {
      // visが失敗した場合にはエラーを出力する
      console.log(e);
      let msg = '';
      if (e instanceof Error) {
        msg = e.message;
      }
      setVisualizerResult({
        svgString1: 'invalid input or output',
        svgString2: '',
        err: msg,
        score: 0,
        scores: Float64Array.from([0]),
      });
    }
  }, [
    visualizerSettingInfo.turn,
    visualizerSettingInfo.output,
    visualizerSettingInfo.visualizerMode,
  ]);

  return (
    <>
      <Description />
      <hr />
      <FileUploader setVisualizerSettingInfo={setVisualizerSettingInfo} />
      <InputOutput
        visualizerSettingInfo={visualizerSettingInfo}
        setVisualizerSettingInfo={setVisualizerSettingInfo}
      />
      <SaveButtons visualizerSettingInfo={visualizerSettingInfo} />
      <TurnSlider
        visualizerSettingInfo={visualizerSettingInfo}
        setVisualizerSettingInfo={setVisualizerSettingInfo}
      />
      <hr />
      <SvgViewer
        svgString1={visualizerResult.svgString1}
        svgString2={visualizerResult.svgString2}
        err={visualizerResult.err}
        score={visualizerResult.score}
        scores={visualizerResult.scores}
      ></SvgViewer>
    </>
  );
};

export default AHCLikeVisualizer;
