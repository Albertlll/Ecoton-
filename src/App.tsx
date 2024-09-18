import { Navbar } from "./components/Shared/Navbar/Navbar"
import { Creature } from "./components/Pages/Creature/Creature"
import { useState } from "react"
import WebcamComponent from "./components/Pages/Camera/Camera"

function App() {

  const [pageIndex, setPageIndex] = useState<number>(0)

  return (
    <>
      <WebcamComponent/>
      <Navbar setPageIndex={setPageIndex} pageIndex={pageIndex}/>
    </>
  )
}

export default App
