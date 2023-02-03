import './App.css';
import Footer from './Component/Footer';
import Home from './Component/Home';
import Header from './Component/Navbar/Header';
import SmallNav from './Component/Navbar/SmallNav';

function App() {
  return (
    <>
      <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
          <Header />
          <div class="layout-page">
            <SmallNav />
            <Home />
            <Footer />
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
