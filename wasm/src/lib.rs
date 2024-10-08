use wasm_bindgen::prelude::*;
mod util;

#[wasm_bindgen(getter_with_clone)]
pub struct Ret {
    pub score: f64,
    pub scores: Vec<f64>,
    pub err: String,
    pub svg1: String,
    pub svg2: String,
}

#[wasm_bindgen]
pub fn vis(_output: String, turn: usize, visualizer_mode: bool) -> Ret {
    let output = util::parse_output(&_output);
    let (score, scores, err, svg1, svg2) = util::vis(&output, turn as usize, visualizer_mode);
    Ret {
        score,
        scores: scores,
        err: err.to_string(),
        svg1: svg1.to_string(),
        svg2: svg2.to_string(),
    }
}

#[wasm_bindgen]
pub fn get_max_turn(_output: String) -> usize {
    let output = util::parse_output(&_output);
    if output.t == 0 {
        0
    } else {
        output.t as usize - 1
    }
}
