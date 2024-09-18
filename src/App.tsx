import { Navbar } from "./components/Shared/Navbar/Navbar"
import { Creature } from "./components/Pages/Creature/Creature"
import { useState } from "react"
import WebcamComponent from "./components/Pages/Camera/Camera"
import AdminPanel from "./components/Pages/AdminPanel/AdminPanel"
import { BrowserRouter } from "react-router-dom"

function App() {

  const [pageIndex, setPageIndex] = useState<number>(0)

  return (
    <BrowserRouter>
      <AdminPanel/>
      <Navbar setPageIndex={setPageIndex} pageIndex={pageIndex}/>
    </BrowserRouter>
  )
}

export default App
