export default ({ palette, spacing }) => ({
  wrapper: {
    height: 'calc(100vh - 20px)',
    width: 'calc(64vw - 10px)',
    position: 'fixed',
    padding: '10px',
  },

  leaflet: {
    height: '100%',
    width: '100%',
    borderRadius: '10px',
  },

  currentLocation: {
    zIndex: 9999,
    position: 'absolute',
    top: 12,
    left: 52,
    backgroundColor: '#ffffff',
    textTransform: 'inherit',
    '&:hover': {
      backgroundColor: '#f4f4f4',
    },
    '& > span > svg': {
      color: palette.primary.main,
      marginLeft: '-10px',
    },
  }

  // thumbnail: {
  //   width: '30%',
  // },
  // content: {
  //   width: '70%',
  // },
  // title: {
  //   padding: `${spacing.unit / 2}px`,
  // },
  // cuisine: {
  //   padding: `${spacing.unit / 2}px`,
  //   marginBottom: `${spacing.unit * 2}px`,
  // },
  // icon: {
  //   marginBottom: `-${spacing.unit / 2}px`,
  // },
  // bottomContainer: {
  //   color: palette.primary.main,
  //   padding: `${spacing.unit / 2}px`,
  //   marginBottom: `${spacing.unit / 2}px`,
  // },
  // sub: {
  //   fontSize: '10px',
  // }
});
