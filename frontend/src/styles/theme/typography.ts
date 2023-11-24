export const typography = {
  fontFamily:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  colors: {
    primary: '#47404f',
    secondary: '#332e38',
  },
  heading: {
    h1: {
      fontSize: '56px',
      fontWeight: 700,
      lineHeight: '67.5px',
    },
    h2: {
      fontSize: '40px',
      fontWeight: 700,
      lineHeight: '48px',
    },
    h3: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: '40px',
    },
    h4: {
      fontSize: '22px',
      fontWeight: 500,
      lineHeight: '32px',
    },
  },
  caption: {
    fontSize: '12px',
    fontWeight: 700,
    lineHeight: '16px',
  },
  headline: {
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '32px',
  },
  subheadline: {
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: '24px',
  },
  button: {
    fontSize: '18px',
    fontWeight: 400,
  },
} as const;
