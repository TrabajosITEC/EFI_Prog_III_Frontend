import { MainLayOut } from "../layouts/Mainlayout";
import GameDetail from "../components/GameDetail";
import Reviews from "../components/Reviews";

export default function GamePage() {

  return (
    <MainLayOut className="h-full">
      <GameDetail />
      <Reviews />
    </MainLayOut>
  );
}
