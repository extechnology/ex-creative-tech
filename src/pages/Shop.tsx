import ShopHero from "@/components/shop/ShopHero"
import ProductsSection from "@/components/shop/Product"


export default function Shop() {

    return (

        <div className="bg-[#050505] min-h-screen text-white overflow-x-hidden font-sans selection:bg-red-500 selection:text-white">


            <ShopHero />


            {/* Section Separator */}
            <div className="max-w-7xl mx-auto px-5 lg:px-8">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>


            <ProductsSection />


        </div>

    )

}