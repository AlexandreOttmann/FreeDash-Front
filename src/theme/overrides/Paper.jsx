// ----------------------------------------------------------------------

export default function Paper() {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(3px)',
        },
      },
    },
  };
}
