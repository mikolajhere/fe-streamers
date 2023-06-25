import { Route, Routes, BrowserRouter } from "react-router-dom";
import { StreamerDetails } from "./components/StreamerDetails";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import "./style.css";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/streamers/:streamerId"
              element={<StreamerDetails />}
            />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
};
