import { MainLayOut } from "../layouts/Mainlayout"
import Home from "../components/Home"

export default function HomePage() {

  return (
    <MainLayOut className='h-full'>
      <Home></Home>
    </MainLayOut>
  )
}
