import React from 'react';
import Header from './components/Header/Header.tsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import Catalog from './components/Main/Catalog/Catalog.tsx';
import About from './components/Main/About/About.tsx';
import Authorization from './components/Main/Authorization/Authorization.tsx';
import Dino from './components/Games/Dino/Dino';
import Bird from './components/Games/Bird/Bird';
import { initializeApp } from 'firebase/app';
import Dodge from './components/Games/Dodge/Dodge';
import Footer from './components/Footer/Footer.tsx';

function App() {

const firebaseConfig = {
    apiKey: "AIzaSyBycQoE5ODQa4JkXDXU5INlM5kDNNA9cHo",
    authDomain: "petproject-d4ac7.firebaseapp.com",
    databaseURL: "https://petproject-d4ac7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "petproject-d4ac7",
    storageBucket: "petproject-d4ac7.appspot.com",
    messagingSenderId: "374859257345",
    appId: "1:374859257345:web:ef1afbf6878dc61da11200"
};
const app = initializeApp(firebaseConfig);

  return (
    <div className="App">
      <Header />
      <main className='main_container'>
        <div className='main_border'>
          <Routes>
            <Route path='/' element={<Catalog />} />    
            <Route path='/about' element={<About />} />  
            <Route path='/authorization' element={<Authorization />} />
            <Route path='/Charmander' element={<Dino />} />
            <Route path='/Charizard' element={<Bird />} />
            <Route path='/Dodge' element={<Dodge />} />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>  
  );
}

export default App;
