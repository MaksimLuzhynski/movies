import './App.css';
import '@mantine/core/styles.css';
import '@mantine/core/styles/global.css';
import AllRoutes from './routes';
import { MantineProvider, createTheme } from "@mantine/core";
import { Provider } from 'react-redux';
import { store } from './redux/store';

const theme = createTheme({
  fontFamily: 'Inter',

  breakpoints: {
    xs: '30em',//480
    sm: '48em',//768
    md: '64em',//1024
    lg: '74em',//1184
    xl: '90em',//1440
  },

  headings: {
    sizes: {
      h1: {
        fontWeight: '700',
        lineHeight: '140%',
        fontSize: '32px'
      },
    },
  },
});


export default function App() {

  return (
    <MantineProvider theme={theme} >
      <Provider store={store}>
        <AllRoutes />
      </Provider>
    </MantineProvider>
  );
}