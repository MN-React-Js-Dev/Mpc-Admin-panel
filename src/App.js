import './App.css';
import Footer from './Component/Footer';
import Header from './Component/Navbar/Header';

function App() {
  return (
    <>
      <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
          <Header />
          {/* <Footer/> */}
        </div>
      </div>
    </>
  );
}

export default App;
