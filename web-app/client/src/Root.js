import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom';
import Register from './components/register/Register';

export default function Root() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Register} />
        </BrowserRouter>
    )
}
