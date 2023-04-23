import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionDetails from './transactionDetails/TransactionDetails';
import PolygonDetails from './polygon/PolygonDetails'
import NotFound from './notFound/NotFound';
import Home from './home/Home';
import Navbar from './navbar/Navbar';
import Polygon from './polygon/Polygon';

function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/polygon" element={<Polygon />} />
          <Route path="/transactionDetails/:hash" element={<TransactionDetails />} />
          <Route path="/polygonDetails/:hash" element={<PolygonDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

