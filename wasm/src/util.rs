#![allow(non_snake_case, unused_macros)]
use svg::node::element::{Circle, Line, Style};

const W: f64 = 600.0;
const H: f64 = 600.0;

pub struct Output {
    pub n: usize,                        // number of vertices
    pub m: usize,                        // number of edges
    pub k: f64,                          // constant for score calculation
    pub row: Vec<usize>,                 // edge u
    pub col: Vec<usize>,                 // edge v
    pub data: Vec<f64>,                  // edge weight
    pub t: usize,                        // number of turns
    pub positions: Vec<Vec<(f64, f64)>>, // positions[turn][vertex]
}

fn readVal(iter: &mut std::str::SplitWhitespace) -> f64 {
    iter.next().unwrap().parse().unwrap()
}

fn interpolate(val: f64, data: &[(f64, f64, f64)]) -> f64 {
    for i in 0..data.len() - 1 {
        if data[i].0 <= val && val <= data[i + 1].0 {
            let ratio = (val - data[i].0) / (data[i + 1].0 - data[i].0);
            return data[i].2 + (data[i + 1].1 - data[i].2) * ratio;
        }
    }
    panic!("Value out of range"); // Handle case where `val` is out of expected range
}

fn get_jet(val: f64) -> std::string::String {
    let red_data = [
        (0.00, 0.0, 0.0),
        (0.35, 0.0, 0.0),
        (0.66, 1.0, 1.0),
        (0.89, 1.0, 1.0),
        (1.00, 0.5, 0.5),
    ];

    let green_data = [
        (0.000, 0.0, 0.0),
        (0.125, 0.0, 0.0),
        (0.375, 1.0, 1.0),
        (0.640, 1.0, 1.0),
        (0.910, 0.0, 0.0),
        (1.000, 0.0, 0.0),
    ];

    let blue_data = [
        (0.00, 0.5, 0.5),
        (0.11, 1.0, 1.0),
        (0.34, 1.0, 1.0),
        (0.65, 0.0, 0.0),
        (1.00, 0.0, 0.0),
    ];

    format!(
        "#{:02x}{:02x}{:02x}",
        (interpolate(val, &red_data) * 255.0) as u8,
        (interpolate(val, &green_data) * 255.0) as u8,
        (interpolate(val, &blue_data) * 255.0) as u8
    )
}

pub fn parse_output(f: &str) -> Output {
    let mut iter = f.split_whitespace();
    let n = readVal(&mut iter) as usize;
    let m = readVal(&mut iter) as usize;
    let k = readVal(&mut iter);
    let mut row = vec![0; m];
    let mut col = vec![0; m];
    let mut data = vec![0.0; m];
    for i in 0..m {
        let u = readVal(&mut iter) as usize;
        let v = readVal(&mut iter) as usize;
        let w = readVal(&mut iter);
        row[i] = u;
        col[i] = v;
        data[i] = w;
    }
    let t = readVal(&mut iter) as usize;
    let mut positions = vec![vec![(0.0, 0.0); n]; t];
    let mut maxXY = -1e9;
    let mut minXY = 1e9;
    for i in 0..t {
        for j in 0..n {
            let x = readVal(&mut iter);
            let y = readVal(&mut iter);
            positions[i][j] = (x, y);
            maxXY = f64::max(maxXY, f64::max(x, y));
            minXY = f64::min(minXY, f64::min(x, y));
        }
    }
    let invMaxMinusMin = 1.0 / (maxXY - minXY);
    for i in 0..t {
        for j in 0..n {
            positions[i][j].0 = W * 0.05 + W * 0.9 * (positions[i][j].0 - minXY) * invMaxMinusMin;
            positions[i][j].1 = H * 0.05 + H * 0.9 * (positions[i][j].1 - minXY) * invMaxMinusMin;
        }
    }
    Output {
        n,
        m,
        k,
        row,
        col,
        data,
        t,
        positions,
    }
}

fn calcScore(output: &Output, turn: usize) -> f64 {
    assert!(turn < output.t);
    let mut score = 0.0;
    for i in 0..output.n {
        for j in i + 1..output.n {
            let x1 = output.positions[0][i].0;
            let y1 = output.positions[0][i].1;
            let x2 = output.positions[0][j].0;
            let y2 = output.positions[0][j].1;
            let d = ((x1 - x2).powi(2) + (y1 - y2).powi(2)).sqrt();
            score -= output.k.powi(2) * d.ln();
        }
    }
    for i in 0..output.m {
        let u = output.row[i];
        let v = output.col[i];
        let a = output.data[i];
        let x1 = output.positions[turn][u].0;
        let y1 = output.positions[turn][u].1;
        let x2 = output.positions[turn][v].0;
        let y2 = output.positions[turn][v].1;
        let d = ((x1 - x2).powi(2) + (y1 - y2).powi(2)).sqrt();
        score += a * d.powi(3) / (3.0 * output.k);
    }
    score
}

pub fn vis(output: &Output, turn: usize) -> (f64, String, String, String) {
    let mut doc = svg::Document::new()
        .set("id", "vis")
        .set("viewBox", (-5, -5, W + 10.0, H + 10.0))
        .set("width", W + 10.0)
        .set("height", H + 10.0)
        .set("style", "background-color:white");

    doc = doc.add(Style::new(
        "text {text-anchor: middle; dominant-baseline: central; user-select: none;}",
    ));

    assert!(turn < output.t);

    for i in 0..output.m {
        let u = output.row[i];
        let v = output.col[i];
        let x1 = output.positions[turn][u].0;
        let y1 = output.positions[turn][u].1;
        let x2 = output.positions[turn][v].0;
        let y2 = output.positions[turn][v].1;
        doc = doc.add(
            Line::new()
                .set("x1", x1)
                .set("y1", y1)
                .set("x2", x2)
                .set("y2", y2)
                .set("stroke", "black"),
        );
    }

    for i in 0..output.n {
        let (x, y) = output.positions[turn][i];
        doc = doc.add(
            Circle::new()
                .set("cx", x)
                .set("cy", y)
                .set("r", 10)
                .set("fill", get_jet(i as f64 / output.n as f64))
                .add(svg::node::element::Title::new().add(svg::node::Text::new(format!("v{}", i)))),
        );
    }

    let score = calcScore(output, if turn == 0 { output.t - 1 } else { turn - 1 });
    let doc2 = "";

    (score, "".to_string(), doc.to_string(), doc2.to_string())
}
