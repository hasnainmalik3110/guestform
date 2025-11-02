import { useState } from 'react'

import { BrowserRouter as Router,
  Route, Routes
 } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import { FirebaseProvider } from './context/firebase'

function App() {


  return (
    <>
  <FirebaseProvider>
  <Router>
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/admin' element={<Admin/>}/>
    </Routes>
  </Router>
</FirebaseProvider>
    </>
  )
}

export default App
