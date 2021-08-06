import React, { Component } from 'react'
import { BrowserRouter as Switch, Route} from 'react-router-dom'
import Auth from './pages/Auth';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel'
import Category from './pages/Category'
import Product from './pages/Product'

class App extends Component { 
  render(){
    return(
      <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/auth' component={Auth} />
          <Route exact path='/auth/adminpanel' component={AdminPanel} />
          <Route exact path='/kategoria/:categoryId' component={Category} />
          <Route path='/produkt/:productId' component={Product} />
      </Switch>
    )
  }
}

export default App;
