import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Error, Home, Register, ProtectedRoute,ProtectedPagesRoute } from './pages'
import { Profile, AdminPage, AllPets, AddPet, SharedLayout } from './pages/side-bar-pages'

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/dashboard' element={<ProtectedRoute><SharedLayout /></ProtectedRoute>}>
          <Route index element={<AllPets />} />
          <Route path='stats' element={<ProtectedPagesRoute><AdminPage/></ProtectedPagesRoute>} />
          <Route path='add-pet' element={<ProtectedPagesRoute><AddPet /></ProtectedPagesRoute>} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
