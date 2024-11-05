import { MainLayOut } from "../layouts/Mainlayout"
import { PurchasesComponent } from "../components/Purchases"

export default function MyPurchases() {
  return (
    <MainLayOut className='h-full'>
      <PurchasesComponent></PurchasesComponent>
    </MainLayOut>
  )
}
