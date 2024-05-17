import Navbar from './Header/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import AddUser from './components/AddUser'
import ViewUser from './components/ViewUser'
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/viewUser/:id" element={<ViewUser />} />
      </Routes>
    </Router>
  )
}

export default App
