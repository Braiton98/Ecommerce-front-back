/* eslint-disable react/jsx-no-target-blank */

import './App.css'
import Navbar from './Navbar/Navbar'
import Developers from './Developers/ApiDevelopers'
import Tags from './Tags/ApiTags'
import Game from './Game/Game'
import NotFound from './NotFound/NotFound'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import ApiGames from './Games/ApiGames'
import Search from './Search/Search'
import BackGameInfo from './BackGameInfo/BackGameInfo'
import FormCreate from './CRUD/create'
import FormUpdate from './CRUD/update'
import LoginPage from './Login/LoginPage'
import Register from './Login/Register'

function App() {

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const shouldShowHeader = !["/", "/register"].includes(location.pathname);

  return (
    <>
      {shouldShowHeader && (
        <header>
          <Navbar />
        </header>
      )}

      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/games" element={<ApiGames />} />
        <Route path="/Developers" element={<Developers />} />
        <Route path="/Tags" element={<Tags />} />
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="/detailgame/:id" element={<Game />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/MoreGames" element={<BackGameInfo />} />
        <Route path="/MoreGames/create" element={<FormCreate />} />
        <Route path="/MoreGames/update/:id" element={<FormUpdate />} />
      </Routes>
    </>
  );
}

export default App