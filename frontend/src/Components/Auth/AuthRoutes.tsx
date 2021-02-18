import React from 'react'
import { Route, useLocation } from 'react-router'
import Login from './Login'
import Register from './Register'
import Switch from 'react-bootstrap/esm/Switch'
import { BrowserRouter } from 'react-router-dom'

export default function AuthRoutes() {



    return (
        <>
            <BrowserRouter>
                <>
                    <Switch>
                        <Route path="/register" component={Register}></Route>
                        <Route exact path="/" component={Login}></Route>
                    </Switch>
                </>
            </BrowserRouter>
        </>
    )
}
