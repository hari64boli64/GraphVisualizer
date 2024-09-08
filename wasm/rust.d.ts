/* tslint:disable */
/* eslint-disable */
/**
* @param {string} _output
* @param {number} turn
* @param {boolean} visualizer_mode
* @returns {Ret}
*/
export function vis(_output: string, turn: number, visualizer_mode: boolean): Ret;
/**
* @param {string} _output
* @returns {number}
*/
export function get_max_turn(_output: string): number;
/**
*/
export class Ret {
  free(): void;
/**
*/
  err: string;
/**
*/
  score: number;
/**
*/
  scores: Float64Array;
/**
*/
  svg1: string;
/**
*/
  svg2: string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_ret_free: (a: number, b: number) => void;
  readonly __wbg_get_ret_score: (a: number) => number;
  readonly __wbg_set_ret_score: (a: number, b: number) => void;
  readonly __wbg_get_ret_scores: (a: number, b: number) => void;
  readonly __wbg_set_ret_scores: (a: number, b: number, c: number) => void;
  readonly __wbg_get_ret_err: (a: number, b: number) => void;
  readonly __wbg_set_ret_err: (a: number, b: number, c: number) => void;
  readonly __wbg_get_ret_svg1: (a: number, b: number) => void;
  readonly __wbg_set_ret_svg1: (a: number, b: number, c: number) => void;
  readonly __wbg_get_ret_svg2: (a: number, b: number) => void;
  readonly __wbg_set_ret_svg2: (a: number, b: number, c: number) => void;
  readonly vis: (a: number, b: number, c: number, d: number) => number;
  readonly get_max_turn: (a: number, b: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
