import React from 'react';

import './App.css';
import ShowList from './components/showList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ExpenseTracker from './components/expenseTracker';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/add' element={<ExpenseTracker onTrue={undefined} onClose={undefined} ></ExpenseTracker>}>

          </Route>
          <Route path='/' element={<ShowList></ShowList>}>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
