import React from 'react';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Catalog from './components/Main/Catalog/Catalog';
import About from './components/Main/About/About';
import Authorization from './components/Main/Authorization/Authorization';
import Dino from './components/Games/Dino/Dino';
// import Next from './components/Games/Next';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <main className='main_container'>
        <div className='main_border'>
          <Routes>
            <Route path='/' element={<Catalog />} />    
            <Route path='/about' element={<About />} />  
            {/* <Route path='/authorization' element={<Authorization />} /> */}
            <Route path='/Dino%20tyrannosaur%20game!' element={<Dino />} />
            {/* <Route path='/Next%20game' element={<Next />} /> */}
          </Routes>
        </div>
      </main>
    </div>
  </BrowserRouter>
  );
}

export default App;
