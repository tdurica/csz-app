/* Metal ------------------------- */

export const metal = {
  // position: "relative",
  // margin: "40px auto",
  outline: "none",
  color: "hsla(0,0%,20%,1)",
  textShadow: "hsla(0,0%,40%,.5) 0 -1px 0, hsla(0,0%,100%,.6) 0 2px 1px",
  backgroundColor: "hsl(0,0%,90%)",
  boxShadow:
    "inset hsla(0,0%,15%,  1) 0  0px 0px 4px," +
    "inset hsla(0,0%,15%, .8) 0 -1px 5px 4px," +
    "inset hsla(0,0%,0%, .25) 0 -1px 0px 7px," +
    "inset hsla(0,0%,100%,.7) 0  2px 1px 7px," +
    "hsla(0,0%, 0%,.15) 0 -5px 6px 4px," +
    "hsla(0,0%,100%,.5) 0  5px 6px 4px",
  transition: "color .2s",
}



/* Radial ------------------------- */
const metalRadialBeforeAfter = {
  content: '',
  top: '0',
  left: '0',
  position: 'absolute',
  width: 'inherit',
  height: 'inherit',
  borderRadius: 'inherit',
  /* fake conical gradients */
  backgroundImage: `-webkit-radial-gradient( 50% 0%, 10% 50%, hsla(0,0%,0%,.1) 0%, hsla(0,0%,0%,0) 100%),
  -webkit-radial-gradient(  50% 100%, 10% 50%, hsla(0,0%,0%,.1) 0%, hsla(0,0%,0%,0) 100%),
  -webkit-radial-gradient(   0%  50%, 50% 10%, hsla(0,0%,0%,.1) 0%, hsla(0,0%,0%,0) 100%),
  -webkit-radial-gradient( 100%  50%, 50% 06%, hsla(0,0%,0%,.1) 0%, hsla(0,0%,0%,0) 100%)`
}
const metalRadialBefore = {
  ...metalRadialBeforeAfter,
  transform: "rotate( 65deg)"
}
const metalRadialAfter = {
  ...metalRadialBeforeAfter,
  transform: "rotate(-65deg)"
}
export const metalRadial = {
  ...metal,
  width: "160px",
  height: "160px",
  lineHeight: "160px",
  borderRadius: "80px",
  backgroundImage:
    "-webkit-radial-gradient(  50%   0%,  8% 50%, hsla(0,0%,100%,.5) 0%, hsla(0,0%,100%,0) 100%)," +
    "-webkit-radial-gradient(  50% 100%, 12% 50%, hsla(0,0%,100%,.6) 0%, hsla(0,0%,100%,0) 100%)," +
    "-webkit-radial-gradient(   0%  50%, 50%  7%, hsla(0,0%,100%,.5) 0%, hsla(0,0%,100%,0) 100%)," +
    "-webkit-radial-gradient( 100%  50%, 50%  5%, hsla(0,0%,100%,.5) 0%, hsla(0,0%,100%,0) 100%)," +
    "-webkit-repeating-radial-gradient( 50% 50%, 100% 100%, hsla(0,0%,  0%,0) 0%, hsla(0,0%,  0%,0)   3%, hsla(0,0%,  0%,.1) 3.5%)," +
    "-webkit-repeating-radial-gradient( 50% 50%, 100% 100%, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0)   6%, hsla(0,0%,100%,.1) 7.5%)," +
    "-webkit-repeating-radial-gradient( 50% 50%, 100% 100%, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0) 1.2%, hsla(0,0%,100%,.2) 2.2%)," +
    "-webkit-radial-gradient( 50% 50%, 200% 50%, hsla(0,0%,90%,1) 5%, hsla(0,0%,85%,1) 30%, hsla(0,0%,60%,1) 100%)",
  _before:{
    ...metalRadialBefore
  },
  _after:{
    ...metalRadialAfter
  }
}






/* Linear ------------------------- */

export const sxMetalLinear = {
  ...metal,
  // width: "100px",
  // fontSize: "4em",
  // height: "80px",
  borderRadius: ".5em",
  backgroundImage:
    "-webkit-repeating-linear-gradient(left, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0)   6%, hsla(0,0%,100%, .1) 7.5%)," +
    "-webkit-repeating-linear-gradient(left, hsla(0,0%,  0%,0) 0%, hsla(0,0%,  0%,0)   4%, hsla(0,0%,  0%,.03) 4.5%)," +
    "-webkit-repeating-linear-gradient(left, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0) 1.2%, hsla(0,0%,100%,.15) 2.2%)," +
    "linear-gradient(180deg, hsl(0,0%,78%) 0%, hsl(0,0%,90%) 47%, hsl(0,0%,78%) 53%, hsl(0,0%,70%)100%)"
}


/* Oval ------------------------- */

export const sxMetalLinearOval = {
  marginTop: "100px",
  width: "70px",
  height: "60px",
  lineHeight: "60px !important",
  borderRadius: "50%",
  font: 'italic bold 3em/50px Georgia, "Times New Roman", Times, serif'
}




/* active ------------------------- */
export const sxMetalActive = {
  _active: {
    color: `hsl(0, 0%, 64%)`,
    textShadow: `hsla(210,100%,20%,.3) 0 -1px 0, 
                 hsl(210,100%,85%) 0 2px 1px, 
                 hsla(200,100%,80%,1) 0 0 5px, 
                 hsla(210,100%,50%,.6) 0 0 20px`,
    boxShadow:
      `inset hsla(210,100%,30%,  1) 0  0px 0px 4px,` /* border */
      +`inset hsla(210,100%,15%, .4) 0 -1px 5px 4px,` /* soft SD */
      +`inset hsla(210,100%,20%,.25) 0 -1px 0px 7px,` /* bottom SD */
      +`inset hsla(210,100%,100%,.7) 0  2px 1px 7px,` /* top HL */

      +`hsla(210,100%,75%, .8) 0  0px 3px 2px,` /* outer SD */
      +`hsla(210,50%,40%, .25) 0 -5px 6px 4px,` /* outer SD */
      +`hsla(210,80%,95%,   1) 0  5px 6px 4px` /* outer HL */
  }
}
