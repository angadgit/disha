import '../styles/globals.css'
// import { SessionProvider } from 'next-auth/react'
import '../styles/DefaultLayout.css'
import NextNProgress from "nextjs-progressbar";
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {

  return (
    <>
      {/* <SessionProvider session={pageProps.session}> */}
        <NextNProgress
          color="#FFA500"
          startPosition={0.3}
          // stopDelayMs={200}
          height={5}
          showOnShallow={true}
        />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      {/* </SessionProvider> */}
    </>
  )
}

export default MyApp

