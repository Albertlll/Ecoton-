import { ArrowLeft } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import image from "./image copy.png"

export const Creature = () => {
    return (
        <div className="bg-[#48D0B0] w-full h-full relative">
            
            <ArrowLeft color="white" className="w-[40px] absolute h-auto mt-[30px] ml-[33px]"/>                
        
            <h1 className="absolute mt-[101px] ml-[33px]"> Лазарев</h1>
            <AnimatePresence>
                <motion.div initial={{ y: 300 }}
        animate={{ y: 0 }} className="rounded-t-[30px] bg-white h-1/2 w-full bottom-0 top-auto absolute">
                    <img  src={image} alt="" className=" object-cover rounded-lg h-[200px] w-[200px] bg-[#c2c2c2] -mt-[150px] relative ml-auto mr-auto">
                        
                    </img>
                    <div className="relative ml-10 mt-4 w-fit">
                    
                        <h2 className="border-b-[3px] border-[#63D048]">О птице</h2>

                        


                    </div>

                </motion.div>

            </AnimatePresence>

        
        </div>
    )
}