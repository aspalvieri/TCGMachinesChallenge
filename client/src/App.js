import Header from "./components/partials/header";
import Footer from "./components/partials/footer";
import CardSearch from "./components/pages/cardSearch";

import './App.css';

function App() {
  return (
    <div className="app bg-white w-full flex flex-col min-h-screen">
      <Header />
      <CardSearch />
      <Footer />
    </div>
  );
}

export default App;
