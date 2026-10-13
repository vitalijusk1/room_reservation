import { Provider } from "react-redux";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { store } from "./store";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <nav className="flex gap-4 bg-white p-4 shadow-sm">
            <Link to="/" className="font-medium text-blue-600 hover:underline">
              Home
            </Link>
            <Link
              to="/rooms"
              className="font-medium text-blue-600 hover:underline"
            >
              Rooms
            </Link>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
