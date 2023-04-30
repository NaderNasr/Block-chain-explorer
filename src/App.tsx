import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionDetails from './ethereum/TransactionDetails';
import PolygonDetails from './polygon/PolygonDetails'
import NotFound from './notFound/NotFound';
import Home from './ethereum/Home';
import Navbar from './navbar/Navbar';
import Polygon from './polygon/Polygon';
import MetaMask from './metamask/MetaMask';
import Choice from './choice/Choice';
import Landing from './landing/Landing';

function App() {

  return (
    <div>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/choose" element={<Choice />} />
          <Route path="/polygon" element={<Polygon />} />
          <Route path="/transactionDetails/:hash" element={<TransactionDetails />} />
          <Route path="/polygonDetails/:hash" element={<PolygonDetails />} />
          <Route path="/metamask" element={<MetaMask title='Connect to Meta Mask'/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

