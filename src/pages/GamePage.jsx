import { MainLayOut } from "../layouts/Mainlayout"
import GameDetail from "../components/GameDetail"

export default function GamePage() {

  return (
    <MainLayOut className='h-full'>
      <GameDetail />
    </MainLayOut>
  )
}
