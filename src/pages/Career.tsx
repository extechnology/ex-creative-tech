import CareerHero from "@/components/career/CareerHero"
import JobOpenings from "@/components/career/Jobs"


export default function Career() {

    return (

        <div className="bg-[#050505] min-h-screen text-white overflow-x-hidden font-sans selection:bg-red-500 selection:text-white">

            <CareerHero />

            {/* Section Separator */}
            <div className="max-w-7xl mx-auto px-5 lg:px-8">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <JobOpenings />

        </div>


    )

}