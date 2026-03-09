import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
  colors: {
    brand: {
      50: '#E6FFFA',
      100: '#B2F5EA',
      500: '#319795',
      900: '#234E52',
    },
  },
});

export default theme;