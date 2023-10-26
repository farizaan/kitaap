import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'var(--font-poppins)',
    body: 'var(--font-poppins)',
    // heading: `'Poppins', sans-serif`,
    // body: `'Poppins', sans-serif`,
  },
});

export default theme;
