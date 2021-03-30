import App, { AppContext } from 'next/app';
import GlobalStyle from '@components/styled-components/Global-Style';
import { StylesProvider } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';
import useDidMount from 'src/hooks/dom/component.didmount.hook';
import { appWithTranslation } from 'src/i18n';
import { ThemeProvider } from 'styled-components';
import StoreTypeObj from '@typescript/types/shared/redux/thunk/Store-Type';
import { getProjectDetail } from '@redux/actions/project-detail';
import { store } from '@redux/store';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import theme from '../theme';

const MyApp = ({ Component, pageProps }) => {
  useDidMount(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  });
  return (
    <Provider store={store}>
      <Head>
        <title>Patrik Duch, Enterprise Solutions Architect</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <StylesProvider injectFirst>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </StylesProvider>
    </Provider>

  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { store } = appContext.ctx;
  console.log('test');
  console.log(store);
  await (store as StoreTypeObj).dispatch(getProjectDetail());

  const pageProps = await App.getInitialProps(appContext);
  return { pageProps };
};

// makeStore function that returns a new store for every request
const makeStore = () => { return store; };

export default withRedux(makeStore)(appWithTranslation(MyApp));