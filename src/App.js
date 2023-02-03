import './App.css';
import Footer from './Component/Footer';
import Home from './Component/Home';
import Header from './Component/Navbar/Header';
import SmallNav from './Component/Navbar/SmallNav';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
function App() {
  return (
    <>
      <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
          <Header />
          <div class="layout-page">
            <SmallNav />
            <Routes>
              <Route exact path='/' element={< Home />}></Route>
            </Routes>
            <Footer />
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
