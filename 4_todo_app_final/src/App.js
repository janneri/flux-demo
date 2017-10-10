import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'

import LoadingIndicator from './common/LoadingIndicator';
import TodoPage from './todo/components/TodoPage';
import MainListPage from './mainlist/components/MainListPage';


const Header = () => (
    <header style={{height: '50px'}}>
        <Link to='/'>Home</Link>
        <div>
            <LoadingIndicator />
        </div>
    </header>
);

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={MainListPage}/>
            <Route path='/todos/:listId' component={TodoPage}/>
        </Switch>
    </main>
);

const App = () => (
    <div>
        <Header />
        <Main />
    </div>
);

export default App;



