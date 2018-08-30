import React from 'react';
import {Route} from 'react-router-dom';
import {List,Create, Update, Show} from '../components/review/';

export default [
  <Route path='/reviews/create' component={Create} exact={true} key='create'/>,
  <Route path='/reviews/edit/:id' component={Update} exact={true} key='update'/>,
  <Route path='/reviews/show/:id' component={Show} exact={true} key='show'/>,
  <Route path='/reviews/:page?' component={List} strict={true} key='list'/>,
];
