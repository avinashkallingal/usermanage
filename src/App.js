
import "./App.css";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import userLogged from './authentication/logged'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";





function App() {
  return (
    <div className="App">
      <header className="App-header">
      
       <Router>
        {/* <userLogged> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/home" element={<AdminHome />} /> */}



        </Routes>
        {/* </userLogged> */}

       </Router>
      
      
       
      </header>
    </div>
  );
}

export default App;
