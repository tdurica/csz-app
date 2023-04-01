import "@fontsource/raleway/300.css"
import "@fontsource/raleway/500.css"
import "@fontsource/raleway/700.css"
import "@fontsource/raleway/900.css"
import "@fontsource/montserrat/300.css"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/700.css"
import "@fontsource/montserrat/900.css"
import "@fontsource/fira-code"


export const fontsTheme = {
  fonts: {
    body: 'Montserrat, Helvetica, sans-serif',
    rale: 'Raleway, Helvetica, sans-serif',
    mont: 'Montserrat, Helvetica, sans-serif',
    mono: "Menlo, monospace",
    fira: "Fira Code, monospace",
  },
  fontWeights: {
    rale: { light: 300, medium: 500, bold: 700, heavy: 900, },
    mont: { light: 300, medium: 500, bold: 700, heavy: 900, },
  },
}

function buildFontTree( famStr, weightsObj, sizesObj, rv = {} ){
  for(let [wKey,wVal] of Object.entries(weightsObj)){rv[wKey] = {};
    for(let [sKey,sVal] of Object.entries(sizesObj)){rv[wKey][sKey] = {
        fontFamily: famStr, fontWeight:wVal, fontSize:sVal }}}
  return rv;
}
const montFam = 'mont'
const raleFam = 'mont'
const w = {
  lt:300,
  md:500,
  bd:700,
  hv:900,
};
const s = {
  xs:'.6rem',
  sm:'.8rem',
  md:'.9rem',
  lg:'1.2rem',
  xl:'1.5rem',
}
/** a shorthand which spreads 3 css object props for the font Montserrat
 * @interface mont.[lt|md|bd|hv].[xs|sm|md|lg|xl],
 * @description { ...mont.weightKey.sizeKey, }
 * @example { ...mont.hv.lg, }
 * @example { ...mont.md.xs, }
 * @example { ...mont.lt.xl, }
 * */
export const mont = {
  lt: {
    xs: { fontFamily: montFam, fontWeight:w.lt, fontSize: s.xs},
    sm: { fontFamily: montFam, fontWeight:w.lt, fontSize: s.sm},
    md: { fontFamily: montFam, fontWeight:w.lt, fontSize: s.md},
    lg: { fontFamily: montFam, fontWeight:w.lt, fontSize: s.lg},
    xl: { fontFamily: montFam, fontWeight:w.lt, fontSize: s.xl},
  },
  md: {
    xs: { fontFamily: montFam, fontWeight:w.md, fontSize: s.xs},
    sm: { fontFamily: montFam, fontWeight:w.md, fontSize: s.sm},
    md: { fontFamily: montFam, fontWeight:w.md, fontSize: s.md},
    lg: { fontFamily: montFam, fontWeight:w.md, fontSize: s.lg},
    xl: { fontFamily: montFam, fontWeight:w.md, fontSize: s.xl},
  },
  bd: {
    xs: { fontFamily: montFam, fontWeight:w.bd, fontSize: s.xs},
    sm: { fontFamily: montFam, fontWeight:w.bd, fontSize: s.sm},
    md: { fontFamily: montFam, fontWeight:w.bd, fontSize: s.md},
    lg: { fontFamily: montFam, fontWeight:w.bd, fontSize: s.lg},
    xl: { fontFamily: montFam, fontWeight:w.bd, fontSize: s.xl},
  },
  hv: {
    xs: { fontFamily: montFam, fontWeight:w.hv, fontSize: s.xs},
    sm: { fontFamily: montFam, fontWeight:w.hv, fontSize: s.sm},
    md: { fontFamily: montFam, fontWeight:w.hv, fontSize: s.md},
    lg: { fontFamily: montFam, fontWeight:w.hv, fontSize: s.lg},
    xl: { fontFamily: montFam, fontWeight:w.hv, fontSize: s.xl},
  },
}

/** a shorthand which spreads 3 css object props for the font Raleway
 * @interface rale.[lt|md|bd|hv].[xs|sm|md|lg|xl],
 * @description { ...rale.weightKey.sizeKey, }
 * @example { ...rale.hv.lg, }
 * @example { ...rale.md.xs, }
 * @example { ...rale.lt.xl, }
 * */
export const rale = {
  lt: {
    xs: { fontFamily: raleFam, fontWeight:w.lt, fontSize: s.xs},
    sm: { fontFamily: raleFam, fontWeight:w.lt, fontSize: s.sm},
    md: { fontFamily: raleFam, fontWeight:w.lt, fontSize: s.md},
    lg: { fontFamily: raleFam, fontWeight:w.lt, fontSize: s.lg},
    xl: { fontFamily: raleFam, fontWeight:w.lt, fontSize: s.xl},
  },
  md: {
    xs: { fontFamily: raleFam, fontWeight:w.md, fontSize: s.xs},
    sm: { fontFamily: raleFam, fontWeight:w.md, fontSize: s.sm},
    md: { fontFamily: raleFam, fontWeight:w.md, fontSize: s.md},
    lg: { fontFamily: raleFam, fontWeight:w.md, fontSize: s.lg},
    xl: { fontFamily: raleFam, fontWeight:w.md, fontSize: s.xl},
  },
  bd: {
    xs: { fontFamily: raleFam, fontWeight:w.bd, fontSize: s.xs},
    sm: { fontFamily: raleFam, fontWeight:w.bd, fontSize: s.sm},
    md: { fontFamily: raleFam, fontWeight:w.bd, fontSize: s.md},
    lg: { fontFamily: raleFam, fontWeight:w.bd, fontSize: s.lg},
    xl: { fontFamily: raleFam, fontWeight:w.bd, fontSize: s.xl},
  },
  hv: {
    xs: { fontFamily: raleFam, fontWeight:w.hv, fontSize: s.xs},
    sm: { fontFamily: raleFam, fontWeight:w.hv, fontSize: s.sm},
    md: { fontFamily: raleFam, fontWeight:w.hv, fontSize: s.md},
    lg: { fontFamily: raleFam, fontWeight:w.hv, fontSize: s.lg},
    xl: { fontFamily: raleFam, fontWeight:w.hv, fontSize: s.xl},
  },
}
export const fira = {
  fontFamily: "Fira Code",
}

// /** rale.[lt|md|bd|hv].[xs|sm|md|lg|xl] */
// export const rale = buildFontTree(raleFam,montWeights,montSizes)
// /** mont.[lt|md|bd|hv].[xs|sm|md|lg|xl]**/
// export const mont = buildFontTree(montFam,montWeights,montSizes)
// /** rale.[lt|md|bd|hv].[xs|sm|md|lg|xl]**/
// export const rale = buildFontTree(raleFam,montWeights,montSizes)
