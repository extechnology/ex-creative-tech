import ShopHero from "@/components/shop/ShopHero"
import ProductsSection from "@/components/shop/Product"
import ShopCTASection from "@/components/shop/CtaShop"


export default function Shop() {

    return (

        <div className="bg-[#050505] min-h-screen text-white overflow-x-hidden font-sans selection:bg-red-500 selection:text-white">


            <ShopHero />


            <ProductsSection />


            <ShopCTASection />


        </div>

    )

}