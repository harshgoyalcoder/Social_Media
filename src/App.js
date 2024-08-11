import { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/register";
import Messenger from "./pages/messenger/Messenger";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  // const user=false;
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route exact path="/" element={ user?<Home/> :<Register/> } /> */}
        {/* <Route exact path="/profile/:username" element={<Profile />} /> */}
        {/* <Route path="/login" element={user ? <Home /> : <Login />} /> */}
        {/* <Route path="/register" element={user ? <Home /> : <Register />} /> */}
        {/* <Route path="/messenger" element={!user ? <Home /> : <Messenger />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
