import './App.css';
import {Route , Routes} from "react-router-dom";
import LandingPage from './Componentes/LandingPage/LandingPage'
import Home from "./Componentes/Home/Home";
import CreatingDog from "./Componentes/FormDogCreate/FormDogCreate";
import DogDetails from './Componentes/DogDetails/DogDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/dog" element={<CreatingDog/>}/>
        <Route exact path="/dogs/:id" element={<DogDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
