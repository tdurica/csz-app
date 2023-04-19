export const buttonStyles = {
  components: {
    Button: {
      variants: {
        "no-hover": {
          _hover: {
            boxShadow: "none",
          },
        },
        "transparent-with-icon": {
          bg: "transparent",
          fontWeight: "bold",
          borderRadius: "inherit",
          cursor: "pointer",
          _active: {
            bg: "transparent",
            transform: "none",
            borderColor: "transparent",
          },
          _focus: {
            boxShadow: "none",
          },
          _hover: {
            boxShadow: "none",
          },
        },
        "feature": {
          cursor: "pointer",
          position: 'relative',
          zIndex: '0',
          fontWeight:'400',
          fontSize:'20px',
          py:'15px',
          backgroundColor: '#201048',
          bgGradient: 'linear(90deg, red.500, purple.400)',
          width: '240px',
          borderRadius: '6px',
          // transition:'all 0.1s ease-out',
          _before:{
            content:'""', position: 'absolute',
            top: '0', right: '0', bottom: '0', left: '0',
            margin: '3px',
            zIndex: '-1',
            bgColor: '#090a18',
            transition:'all 0.1s ease-out',
            borderRadius: '4px',
          },
          _active: {
            opacity: "0.8",
            // bg: "transparent",
            transform: "none",
            borderColor: "transparent",
          },
          _focus: {
            boxShadow: "none",
          },
          _hover: {
            _before:{
              opacity: "0",
            },
            boxShadow: "none",
            // bg: "transparent",
          },
        },
        "solidPink": {
          cursor: "pointer",
          position: 'relative',
          fontWeight:'400',
          fontSize:'20px',
          py:'15px',
          backgroundColor: '#201048',
          color: 'white',
          bgGradient: 'linear(90deg, red.500, purple.400)',
          width: '240px',
          borderRadius: '6px',
          // transition:'all 0.1s ease-out',
          _active: {
            opacity: "0.8",
            // bg: "transparent",
            transform: "none",
            borderColor: "transparent",
          },
          _focus: {
            boxShadow: "none",
          },
          _hover: {
            boxShadow: "none",
            // bg: "transparent",
          },
        },
        "outlinePink": {
          cursor: "pointer",
          position: 'relative',
          zIndex: '0',
          fontWeight:'400',
          fontSize:'20px',
          py:'15px',
          color: 'black',
          bgGradient: 'linear(90deg, red.500, purple.400)',
          width: '240px',
          borderRadius: '6px',
          // transition:'all 0.1s ease-out',
          _before:{
            content:'""', position: 'absolute',
            top: '0', right: '0', bottom: '0', left: '0',
            margin: '2px',
            zIndex: '-1',
            bgColor: 'white',
            transition:'all 0.1s ease-out',
            borderRadius: '4px',
          },
          _active: {
            opacity: "0.8",
            // bg: "transparent",
            transform: "none",
            borderColor: "transparent",
          },
          _focus: {
            boxShadow: "none",
          },
          _hover: {
            color: 'white',
            _before:{
              opacity: "0",
            },
            boxShadow: "none",
            // bg: "transparent",
          },
        },
      },
      baseStyle: {
        borderRadius: "7px",
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
};
