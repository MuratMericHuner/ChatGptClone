import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Header from './Header';
import './index.css';
import ImageGenerator from './ImageGenerator'
import SQLGenerator from './SQLGenerator'
import {BrowserRouter,Route, Routes} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/images" element={<ImageGenerator/>}/>
            <Route path='/sequel' element={<SQLGenerator/>}/>
        </Routes>
    </BrowserRouter>
);
