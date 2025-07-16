import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RegistrationForm from './Components/Forms/RegisterForm';
import LoginForm from './Components/Forms/LoginForm';
import { UserProfileForm } from './Components/Forms';
import Layout from './Components/Common/Layout';
import { LandingPage } from './Components/Common';
import { LightControl } from './Components/Controls';
import SoilMoistureControl from './Components/Controls/SoilMoistureControl';
import WaterSupplyControl from './Components/Controls/WaterSupplyControl';
import Dashboard from './Components/Dashboard/DashboardGrid';

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication routes */}
        <Route element={<Layout/>}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<UserProfileForm />} />
          <Route path="/light" element={<LightControl />} />
          <Route path="/soil-moisture" element={<SoilMoistureControl />} />
          <Route path="/water-supply" element={<WaterSupplyControl />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;