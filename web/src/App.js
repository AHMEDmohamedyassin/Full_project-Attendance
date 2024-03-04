import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import HeaderComp from "./Components/Public/HeaderComp";
import LecturesPage from "./Pages/Teacher/LecturesPage";
import PageTitle from "./Components/Public/PageTitle";
import DetailsPage from "./Pages/Teacher/DetailsPage";

function App() {
  return (
    <BrowserRouter>
      <HeaderComp/>
      <PageTitle/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/lectures" element={<LecturesPage/>} />
        <Route path="/details" element={<DetailsPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
