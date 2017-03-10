import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import ArticleForm from './components/home/article-form'

import configureStore from './redux/common/configureStore';
const store = configureStore();

render(
  <Provider store={store}>
    <ArticleForm />
  </Provider>,
  document.getElementById('root')
);