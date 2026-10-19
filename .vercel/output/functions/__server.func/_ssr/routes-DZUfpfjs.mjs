import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ChevronLeft, i as RotateCcw, n as Volume2, o as ChevronDown, t as VolumeX } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DZUfpfjs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LETTERS = [
	"C",
	"D",
	"E",
	"F",
	"G",
	"A",
	"B"
];
var SHARP_LETTERS = [
	"F",
	"C",
	"G",
	"D",
	"A",
	"E",
	"B"
];
var FLAT_LETTERS = [
	"B",
	"E",
	"A",
	"D",
	"G",
	"C",
	"F"
];
var KEYS = {
	C: {
		id: "C",
		name: "C major",
		fifths: 0
	},
	G: {
		id: "G",
		name: "G major",
		fifths: 1
	},
	D: {
		id: "D",
		name: "D major",
		fifths: 2
	},
	A: {
		id: "A",
		name: "A major",
		fifths: 3
	},
	E: {
		id: "E",
		name: "E major",
		fifths: 4
	},
	F: {
		id: "F",
		name: "F major",
		fifths: -1
	},
	Bb: {
		id: "Bb",
		name: "B♭ major",
		fifths: -2
	},
	Eb: {
		id: "Eb",
		name: "E♭ major",
		fifths: -3
	},
	Ab: {
		id: "Ab",
		name: "A♭ major",
		fifths: -4
	}
};
/**
* Staff position of each signature accidental, in order.
* 0 is the bottom line; +1 is the space above it.
* Matches standard engraving (bass is the treble signature shifted down a line).
*/
var TREBLE_SIG_POS = {
	treble: {
		sharp: [
			8,
			5,
			9,
			6,
			3,
			7,
			4
		],
		flat: [
			4,
			7,
			3,
			6,
			2,
			5,
			1
		]
	},
	bass: {
		sharp: [
			6,
			3,
			7,
			4,
			1,
			5,
			2
		],
		flat: [
			2,
			5,
			1,
			4,
			0,
			3,
			-1
		]
	}
};
var C_CLEF_ANCHOR = {
	soprano: 0,
	mezzo: 2,
	alto: 4,
	tenor: 6,
	baritone: 8
};
var SIG_POS = {
	...TREBLE_SIG_POS,
	...Object.fromEntries(Object.entries(C_CLEF_ANCHOR).map(([clef, anchor]) => [clef, {
		sharp: TREBLE_SIG_POS.treble.sharp.map((position) => position + anchor - 2),
		flat: TREBLE_SIG_POS.treble.flat.map((position) => position + anchor - 2)
	}]))
};
var TREBLE_FROM_BOTTOM = [
	"E",
	"F",
	"G",
	"A",
	"B",
	"C",
	"D"
];
var BASS_FROM_BOTTOM = [
	"G",
	"A",
	"B",
	"C",
	"D",
	"E",
	"F"
];
var C_FROM_BOTTOM = [
	"C",
	"D",
	"E",
	"F",
	"G",
	"A",
	"B"
];
var SEMI = {
	C: 0,
	D: 2,
	E: 4,
	F: 5,
	G: 7,
	A: 9,
	B: 11
};
function letterAt(clef, position) {
	if (clef in C_CLEF_ANCHOR) return C_FROM_BOTTOM[((position - C_CLEF_ANCHOR[clef]) % 7 + 7) % 7];
	return (clef === "treble" ? TREBLE_FROM_BOTTOM : BASS_FROM_BOTTOM)[(position % 7 + 7) % 7];
}
function octaveAt(clef, position) {
	if (clef === "treble") return 4 + Math.floor((position + 2) / 7);
	if (clef === "bass") return 2 + Math.floor((position + 4) / 7);
	const anchor = C_CLEF_ANCHOR[clef];
	return (clef === "baritone" ? 3 : 4) + Math.floor((position - anchor) / 7);
}
function accidentalFor(letter, key) {
	const fifths = KEYS[key].fifths;
	if (fifths > 0 && SHARP_LETTERS.slice(0, fifths).includes(letter)) return "sharp";
	if (fifths < 0 && FLAT_LETTERS.slice(0, -fifths).includes(letter)) return "flat";
	return "natural";
}
function spell(letter, acc) {
	if (acc === "sharp") return `${letter}♯`;
	if (acc === "flat") return `${letter}♭`;
	return letter;
}
function answerFor(clef, position, key) {
	const letter = letterAt(clef, position);
	return {
		letter,
		acc: accidentalFor(letter, key)
	};
}
function midiOf(clef, position, acc) {
	const letter = letterAt(clef, position);
	const oct = octaveAt(clef, position);
	let semi = SEMI[letter];
	if (acc === "sharp") semi += 1;
	if (acc === "flat") semi -= 1;
	return (oct + 1) * 12 + semi;
}
var ORDS = [
	"",
	"1st",
	"2nd",
	"3rd",
	"4th",
	"5th"
];
function placeName(position) {
	if (position >= 0 && position <= 8) {
		const n = Math.floor(position / 2) + 1;
		return position % 2 === 0 ? `${ORDS[n]} line` : `${ORDS[n]} space`;
	}
	if (position > 8) {
		const above = position - 8;
		if (above % 2 === 0) {
			const ledger = above / 2;
			return ledger === 1 ? "1 ledger line above" : `${ledger} ledger lines above`;
		}
		const ledger = Math.floor(above / 2);
		if (ledger === 0) return "space above the staff";
		return ledger === 1 ? "space above 1 ledger line" : `space above ${ledger} ledger lines`;
	}
	const below = -position;
	if (below % 2 === 0) {
		const ledger = below / 2;
		return ledger === 1 ? "1 ledger line below" : `${ledger} ledger lines below`;
	}
	const ledger = Math.floor(below / 2);
	if (ledger === 0) return "space below the staff";
	return ledger === 1 ? "space below 1 ledger line" : `space below ${ledger} ledger lines`;
}
function noteTitle(clef, position, acc) {
	const name = spell(letterAt(clef, position), acc);
	const middle = clef === "treble" && position === -2 || clef === "bass" && position === 10;
	const where = middle ? "middle C" : `${clef} · ${placeName(position)}`;
	return middle && acc === "natural" ? "Middle C" : `${name} · ${where}`;
}
function keyBlurb(key) {
	const fifths = KEYS[key].fifths;
	if (fifths === 0) return "no sharps or flats";
	if (fifths === 1) return "1 sharp";
	if (fifths === -1) return "1 flat";
	if (fifths > 0) return `${fifths} sharps`;
	return `${-fifths} flats`;
}
function signaturePositions(clef, key) {
	const fifths = KEYS[key].fifths;
	if (fifths === 0) return [];
	const acc = fifths > 0 ? "sharp" : "flat";
	return SIG_POS[clef][acc].slice(0, Math.abs(fifths)).map((position) => ({
		acc,
		position
	}));
}
var TREBLE_D = "m12.049 3.5296c0.305 3.1263-2.019 5.6563-4.0772 7.7014-0.9349 0.897-0.155 0.148-0.6437 0.594-0.1022-0.479-0.2986-1.731-0.2802-2.11 0.1304-2.6939 2.3198-6.5875 4.2381-8.0236 0.309 0.5767 0.563 0.6231 0.763 1.8382zm0.651 16.142c-1.232-0.906-2.85-1.144-4.3336-0.885-0.1913-1.255-0.3827-2.51-0.574-3.764 2.3506-2.329 4.9066-5.0322 5.0406-8.5394 0.059-2.232-0.276-4.6714-1.678-6.4836-1.7004 0.12823-2.8995 2.156-3.8019 3.4165-1.4889 2.6705-1.1414 5.9169-0.57 8.7965-0.8094 0.952-1.9296 1.743-2.7274 2.734-2.3561 2.308-4.4085 5.43-4.0046 8.878 0.18332 3.334 2.5894 6.434 5.8702 7.227 1.2457 0.315 2.5639 0.346 3.8241 0.099 0.2199 2.25 1.0266 4.629 0.0925 6.813-0.7007 1.598-2.7875 3.004-4.3325 2.192-0.5994-0.316-0.1137-0.051-0.478-0.252 1.0698-0.257 1.9996-1.036 2.26-1.565 0.8378-1.464-0.3998-3.639-2.1554-3.358-2.262 0.046-3.1904 3.14-1.7356 4.685 1.3468 1.52 3.833 1.312 5.4301 0.318 1.8125-1.18 2.0395-3.544 1.8325-5.562-0.07-0.678-0.403-2.67-0.444-3.387 0.697-0.249 0.209-0.059 1.193-0.449 2.66-1.053 4.357-4.259 3.594-7.122-0.318-1.469-1.044-2.914-2.302-3.792zm0.561 5.757c0.214 1.991-1.053 4.321-3.079 4.96-0.136-0.795-0.172-1.011-0.2626-1.475-0.4822-2.46-0.744-4.987-1.116-7.481 1.6246-0.168 3.4576 0.543 4.0226 2.184 0.244 0.577 0.343 1.197 0.435 1.812zm-5.1486 5.196c-2.5441 0.141-4.9995-1.595-5.6343-4.081-0.749-2.153-0.5283-4.63 0.8207-6.504 1.1151-1.702 2.6065-3.105 4.0286-4.543 0.183 1.127 0.366 2.254 0.549 3.382-2.9906 0.782-5.0046 4.725-3.215 7.451 0.5324 0.764 1.9765 2.223 2.7655 1.634-1.102-0.683-2.0033-1.859-1.8095-3.227-0.0821-1.282 1.3699-2.911 2.6513-3.198 0.4384 2.869 0.9413 6.073 1.3797 8.943-0.5054 0.1-1.0211 0.143-1.536 0.143z";
var TREBLE = {
	w: 15.186,
	h: 40.768,
	anchorX: 8.55,
	anchorY: 24.6
};
var BASS = {
	w: 17.45,
	h: 20.15,
	anchorX: 16.02,
	anchorY: 6.065,
	dotGap: 5.843
};
var BASS_DOT_A = "M 17.305 3.142 C 17.313 3.512 17.156 3.881 16.874 4.122 C 16.514 4.451 15.965 4.518 15.516 4.351 C 15.071 4.179 14.742 3.739 14.717 3.261 C 14.683 2.887 14.802 2.495 15.073 2.229 C 15.328 1.957 15.708 1.824 16.077 1.847 C 16.457 1.855 16.823 2.046 17.05 2.35 C 17.225 2.575 17.308 2.86 17.305 3.142 z";
var BASS_DOT_B = "M 17.305 8.985 C 17.313 9.355 17.156 9.725 16.874 9.966 C 16.514 10.295 15.965 10.362 15.516 10.195 C 15.071 10.023 14.742 9.583 14.717 9.104 C 14.682 8.73 14.809 8.343 15.072 8.073 C 15.322 7.795 15.706 7.668 16.074 7.69 C 16.558 7.703 16.997 8.033 17.197 8.465 C 17.271 8.628 17.306 8.807 17.305 8.985 z";
var BASS_BODY = "M 13.024 7.208 C 13.069 10.033 11.809 12.778 9.81 14.745 C 7.321 17.233 4.063 18.816 0.743 19.873 C 0.301 20.112 -0.365 19.797 0.331 19.472 C 1.669 18.863 3.059 18.341 4.291 17.521 C 7.013 15.838 9.311 13.187 9.868 9.959 C 10.193 7.994 10.103 5.948 9.61 4.019 C 9.249 2.6 8.266 1.136 6.709 0.926 C 5.296 0.71 3.794 1.199 2.786 2.221 C 2.521 2.49 2.005 3.234 2.09 4.088 C 2.692 3.615 2.651 3.668 3.144 3.447 C 4.281 2.941 5.789 3.661 6.072 4.913 C 6.374 6.063 6.141 7.527 5.006 8.14 C 3.821 8.784 2.072 8.518 1.41 7.249 C 0.315 5.294 0.917 2.622 2.687 1.266 C 4.491 -0.23 7.121 -0.289 9.245 0.479 C 11.43 1.291 12.732 3.555 12.942 5.797 C 13 6.265 13.024 6.737 13.024 7.208 z";
function clefMetrics(clef, gap) {
	if (clef === "treble") {
		const scale = gap * 4.15 / TREBLE.anchorY;
		return {
			scale,
			left: TREBLE.anchorX * scale,
			right: (TREBLE.w - TREBLE.anchorX) * scale,
			refPosition: 2
		};
	}
	if (clef !== "bass") return {
		scale: gap / 8,
		left: gap * .7,
		right: gap * .7,
		refPosition: {
			soprano: 0,
			mezzo: 2,
			alto: 4,
			tenor: 6,
			baritone: 8
		}[clef]
	};
	const scale = gap / BASS.dotGap;
	return {
		scale,
		left: BASS.anchorX * scale,
		right: (BASS.w - BASS.anchorX) * scale + gap * .15,
		refPosition: 6
	};
}
function ClefGlyph({ clef, x, yRef, gap }) {
	const metrics = clefMetrics(clef, gap);
	if (clef === "treble") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: `translate(${x} ${yRef}) scale(${metrics.scale}) translate(${-TREBLE.anchorX} ${-TREBLE.anchorY})`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: TREBLE_D,
			fill: "var(--color-ink)"
		})
	});
	if (clef !== "bass") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: `translate(${x - gap * .7} ${yRef - gap * 1.4})`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: gap * .7,
			y: gap * 1.4,
			textAnchor: "middle",
			fontFamily: "Georgia, serif",
			fontSize: gap * 2.8,
			fontWeight: "700",
			fill: "var(--color-ink)",
			children: "C"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: gap * .52,
			y: gap * .25,
			width: gap * .36,
			height: gap * 2.3,
			rx: gap * .12,
			fill: "var(--color-ink)"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: `translate(${x} ${yRef}) scale(${metrics.scale}) translate(${-BASS.anchorX} ${-BASS.anchorY})`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: BASS_BODY,
				fill: "var(--color-ink)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: BASS_DOT_A,
				fill: "var(--color-ink)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: BASS_DOT_B,
				fill: "var(--color-ink)"
			})
		]
	});
}
function SharpGlyph({ x, y, gap }) {
	const h = gap * 2.45;
	const spread = gap * .34;
	const sw = Math.max(1.15, gap * .078);
	const bar = gap * .2;
	const rise = gap * .42;
	const barW = gap * 1.02;
	const bars = [y - gap * .28, y + gap * .38];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		fill: "var(--color-ink)",
		children: [
			bars.map((cy) => {
				const xL = x - barW / 2;
				const xR = x + barW / 2;
				const yL = cy + rise / 2;
				const yR = cy - rise / 2;
				const points = `${xL},${yL + bar / 2} ${xR},${yR + bar / 2} ${xR},${yR - bar / 2} ${xL},${yL - bar / 2}`;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points }, cy);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: x - spread - sw / 2,
				y: y - h / 2,
				width: sw,
				height: h,
				rx: sw / 2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: x + spread - sw / 2,
				y: y - h / 2,
				width: sw,
				height: h,
				rx: sw / 2
			})
		]
	});
}
function FlatGlyph({ x, y, gap }) {
	const stemW = Math.max(1.2, gap * .085);
	const stemX = x - gap * .02;
	const stemTop = y - gap * 1.72;
	const stemBot = y + gap * .62;
	const bowl = `M ${stemX + stemW * .4} ${y - gap * .48}
    C ${stemX + gap * .92} ${y - gap * .78}, ${stemX + gap * 1.02} ${y + gap * .05}, ${stemX + stemW} ${stemBot - gap * .02}
    C ${stemX + gap * .62} ${y + gap * .22}, ${stemX + gap * .28} ${y - gap * .02}, ${stemX + stemW * .2} ${y - gap * .18}
    Z`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		fill: "var(--color-ink)",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: stemX,
			y: stemTop,
			width: stemW,
			height: stemBot - stemTop,
			rx: stemW / 2
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: bowl })]
	});
}
function signatureStep(gap) {
	return gap * .92;
}
function signatureWidth(clef, key, gap) {
	const count = signaturePositions(clef, key).length;
	if (count === 0) return 0;
	return count * signatureStep(gap) + gap * .15;
}
function Signature({ clef, keyId, x, yAt, gap }) {
	const marks = signaturePositions(clef, keyId);
	const step = signatureStep(gap);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: marks.map((mark, index) => mark.acc === "sharp" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SharpGlyph, {
		x: x + index * step,
		y: yAt(mark.position),
		gap
	}, index) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlatGlyph, {
		x: x + index * step - gap * .12,
		y: yAt(mark.position),
		gap
	}, index)) });
}
function NoteHead({ x, y, gap, stemUp }) {
	const rx = gap * .58;
	const ry = gap * .4;
	const stemLen = gap * 3.15;
	const stemW = Math.max(1.15, gap * .085);
	const stemX = stemUp ? x + rx * .82 : x - rx * .82 - stemW;
	const stemY = stemUp ? y - stemLen : y - ry * .15;
	const stemH = stemUp ? stemLen + ry * .2 : stemLen + ry * .35;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		fill: "var(--color-ink)",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: stemX,
			y: stemY,
			width: stemW,
			height: stemH
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: x,
			cy: y,
			rx,
			ry,
			transform: `rotate(-18 ${x} ${y})`
		})]
	});
}
function LedgerLines({ x, position, yAt, gap }) {
	const lines = [];
	if (position >= 10) {
		const last = position % 2 === 0 ? position : position - 1;
		for (let lp = 10; lp <= last; lp += 2) lines.push(lp);
	} else if (position <= -2) {
		const last = position % 2 === 0 ? position : position + 1;
		for (let lp = -2; lp >= last; lp -= 2) lines.push(lp);
	}
	const half = gap * 1.15;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		stroke: "var(--color-ink)",
		strokeWidth: 1.15,
		strokeLinecap: "butt",
		children: lines.map((lp) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: x - half,
			x2: x + half,
			y1: yAt(lp),
			y2: yAt(lp)
		}, lp))
	});
}
function useWidth() {
	const ref = (0, import_react.useRef)(null);
	const [width, setWidth] = (0, import_react.useState)(320);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const measure = () => setWidth(el.clientWidth);
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	return {
		ref,
		width
	};
}
function polar(index, radius) {
	const angle = -Math.PI / 2 + index / LETTERS.length * Math.PI * 2;
	return {
		x: Math.cos(angle) * radius,
		y: Math.sin(angle) * radius
	};
}
function NoteRing({ keyId, disabled, wrongId, hint, onPick }) {
	const { ref, width } = useWidth();
	const fifths = KEYS[keyId].fifths;
	const innerAcc = fifths > 0 ? "sharp" : fifths < 0 ? "flat" : null;
	const outer = innerAcc ? 48 : 56;
	const inner = 44;
	const outerR = width / 2 - outer / 2 - 2;
	const innerR = innerAcc ? outerR - outer / 2 - inner / 2 - 12 : 0;
	const center = width / 2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "relative mx-auto aspect-square w-full max-w-sm select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				className: "absolute inset-0 h-full w-full",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: center,
					cy: center,
					r: outerR,
					fill: "none",
					stroke: "var(--color-ink)",
					strokeOpacity: .16
				}), innerAcc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: center,
					cy: center,
					r: innerR,
					fill: "none",
					stroke: "var(--color-accent)",
					strokeOpacity: .35
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-4xl leading-none text-ink",
							children: innerAcc === "sharp" ? "♯" : innerAcc === "flat" ? "♭" : "♮"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-sm text-muted",
							children: KEYS[keyId].name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs tracking-wide text-muted",
							children: keyBlurb(keyId)
						})
					]
				})
			}),
			LETTERS.map((letter, index) => {
				const point = polar(index, outerR);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyButton, {
					letter,
					acc: "natural",
					x: center + point.x,
					y: center + point.y,
					size: outer,
					disabled,
					wrong: wrongId === `${letter}:natural`,
					hint: hint?.letter === letter && hint.acc === "natural",
					onPick
				}, letter);
			}),
			innerAcc ? LETTERS.map((letter, index) => {
				const point = polar(index, innerR);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyButton, {
					letter,
					acc: innerAcc,
					x: center + point.x,
					y: center + point.y,
					size: inner,
					inner: true,
					disabled,
					wrong: wrongId === `${letter}:${innerAcc}`,
					hint: hint?.letter === letter && hint.acc === innerAcc,
					onPick
				}, `${letter}-acc`);
			}) : null
		]
	});
}
function KeyButton({ letter, acc, x, y, size, inner, disabled, wrong, hint, onPick }) {
	const mark = acc === "sharp" ? "♯" : acc === "flat" ? "♭" : "";
	const label = acc === "natural" ? letter : `${letter} ${acc}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		disabled,
		"aria-label": label,
		className: `ring-key tap ${inner ? "inner" : ""} ${wrong ? "is-wrong" : ""} ${hint ? "is-hint" : ""}`,
		style: {
			left: x - size / 2,
			top: y - size / 2,
			width: size,
			height: size
		},
		onClick: () => onPick(letter, acc),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: inner ? "text-base" : "text-xl",
			children: [letter, mark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm",
				children: mark
			}) : null]
		})
	});
}
var PLAY = 42;
var SPACING = 64;
function staffGap(minPos, maxPos) {
	const span = maxPos - minPos;
	if (span <= 10) return 16;
	if (span <= 16) return 14;
	if (span <= 22) return 12;
	return 11;
}
function changeWidth(item, gap) {
	let width = gap * 1.05;
	if (item.clefChanged) width += clefMetrics(item.clef, gap).left + clefMetrics(item.clef, gap).right + gap * .45;
	if (Math.abs(KEYS[item.key].fifths) > 0 && (item.keyChanged || item.clefChanged)) width += signatureWidth(item.clef, item.key, gap) + gap * .2;
	return width;
}
function placeItems(items, gap) {
	let cursor = PLAY;
	return items.map((item) => {
		if (item.kind === "note") {
			const placed = {
				...item,
				x: cursor,
				slot: SPACING
			};
			cursor += SPACING;
			return placed;
		}
		const slot = changeWidth(item, gap);
		const placed = {
			...item,
			x: cursor + slot / 2,
			slot
		};
		cursor += slot;
		return placed;
	});
}
function StaffLine({ items, index, minPos, maxPos, clefs }) {
	const gap = staffGap(minPos, maxPos);
	const half = gap / 2;
	const hasTreble = clefs.includes("treble");
	const topPad = Math.max(gap * 1.35, (maxPos - 8) * half + gap * 1.15);
	const bottomPad = Math.max(hasTreble ? gap * 2.9 : gap * 1.55, (0 - minPos) * half + gap * 1.15);
	const height = topPad + (maxPos - minPos) * half + bottomPad;
	const yAt = (position) => topPad + (maxPos - position) * half;
	const placed = (0, import_react.useMemo)(() => placeItems(items, gap), [items, gap]);
	const current = placed[index];
	const tx = current ? -(current.x - PLAY) : 0;
	const total = (placed[placed.length - 1]?.x ?? PLAY) + 120;
	const system = current ? {
		clef: current.clef,
		key: current.key
	} : {
		clef: clefs[0] ?? "treble",
		key: "C"
	};
	const metrics = clefMetrics(system.clef, gap);
	const clefX = 8 + metrics.left;
	const sigX = clefX + metrics.right + gap * .45;
	const sigW = signatureWidth(system.clef, system.key, gap);
	const barX = sigX + sigW + (sigW > 0 ? gap * .35 : gap * .15);
	const pinned = Math.max(barX + 12, gap * 4.2);
	const yTop = yAt(8);
	const yBot = yAt(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sheet relative overflow-hidden",
		style: { height },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "absolute inset-0 h-full w-full",
				"aria-hidden": "true",
				children: [
					0,
					2,
					4,
					6,
					8
				].map((position) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: 0,
					x2: "100%",
					y1: yAt(position),
					y2: yAt(position),
					stroke: "var(--color-ink)",
					strokeWidth: 1.2
				}, position))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				className: "clef-in absolute top-0 left-0",
				width: pinned,
				height,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClefGlyph, {
						clef: system.clef,
						x: clefX,
						yRef: yAt(metrics.refPosition),
						gap
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signature, {
						clef: system.clef,
						keyId: system.key,
						x: sigX,
						yAt,
						gap
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: barX,
						x2: barX,
						y1: yTop,
						y2: yBot,
						stroke: "var(--color-ink)",
						strokeWidth: 1.3
					})
				]
			}, `${system.clef}-${system.key}`),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "notes-mask absolute top-0 right-0 bottom-0",
				style: { left: pinned },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					className: "note-scroll absolute top-0",
					height,
					width: total,
					style: { transform: `translateX(${tx}px)` },
					children: placed.map((item, itemIndex) => {
						if (item.kind === "change") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChangeMark, {
							item,
							yAt,
							yTop,
							yBot,
							gap
						}, `c-${itemIndex}`);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							opacity: itemIndex < index ? .28 : 1,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerLines, {
								x: item.x,
								position: item.position,
								yAt,
								gap
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteHead, {
								x: item.x,
								y: yAt(item.position),
								gap,
								stemUp: item.position < 4
							})]
						}, `n-${itemIndex}`);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					className: "pointer-events-none absolute inset-0 h-full w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: 26,
						y: yTop - 8,
						width: 32,
						height: yBot - yTop + 16,
						rx: 10,
						fill: "var(--color-accent)",
						opacity: .12
					})
				})]
			})
		]
	});
}
function ChangeMark({ item, yAt, yTop, yBot, gap }) {
	const width = item.slot;
	let x = item.x - width / 2 + 2;
	const metrics = clefMetrics(item.clef, gap);
	const drawSig = Math.abs(KEYS[item.key].fifths) > 0 && (item.keyChanged || item.clefChanged);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: x,
			x2: x,
			y1: yTop,
			y2: yBot,
			stroke: "var(--color-ink)",
			strokeWidth: 1.15
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: x + 4,
			x2: x + 4,
			y1: yTop,
			y2: yBot,
			stroke: "var(--color-ink)",
			strokeWidth: 2.3
		}),
		item.clefChanged ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClefGlyph, {
			clef: item.clef,
			x: x + gap * .7 + metrics.left,
			yRef: yAt(metrics.refPosition),
			gap
		}) : null,
		drawSig ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signature, {
			clef: item.clef,
			keyId: item.key,
			x: x + gap * .85 + (item.clefChanged ? metrics.left + metrics.right + gap * .35 : gap * .55),
			yAt,
			gap
		}) : null
	] });
}
var ctx = null;
function context() {
	if (typeof window === "undefined") return null;
	const Ctor = window.AudioContext ?? window.webkitAudioContext;
	if (!Ctor) return null;
	if (!ctx) ctx = new Ctor();
	if (ctx.state === "suspended") ctx.resume();
	return ctx;
}
function playMidi(midi) {
	const audio = context();
	if (!audio) return;
	const t = audio.currentTime;
	const freq = 440 * 2 ** ((midi - 69) / 12);
	const master = audio.createGain();
	master.gain.setValueAtTime(.9, t);
	master.connect(audio.destination);
	for (const partial of [{
		type: "sine",
		mul: 1,
		gain: .11
	}, {
		type: "triangle",
		mul: 2,
		gain: .035
	}]) {
		const osc = audio.createOscillator();
		const gain = audio.createGain();
		osc.type = partial.type;
		osc.frequency.setValueAtTime(freq * partial.mul, t);
		gain.gain.setValueAtTime(1e-4, t);
		gain.gain.exponentialRampToValueAtTime(partial.gain, t + .02);
		gain.gain.exponentialRampToValueAtTime(1e-4, t + .7);
		osc.connect(gain);
		gain.connect(master);
		osc.start(t);
		osc.stop(t + .72);
	}
}
function playWrong() {
	const audio = context();
	if (!audio) return;
	const t = audio.currentTime;
	const osc = audio.createOscillator();
	const gain = audio.createGain();
	osc.type = "triangle";
	osc.frequency.setValueAtTime(196, t);
	osc.frequency.exponentialRampToValueAtTime(140, t + .12);
	gain.gain.setValueAtTime(1e-4, t);
	gain.gain.exponentialRampToValueAtTime(.05, t + .01);
	gain.gain.exponentialRampToValueAtTime(1e-4, t + .16);
	osc.connect(gain);
	gain.connect(audio.destination);
	osc.start(t);
	osc.stop(t + .18);
}
function notes(clef, positions) {
	return positions.map((position) => ({
		clef,
		position
	}));
}
function span(from, to) {
	const out = [];
	for (let i = from; i <= to; i++) out.push(i);
	return out;
}
function fixedDrill(code, title, clef, positions, focus, keys = ["C"], keyEvery = 48) {
	return {
		id: code,
		code,
		title,
		notes: notes(clef, positions),
		focus: notes(clef, focus),
		keys,
		keyEvery,
		clefMode: "fixed",
		clef,
		clefGroup: 48
	};
}
function ladder(chapter, clef, steps, reviewTitle) {
	const learned = [];
	const drills = steps.map((step, i) => {
		learned.push(...step.add);
		return fixedDrill(`${chapter}.${i + 1}`, step.title, clef, [...learned], step.add);
	});
	drills.push(fixedDrill(`${chapter}.${steps.length + 1}`, reviewTitle, clef, [...learned], []));
	return drills;
}
var KEY_STEPS = [
	{
		id: "G",
		title: "G major · one sharp"
	},
	{
		id: "D",
		title: "D major · two sharps"
	},
	{
		id: "A",
		title: "A major · three sharps"
	},
	{
		id: "E",
		title: "E major · four sharps"
	},
	{
		id: "F",
		title: "F major · one flat"
	},
	{
		id: "Bb",
		title: "B♭ major · two flats"
	},
	{
		id: "Eb",
		title: "E♭ major · three flats"
	},
	{
		id: "Ab",
		title: "A♭ major · four flats"
	}
];
function keyChapter(chapter, clef, positions) {
	const drills = KEY_STEPS.map((step, i) => fixedDrill(`${chapter}.${i + 1}`, step.title, clef, positions, [], [step.id]));
	drills.push(fixedDrill(`${chapter}.${KEY_STEPS.length + 1}`, "All eight keys, changing every eight notes", clef, positions, [], KEY_STEPS.map((step) => step.id), 8));
	return drills;
}
function ledgerDrills() {
	const bands = [
		{
			min: -2,
			max: 10,
			title: "One ledger line above and below"
		},
		{
			min: -4,
			max: 12,
			title: "Two ledger lines"
		},
		{
			min: -6,
			max: 14,
			title: "Three ledger lines"
		},
		{
			min: -8,
			max: 16,
			title: "Four ledger lines"
		},
		{
			min: -10,
			max: 18,
			title: "Five ledger lines"
		}
	];
	let prevMin = 0;
	let prevMax = 8;
	const drills = bands.map((band, i) => {
		const positions = span(band.min, band.max);
		const focus = positions.filter((position) => position < prevMin || position > prevMax);
		prevMin = band.min;
		prevMax = band.max;
		return fixedDrill(`1.4.${i + 1}`, band.title, "treble", positions, focus);
	});
	drills.push(fixedDrill("1.4.6", "Every note out to five ledger lines", "treble", span(-10, 18), []));
	return drills;
}
var TREBLE_STAFF = span(0, 8);
var TREBLE_NEAR = span(-2, 11);
var BASS_STAFF = span(0, 8);
var BASS_NEAR = span(-3, 11);
function mixed(code, title, treble, bass, clefGroup, keys = ["C"], keyEvery = 48) {
	return {
		id: code,
		code,
		title,
		notes: [...notes("treble", treble), ...notes("bass", bass)],
		focus: [],
		keys,
		keyEvery,
		clefMode: "groups",
		clefGroup
	};
}
function clefLadder(chapter, clef, anchor) {
	const steps = [
		{
			add: [anchor, anchor + 4],
			title: "Anchor C and G above it"
		},
		{
			add: [anchor - 2],
			title: "F below the anchor"
		},
		{
			add: [anchor + 2],
			title: "A above the anchor"
		},
		{
			add: [anchor - 4],
			title: "E below the anchor"
		},
		{
			add: [anchor + 6],
			title: "B above the anchor"
		},
		{
			add: [anchor - 6],
			title: "D below the anchor"
		}
	];
	const learned = [];
	const drills = steps.map((step, index) => {
		learned.push(...step.add);
		return fixedDrill(`${chapter}.${index + 1}`, step.title, clef, [...learned], step.add);
	});
	drills.push(fixedDrill(`${chapter}.7`, "All previous notes plus the remaining staff", clef, span(0, 8), []), fixedDrill(`${chapter}.8`, "Full staff mixed", clef, span(0, 8), []));
	return drills;
}
function cClefKeyChapter(chapter, clef) {
	const keys = [
		"G",
		"D",
		"A",
		"F",
		"Bb",
		"Eb"
	];
	return [...keys.map((key, index) => fixedDrill(`${chapter}.${index + 1}`, `${key} major · key signature`, clef, span(0, 8), [], [key])), fixedDrill(`${chapter}.7`, "Mixed key signatures", clef, span(0, 8), [], keys, 8)];
}
function mixedClefs(code, title, clefOrder, positions, keyEvery = 48) {
	return {
		id: code,
		code,
		title,
		notes: clefOrder.flatMap((clef) => notes(clef, positions)),
		focus: [],
		keys: ["C"],
		keyEvery,
		clefMode: "groups",
		clefGroup: 1,
		clefOrder
	};
}
var chapters = [
	{
		id: "1.1",
		code: "1.1",
		kicker: "Treble clef",
		title: "Part one",
		summary: "The nine notes that sit on the staff. Landmarks first, then the neighbors.",
		drills: ladder("1.1", "treble", [
			{
				add: [2, 5],
				title: "G on the 2nd line and C on the 3rd space"
			},
			{
				add: [4],
				title: "B on the 3rd line"
			},
			{
				add: [3],
				title: "A on the 2nd space"
			},
			{
				add: [1],
				title: "F on the 1st space"
			},
			{
				add: [0],
				title: "E on the 1st line"
			},
			{
				add: [6],
				title: "D on the 4th line"
			},
			{
				add: [7],
				title: "E on the 4th space"
			},
			{
				add: [8],
				title: "F on the 5th line"
			}
		], "All the notes on the staff")
	},
	{
		id: "1.2",
		code: "1.2",
		kicker: "Treble clef",
		title: "Part two",
		summary: "Middle C, and the notes that sit just off the staff.",
		drills: ladder("1.2", "treble", [
			{
				add: [-2],
				title: "Middle C, one ledger line below"
			},
			{
				add: [-1],
				title: "D in the space below the staff"
			},
			{
				add: [9],
				title: "G in the space above the staff"
			},
			{
				add: [10],
				title: "A on one ledger line above"
			},
			{
				add: [11],
				title: "B in the space above that ledger"
			}
		], "Every treble note so far").map((drill, index) => index === 0 ? drill : {
			...drill,
			notes: notes("treble", [...TREBLE_STAFF, ...drill.notes.map((note) => note.position).filter((p) => p < 0 || p > 8)])
		})
	},
	{
		id: "1.3",
		code: "1.3",
		kicker: "Treble clef",
		title: "Key signatures",
		summary: "The signature sits beside the clef. Name the note it makes — in every octave.",
		drills: keyChapter("1.3", "treble", TREBLE_NEAR)
	},
	{
		id: "1.4",
		code: "1.4",
		kicker: "Treble clef",
		title: "Ledger lines",
		summary: "Out past the staff, one layer at a time, up to five ledger lines.",
		drills: ledgerDrills()
	},
	{
		id: "1.5",
		code: "1.5",
		kicker: "Bass clef",
		title: "Part one",
		summary: "The bass staff. F on the fourth line is home, the way G is home in treble.",
		drills: ladder("1.5", "bass", [
			{
				add: [6, 3],
				title: "F on the 4th line and C on the 2nd space"
			},
			{
				add: [4],
				title: "D on the 3rd line"
			},
			{
				add: [5],
				title: "E on the 3rd space"
			},
			{
				add: [2],
				title: "B on the 2nd line"
			},
			{
				add: [1],
				title: "A on the 1st space"
			},
			{
				add: [0],
				title: "G on the 1st line"
			},
			{
				add: [7],
				title: "G on the 4th space"
			},
			{
				add: [8],
				title: "A on the 5th line"
			}
		], "All the notes on the staff")
	},
	{
		id: "1.6",
		code: "1.6",
		kicker: "Bass clef",
		title: "Part two",
		summary: "Middle C from below, and the notes just off the bass staff.",
		drills: [
			fixedDrill("1.6.1", "Middle C, one ledger line above", "bass", [8, 10], [10]),
			fixedDrill("1.6.2", "B in the space above the staff", "bass", [
				...BASS_STAFF,
				9,
				10
			], [9]),
			fixedDrill("1.6.3", "D in the space above middle C", "bass", [
				...BASS_STAFF,
				9,
				10,
				11
			], [11]),
			fixedDrill("1.6.4", "F in the space below the staff", "bass", [
				-1,
				...BASS_STAFF,
				9,
				10,
				11
			], [-1]),
			fixedDrill("1.6.5", "E on one ledger line below", "bass", [
				-2,
				-1,
				...BASS_STAFF,
				9,
				10,
				11
			], [-2]),
			fixedDrill("1.6.6", "D in the space below that ledger", "bass", [
				-3,
				-2,
				-1,
				...BASS_STAFF,
				9,
				10,
				11
			], [-3]),
			fixedDrill("1.6.7", "Every bass note so far", "bass", BASS_NEAR, [])
		]
	},
	{
		id: "1.7",
		code: "1.7",
		kicker: "Bass clef",
		title: "Key signatures",
		summary: "The same keys, now read under the bass clef.",
		drills: keyChapter("1.7", "bass", BASS_NEAR)
	},
	{
		id: "1.8",
		code: "1.8",
		kicker: "Both clefs",
		title: "Treble and bass",
		summary: "The clef can change. Read it before you name the note.",
		drills: [
			mixed("1.8.1", "Staff notes, clef changes every four", TREBLE_STAFF, BASS_STAFF, 4),
			mixed("1.8.2", "With middle C, clef changes every four", TREBLE_NEAR, BASS_NEAR, 4),
			mixed("1.8.3", "Same range, clef changes every two notes", TREBLE_NEAR, BASS_NEAR, 2),
			mixed("1.8.4", "Clef changes on every note", TREBLE_NEAR, BASS_NEAR, 1),
			mixed("1.8.5", "G major and F major, both clefs", TREBLE_NEAR, BASS_NEAR, 4, ["G", "F"], 8),
			mixed("1.8.6", "Keys and clefs together", span(-4, 12), span(-4, 12), 4, KEY_STEPS.map((step) => step.id), 8)
		]
	},
	{
		id: "2.1",
		code: "2.1",
		kicker: "Alto clef",
		title: "Part one",
		summary: "C on the middle line, then the neighboring notes in a careful ladder.",
		drills: clefLadder("2.1", "alto", 4)
	},
	{
		id: "2.2",
		code: "2.2",
		kicker: "Alto clef",
		title: "Part two",
		summary: "Ledger lines above and below the alto staff.",
		drills: [
			fixedDrill("2.2.1", "One ledger line above", "alto", span(0, 10), [10]),
			fixedDrill("2.2.2", "One ledger line below", "alto", span(-2, 8), [-2]),
			fixedDrill("2.2.3", "Two ledger lines both ways", "alto", span(-4, 12), [-4, 12]),
			fixedDrill("2.2.4", "Alto staff and ledger lines mixed", "alto", span(-4, 12), [])
		]
	},
	{
		id: "2.3",
		code: "2.3",
		kicker: "Alto clef",
		title: "Key signatures",
		summary: "Read the same signatures from the center of the alto staff.",
		drills: cClefKeyChapter("2.3", "alto")
	},
	{
		id: "2.4",
		code: "2.4",
		kicker: "Tenor clef",
		title: "Part one",
		summary: "C on the fourth line, introduced one neighboring note at a time.",
		drills: clefLadder("2.4", "tenor", 6)
	},
	{
		id: "2.5",
		code: "2.5",
		kicker: "Tenor clef",
		title: "Part two",
		summary: "Extend tenor reading beyond the staff.",
		drills: [
			fixedDrill("2.5.1", "One ledger line above", "tenor", span(0, 10), [10]),
			fixedDrill("2.5.2", "One ledger line below", "tenor", span(-2, 8), [-2]),
			fixedDrill("2.5.3", "Two ledger lines both ways", "tenor", span(-4, 12), [-4, 12]),
			fixedDrill("2.5.4", "Tenor staff and ledger lines mixed", "tenor", span(-4, 12), [])
		]
	},
	{
		id: "2.6",
		code: "2.6",
		kicker: "Tenor clef",
		title: "Key signatures",
		summary: "Make tenor clef fluent across changing signatures.",
		drills: cClefKeyChapter("2.6", "tenor")
	},
	{
		id: "2.7",
		code: "2.7",
		kicker: "C-clefs",
		title: "Alto and tenor",
		summary: "Switch between the two C-clefs before adding the familiar clefs back in.",
		drills: [mixedClefs("2.7.1", "Alto and tenor, four notes each", ["alto", "tenor"], span(0, 8), 4), mixedClefs("2.7.2", "Alto and tenor, every note", ["alto", "tenor"], span(0, 8))]
	},
	{
		id: "2.8",
		code: "2.8",
		kicker: "Four clefs",
		title: "Full Level 2 mix",
		summary: "Treble, bass, alto, and tenor in one reading line.",
		drills: [
			mixedClefs("2.8.1", "Four clefs, four notes each", [
				"treble",
				"bass",
				"alto",
				"tenor"
			], span(0, 8), 4),
			mixedClefs("2.8.2", "Four clefs, every note", [
				"treble",
				"bass",
				"alto",
				"tenor"
			], span(-2, 10)),
			{
				...mixedClefs("2.8.3", "Four clefs and changing keys", [
					"treble",
					"bass",
					"alto",
					"tenor"
				], span(-4, 12), 8),
				keys: [
					"C",
					"G",
					"F",
					"Bb"
				]
			}
		]
	},
	{
		id: "3.1",
		code: "3.1",
		kicker: "Soprano clef",
		title: "C on the first line",
		summary: "Build soprano clef recognition from its anchor note outward.",
		drills: clefLadder("3.1", "soprano", 0)
	},
	{
		id: "3.2",
		code: "3.2",
		kicker: "Mezzo-soprano clef",
		title: "C on the second line",
		summary: "A second C-clef position, learned without skipping the basics.",
		drills: clefLadder("3.2", "mezzo", 2)
	},
	{
		id: "3.3",
		code: "3.3",
		kicker: "Baritone clef",
		title: "C on the fifth line",
		summary: "The high C-clef position used for baritone writing.",
		drills: clefLadder("3.3", "baritone", 8)
	},
	{
		id: "3.4",
		code: "3.4",
		kicker: "Rare C-clefs",
		title: "Soprano, mezzo, baritone",
		summary: "Switch among the three less familiar C-clef positions.",
		drills: [mixedClefs("3.4.1", "Three C-clefs, four notes each", [
			"soprano",
			"mezzo",
			"baritone"
		], span(0, 8), 4), mixedClefs("3.4.2", "Three C-clefs, every note", [
			"soprano",
			"mezzo",
			"baritone"
		], span(-2, 10))]
	},
	{
		id: "3.5",
		code: "3.5",
		kicker: "All seven clefs",
		title: "Basic fluency",
		summary: "Every standard clef, with a focused range before the final challenges.",
		drills: [mixedClefs("3.5.1", "Seven clefs, four notes each", [
			"treble",
			"bass",
			"alto",
			"tenor",
			"soprano",
			"mezzo",
			"baritone"
		], span(0, 8), 4), mixedClefs("3.5.2", "Seven clefs, every note", [
			"treble",
			"bass",
			"alto",
			"tenor",
			"soprano",
			"mezzo",
			"baritone"
		], span(-2, 10))]
	},
	{
		id: "3.6",
		code: "3.6",
		kicker: "All seven clefs",
		title: "Advanced fluency",
		summary: "Ledger lines and signatures across the complete clef family.",
		drills: [{
			...mixedClefs("3.6.1", "Seven clefs with ledger lines", [
				"treble",
				"bass",
				"alto",
				"tenor",
				"soprano",
				"mezzo",
				"baritone"
			], span(-4, 12), 4),
			keys: [
				"C",
				"G",
				"F",
				"Bb",
				"D"
			]
		}, {
			...mixedClefs("3.6.2", "All signatures and ledger lines", [
				"treble",
				"bass",
				"alto",
				"tenor",
				"soprano",
				"mezzo",
				"baritone"
			], span(-6, 14), 4),
			keys: [
				"C",
				"G",
				"D",
				"A",
				"F",
				"Bb",
				"Eb"
			]
		}]
	},
	{
		id: "3.7",
		code: "3.7",
		kicker: "Challenge",
		title: "Speed and accuracy",
		summary: "A new clef on every note. Read the symbol first, then the pitch.",
		drills: [{
			...mixedClefs("3.7.1", "Random clef every note", [
				"treble",
				"bass",
				"alto",
				"tenor",
				"soprano",
				"mezzo",
				"baritone"
			], span(-4, 12)),
			randomClef: true
		}]
	},
	{
		id: "3.8",
		code: "3.8",
		kicker: "Final boss",
		title: "The complete reader",
		summary: "Full range, all seven clefs, every supported key signature.",
		drills: [{
			...mixedClefs("3.8.1", "Full range, all clefs, all keys", [
				"treble",
				"bass",
				"alto",
				"tenor",
				"soprano",
				"mezzo",
				"baritone"
			], span(-10, 18), 1),
			keys: [
				"C",
				"G",
				"D",
				"A",
				"E",
				"F",
				"Bb",
				"Eb",
				"Ab"
			]
		}]
	}
];
function allDrills() {
	return chapters.flatMap((chapter) => chapter.drills);
}
function findDrill(id) {
	for (const chapter of chapters) {
		const drill = chapter.drills.find((item) => item.id === id);
		if (drill) return {
			chapter,
			drill
		};
	}
}
/**
* Part two should keep the notes already learned on the staff, not only the new ledger notes.
* The ladder helper only accumulates positions it was given, so patch 1.2 after the first step.
*/
function withStaff(drill, staff, clef) {
	const extra = drill.notes.map((note) => note.position);
	const positions = [.../* @__PURE__ */ new Set([...staff, ...extra])].sort((a, b) => a - b);
	return {
		...drill,
		notes: notes(clef, positions)
	};
}
chapters[1].drills = chapters[1].drills.map((drill, index) => index === 0 ? {
	...drill,
	notes: notes("treble", [0, -2]),
	focus: notes("treble", [-2])
} : withStaff(drill, TREBLE_STAFF, "treble"));
function pickPosition(pool, focus, clef, key, rng, last) {
	if (pool.length === 0) throw new Error("Drill has no notes for this clef.");
	const altered = key === "C" ? [] : pool.filter((position) => accidentalFor(letterAt(clef, position), key) !== "natural");
	const roll = rng();
	let source = pool;
	if (focus.length > 0 && roll < .5) source = focus;
	else if (altered.length > 0 && roll < .8) source = altered;
	const choose = (items) => items[Math.floor(rng() * items.length)] ?? items[0];
	let position = choose(source);
	if (pool.length > 1 && last === `${clef}:${position}`) {
		const alt = source.filter((item) => `${clef}:${item}` !== last);
		if (alt.length > 0) position = choose(alt);
	}
	return position;
}
function buildSequence(drill, rng = Math.random) {
	const items = [];
	let clef = drill.clefMode === "fixed" ? drill.clef ?? "treble" : drill.clefOrder?.[0] ?? "treble";
	let clefIndex = 0;
	let keyIndex = 0;
	let key = drill.keys[keyIndex] ?? "C";
	let inGroup = 0;
	let inKey = 0;
	let last = null;
	for (let n = 0; n < 48; n++) {
		if (drill.clefMode === "groups" && inGroup >= drill.clefGroup) {
			if (drill.randomClef && drill.clefOrder && drill.clefOrder.length > 0) {
				const previous = clef;
				const options = drill.clefOrder.filter((candidate) => candidate !== previous);
				clef = options[Math.floor(rng() * options.length)] ?? previous;
			} else if (drill.clefOrder && drill.clefOrder.length > 0) {
				clefIndex = (clefIndex + 1) % drill.clefOrder.length;
				clef = drill.clefOrder[clefIndex] ?? clef;
			} else clef = clef === "treble" ? "bass" : "treble";
			inGroup = 0;
		}
		if (inKey >= drill.keyEvery && drill.keys.length > 1) {
			keyIndex = (keyIndex + 1) % drill.keys.length;
			key = drill.keys[keyIndex] ?? "C";
			inKey = 0;
		}
		const position = pickPosition(drill.notes.filter((note) => note.clef === clef).map((note) => note.position), drill.focus.filter((note) => note.clef === clef).map((note) => note.position), clef, key, rng, last);
		last = `${clef}:${position}`;
		const prev = [...items].reverse().find((item) => item.kind === "note");
		if (prev && prev.kind === "note" && (prev.clef !== clef || prev.key !== key)) items.push({
			kind: "change",
			clef,
			key,
			clefChanged: prev.clef !== clef,
			keyChanged: prev.key !== key
		});
		items.push({
			kind: "note",
			clef,
			position,
			key
		});
		inGroup += 1;
		inKey += 1;
	}
	return items;
}
function addMiss(misses, miss) {
	const found = misses.find((item) => item.clef === miss.clef && item.position === miss.position && item.key === miss.key);
	if (!found) return [...misses, {
		...miss,
		count: 1
	}];
	return misses.map((item) => item === found ? {
		...item,
		count: item.count + 1
	} : item);
}
var MUTE_KEY = "clefring.mute";
function formatTime(ms) {
	const total = Math.max(0, Math.round(ms / 1e3));
	return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}
function reducedMotion() {
	return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function DrillSession({ drill, chapterLabel, onExit, onComplete }) {
	const [items, setItems] = (0, import_react.useState)(null);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [tries, setTries] = (0, import_react.useState)(0);
	const [firstHits, setFirstHits] = (0, import_react.useState)(0);
	const [answered, setAnswered] = (0, import_react.useState)(0);
	const [misses, setMisses] = (0, import_react.useState)([]);
	const [locked, setLocked] = (0, import_react.useState)(false);
	const [wrongId, setWrongId] = (0, import_react.useState)(null);
	const [showHint, setShowHint] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	const [startedAt, setStartedAt] = (0, import_react.useState)(null);
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	const [muted, setMuted] = (0, import_react.useState)(false);
	const [streak, setStreak] = (0, import_react.useState)(0);
	const gen = (0, import_react.useRef)(0);
	const saved = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		setItems(buildSequence(drill));
		setMuted(localStorage.getItem(MUTE_KEY) === "1");
	}, [drill]);
	(0, import_react.useEffect)(() => {
		if (!startedAt || done) return;
		const id = window.setInterval(() => setNow(Date.now()), 250);
		return () => window.clearInterval(id);
	}, [startedAt, done]);
	const current = items?.[index];
	const waitingOnChange = current?.kind === "change";
	(0, import_react.useEffect)(() => {
		if (!items || !waitingOnChange || done) return;
		const wait = reducedMotion() ? 0 : 680;
		const id = window.setTimeout(() => {
			setIndex((value) => Math.min(items.length - 1, value + 1));
		}, wait);
		return () => window.clearTimeout(id);
	}, [
		items,
		index,
		waitingOnChange,
		done
	]);
	(0, import_react.useEffect)(() => {
		if (!done || saved.current || !startedAt) return;
		saved.current = true;
		onComplete(answered === 0 ? 0 : Math.round(firstHits / answered * 100), Date.now() - startedAt);
	}, [
		done,
		startedAt,
		answered,
		firstHits,
		onComplete
	]);
	function toggleMute() {
		setMuted((value) => {
			localStorage.setItem(MUTE_KEY, value ? "0" : "1");
			return !value;
		});
	}
	function restart() {
		gen.current += 1;
		saved.current = false;
		setItems(buildSequence(drill));
		setIndex(0);
		setTries(0);
		setFirstHits(0);
		setAnswered(0);
		setMisses([]);
		setLocked(false);
		setWrongId(null);
		setShowHint(false);
		setDone(false);
		setStartedAt(null);
		setStreak(0);
		setNow(Date.now());
	}
	function pick(letter, acc) {
		if (!items || locked || done || !current || current.kind !== "note") return;
		if (!startedAt) {
			setStartedAt(Date.now());
			setNow(Date.now());
		}
		const want = answerFor(current.clef, current.position, current.key);
		if (letter !== want.letter || acc !== want.acc) {
			if (tries === 0) {
				setMisses((prev) => addMiss(prev, {
					clef: current.clef,
					position: current.position,
					key: current.key
				}));
				setStreak(0);
			}
			setTries((value) => value + 1);
			if (tries + 1 >= 2) setShowHint(true);
			setWrongId(`${letter}:${acc}`);
			if (!muted) playWrong();
			const stamp = gen.current;
			window.setTimeout(() => {
				if (gen.current === stamp) setWrongId(null);
			}, 420);
			return;
		}
		if (tries === 0) {
			setFirstHits((value) => value + 1);
			setStreak((value) => value + 1);
		} else setStreak(0);
		setAnswered((value) => value + 1);
		if (!muted) playMidi(midiOf(current.clef, current.position, want.acc));
		setLocked(true);
		setShowHint(false);
		setTries(0);
		setWrongId(null);
		const stamp = gen.current;
		const wait = reducedMotion() ? 40 : 280;
		window.setTimeout(() => {
			if (gen.current !== stamp) return;
			const next = index + 1;
			if (!items[next]) setDone(true);
			else setIndex(next);
			setLocked(false);
		}, wait);
	}
	(0, import_react.useEffect)(() => {
		function onKey(event) {
			if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
			const key = event.key.toUpperCase();
			if (key.length !== 1 || !"CDEFGAB".includes(key)) return;
			event.preventDefault();
			const fifths = current && "key" in current ? KEYS[current.key].fifths : 0;
			let acc = "natural";
			if (event.shiftKey && fifths > 0) acc = "sharp";
			else if (event.shiftKey && fifths < 0) acc = "flat";
			else if (event.shiftKey) return;
			pick(key, acc);
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	});
	const bounds = boundsOf(drill);
	const activeKey = current?.key ?? drill.keys[0] ?? "C";
	const hint = showHint && current?.kind === "note" ? answerFor(current.clef, current.position, current.key) : null;
	const accuracy = answered === 0 ? 0 : Math.round(firstHits / answered * 100);
	const elapsed = startedAt ? (done ? now : now) - startedAt : 0;
	const shownElapsed = startedAt ? (done ? Date.now() : now) - startedAt : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onExit,
						className: "tap mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full text-ink",
						"aria-label": "Back to chapters",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1 pt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs tracking-wide text-muted",
							children: [
								chapterLabel,
								" · ",
								drill.code
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-xl leading-snug font-medium text-ink sm:text-2xl",
							children: drill.title
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: toggleMute,
						className: "tap mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full text-ink",
						"aria-label": muted ? "Unmute" : "Mute",
						children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffLine, {
				items: items ?? [],
				index,
				minPos: bounds.min,
				maxPos: bounds.max,
				clefs: bounds.clefs
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-accent",
						style: { width: `${answered / 48 * 100}%` }
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "nums text-sm text-muted",
					children: [
						answered,
						"/",
						48,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "px-2 text-ink/30",
							children: "·"
						}),
						formatTime(shownElapsed),
						streak >= 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-accent",
							children: [" · ", streak]
						}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "min-h-6 px-1 text-center text-sm text-muted",
				"aria-live": "polite",
				children: done ? "Line complete." : waitingOnChange && current.kind === "change" ? changeCaption(current.clef, current.key, current.clefChanged, current.keyChanged) : showHint ? "The right letter is lit. Tap it." : wrongId ? "Not that one. The note is still waiting." : "Name the letter. The octave does not change the answer."
			}),
			done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Result, {
				accuracy,
				elapsed: elapsed || shownElapsed,
				misses,
				onAgain: restart,
				onExit
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteRing, {
				keyId: activeKey,
				disabled: !current || current.kind !== "note" || locked,
				wrongId,
				hint,
				onPick: pick
			}), activeKey !== "C" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "hidden text-center text-sm text-muted md:block",
				children: [
					"Letter keys work. Hold Shift for ",
					KEYS[activeKey].fifths > 0 ? "sharps" : "flats",
					"."
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hidden text-center text-sm text-muted md:block",
				children: "Letter keys C through B work too."
			})] })
		]
	});
}
function changeCaption(clef, key, clefChanged, keyChanged) {
	const bits = [];
	if (clefChanged) bits.push(clef === "treble" ? "Treble clef" : "Bass clef");
	if (keyChanged) bits.push(`${KEYS[key].name}, ${keyBlurb(key)}`);
	return bits.join(" · ");
}
function boundsOf(drill) {
	let min = 0;
	let max = 8;
	const clefs = /* @__PURE__ */ new Set();
	for (const note of drill.notes) {
		clefs.add(note.clef);
		min = Math.min(min, note.position);
		max = Math.max(max, note.position);
	}
	for (const key of drill.keys) if (key === "C") continue;
	return {
		min,
		max,
		clefs: [...clefs]
	};
}
function Result({ accuracy, elapsed, misses, onAgain, onExit }) {
	const headline = accuracy === 100 ? "Perfect page." : accuracy >= 85 ? "Solid. The line is starting to sit." : accuracy >= 60 ? "You can read this. A second pass will settle it." : "Stay with this drill. Find the landmark, then the neighbor.";
	const top = [...misses].sort((a, b) => b.count - a.count).slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "sheet px-5 py-6 sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm tracking-wide text-muted",
				children: "First-try names"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display nums text-5xl leading-none font-medium text-ink",
				children: [accuracy, "%"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-pretty text-ink",
				children: headline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "nums mt-1 text-sm text-muted",
				children: formatTime(elapsed)
			}),
			top.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-5 space-y-1.5 text-sm text-ink",
				children: top.map((miss) => {
					const want = answerFor(miss.clef, miss.position, miss.key);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: noteTitle(miss.clef, miss.position, want.acc) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "nums text-muted",
							children: miss.count
						})]
					}, `${miss.clef}-${miss.position}-${miss.key}`);
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-sm text-muted",
				children: "Nothing missed on the first try."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onAgain,
					className: "btn-ink tap inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Same drill, new line"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onExit,
					className: "btn-ghost tap h-12 rounded-full px-5 font-medium",
					children: "Back to chapters"
				})]
			})
		]
	});
}
var KEY = "clefring.v1";
function loadProgress() {
	if (typeof localStorage === "undefined") return {};
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return {};
		const parsed = JSON.parse(raw);
		return parsed && typeof parsed === "object" ? parsed : {};
	} catch {
		return {};
	}
}
function saveProgress(map) {
	localStorage.setItem(KEY, JSON.stringify(map));
}
function recordFinish(map, id, accuracy, ms) {
	const prev = map[id];
	let best = accuracy;
	let bestMs = ms;
	if (prev) {
		if (accuracy > prev.best) {
			best = accuracy;
			bestMs = ms;
		} else if (accuracy === prev.best) {
			best = prev.best;
			bestMs = Math.min(prev.bestMs, ms);
		} else {
			best = prev.best;
			bestMs = prev.bestMs;
		}
	}
	const next = {
		...map,
		[id]: {
			finishes: (prev?.finishes ?? 0) + 1,
			best,
			last: accuracy,
			bestMs
		}
	};
	saveProgress(next);
	return next;
}
function clearProgress() {
	saveProgress({});
	return {};
}
var PASS = 85;
function ClefringApp() {
	const [progress, setProgress] = (0, import_react.useState)({});
	const [open, setOpen] = (0, import_react.useState)("1.1");
	const [drillId, setDrillId] = (0, import_react.useState)(null);
	const [confirmReset, setConfirmReset] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setProgress(loadProgress());
	}, []);
	const next = (0, import_react.useMemo)(() => {
		const drills = allDrills();
		return drills.find((drill) => !progress[drill.id]?.finishes) ?? drills.reduce((weakest, drill) => (progress[drill.id]?.best ?? 0) < (progress[weakest.id]?.best ?? 0) ? drill : weakest);
	}, [progress]);
	const active = drillId ? findDrill(drillId) : void 0;
	if (active) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrillSession, {
		drill: active.drill,
		chapterLabel: `${active.chapter.kicker} · ${active.chapter.title}`,
		onExit: () => {
			setOpen(active.chapter.id);
			setDrillId(null);
		},
		onComplete: (accuracy, ms) => {
			setProgress((prev) => recordFinish(prev, active.drill.id, accuracy, ms));
		}
	});
	const cleared = allDrills().filter((drill) => progress[drill.id]?.finishes).length;
	const total = allDrills().length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "flex items-end justify-between gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm tracking-wide text-muted",
							children: "Levels 1–3 · Seven clefs"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-4xl leading-tight font-medium text-ink sm:text-5xl",
						children: "Read the staff."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-pretty text-muted",
						children: "A line of notes waits. Tap the letter on the ring — naturals outside, sharps or flats inside — and the line moves on."
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "btn-ink tap flex h-14 items-center justify-between rounded-full px-5 text-left",
				onClick: () => setDrillId(next.id),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-xs tracking-wide text-paper/70",
					children: progress[next.id]?.finishes ? "Weakest line" : "Continue"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-display text-lg",
					children: [
						next.code,
						" · ",
						next.title
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "nums text-sm text-paper/80",
					children: [
						cleared,
						"/",
						total
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3",
				children: chapters.map((chapter) => {
					const done = chapter.drills.filter((drill) => progress[drill.id]?.finishes).length;
					const solid = chapter.drills.filter((drill) => (progress[drill.id]?.best ?? 0) >= PASS).length;
					const isOpen = open === chapter.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "sheet overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-center gap-3 px-4 py-4 text-left sm:px-5",
							"aria-expanded": isOpen,
							onClick: () => setOpen(isOpen ? "" : chapter.id),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "nums w-10 shrink-0 font-display text-lg text-accent",
									children: chapter.code
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block font-display text-lg leading-tight font-medium text-ink",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "italic font-normal text-muted",
												children: chapter.kicker
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "px-2 text-ink/25",
												children: "/"
											}),
											chapter.title
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-0.5 block text-sm text-pretty text-muted",
										children: chapter.summary
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "nums hidden text-sm text-muted sm:block",
									children: [
										solid,
										"/",
										chapter.drills.length,
										" solid"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `size-5 shrink-0 text-muted transition-transform ${isOpen ? "rotate-180" : ""}` })
							]
						}), isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "border-t border-ink/10",
							children: chapter.drills.map((drill) => {
								const record = progress[drill.id];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "border-t border-ink/8 first:border-t-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "flex w-full items-center gap-3 px-4 py-3 text-left sm:px-5",
										onClick: () => setDrillId(drill.id),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "nums w-10 shrink-0 text-sm text-muted",
												children: drill.code
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "min-w-0 flex-1 text-pretty text-ink",
												children: drill.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "nums shrink-0 text-sm text-muted",
												children: record ? `${record.best}%` : "—"
											})
										]
									})
								}, drill.id);
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "nums border-t border-ink/10 px-4 py-2 text-xs text-muted sm:hidden",
							children: [
								done,
								"/",
								chapter.drills.length,
								" tried · ",
								solid,
								" solid"
							]
						})]
					}, chapter.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "flex items-center justify-between gap-3 pb-4 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Solid means ",
					PASS,
					"% named on the first try."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "tap underline-offset-2 hover:underline",
					onClick: () => {
						if (!confirmReset) {
							setConfirmReset(true);
							return;
						}
						setProgress(clearProgress());
						setConfirmReset(false);
					},
					children: confirmReset ? "Tap again to reset" : "Reset progress"
				})]
			})
		]
	});
}
function Logo() {
	const gap = 9;
	const height = 46;
	const y = (position) => 8 + (8 - position) * (gap / 2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: 28,
		height,
		"aria-hidden": "true",
		children: [[
			0,
			2,
			4,
			6,
			8
		].map((position) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: 0,
			x2: 28,
			y1: y(position),
			y2: y(position),
			stroke: "var(--color-ink)",
			strokeWidth: 1,
			opacity: .35
		}, position)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClefGlyph, {
			clef: "treble",
			x: 16,
			yRef: y(2),
			gap
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClefringApp, {});
}
//#endregion
export { Home as component };
