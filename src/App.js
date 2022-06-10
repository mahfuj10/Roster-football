import React, { useRef, useEffect } from 'react';
import './App.css';
import { useForm } from 'react-hook-form';
import { parse } from "papaparse";
import Layout from './components/Layout/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TeamOverview from './components/TeamOverview/TeamOverview';



function App() {




  return (

    <>


      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Layout />} />
          <Route path='/teamoverview' element={<TeamOverview />} />

        </Routes>

      </BrowserRouter>

    </>
  );
}

export default App;
