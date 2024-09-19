import { Navbar } from "./components/Shared/Navbar/Navbar"
import { Creature } from "./components/Pages/Creature/Creature"
import { useState } from "react"
import WebcamComponent from "./components/Pages/Camera/Camera"
import AdminPanel from "./components/Pages/AdminPanel/AdminPanel"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import RareSpicesList from "./components/Pages/RareSpicesList/RareSpicesList"
function App() {

  const [pageIndex, setPageIndex] = useState<number>(0)

  return (    

    <>
    
    
    <BrowserRouter>
    <Routes>
      <Route path="/admin" element={<AdminPanel/>} />
      <Route path="/camera" element={<WebcamComponent/>} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
    </BrowserRouter>
      <Navbar setPageIndex={setPageIndex} pageIndex={pageIndex}/>
      </>

)
}

export default App
