import React from 'react';
import {Route} from 'react-router-dom';
import {List,Create, Update, Show} from '../components/book/';

export default [
  <Route path='/books/create' component={Create} exact={true} key='create'/>,
  <Route path='/books/edit/:id' component={Update} exact={true} key='update'/>,
  <Route path='/books/show/:id' component={Show} exact={true} key='show'/>,
  <Route path='/books/:page?' component={List} strict={true} key='list'/>,
];
