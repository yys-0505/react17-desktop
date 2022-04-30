import React from 'react'
import ReactDOM from 'react-dom'
import { store } from 'store'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { FullPageLoading } from 'components/full-page-loading'
import App from './App'
import 'common/less/index.less'

import.meta.env.PROD && (process.env.NODE_ENV = 'production')

const Entry = (
  // <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <React.Suspense fallback={<FullPageLoading />}>
          <App />
        </React.Suspense>
      </HashRouter>
    </Provider>
  // </React.StrictMode>
);

ReactDOM.render(Entry, document.getElementById('root'))
