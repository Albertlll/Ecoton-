
import {Camera, House, TableProperties} from "lucide-react"
import {d1, d2, d3} from "./NavbarStates/NavbarStates"
import SVGMorph from "./SVGMorph"

const output = [d1, d2, d3]



export const Navbar = (props : {setPageIndex : React.Dispatch<React.SetStateAction<number>>,  pageIndex : number}) => {

    const setPageIndexHandler = (num : number) => {
        console.log(num)
        props.setPageIndex(num)

    }



    


    // const { d } = useSpring({config: {duration : 200}, d : props.pageIndex == 0 ? d1 : props.pageIndex == 1 ? d2 : d3})
    // z-10 flex w-full px-10 h-14 fixed bottom-4 top-auto


    return (
        <div className="w-full flex items-center justify-center fixed bottom-4 top-auto">

            <svg width="274" height="87" viewBox="0 0 274 87">

                <SVGMorph paths={output} pageIndex={props.pageIndex}/>
 
            </svg>



                {/* <img src={menuStateOne} className="" alt="" /> */}

                <div className="absolute p-2 flex w-[274px] h-full items-center z-20 justify-around">
                    <button onClick={() => setPageIndexHandler(0)}>
                        <House color="white"/>
                    </button>

                    <button onClick={() => setPageIndexHandler(1)}>
                        <Camera color="white"/>
                    </button>
                    
                    <button onClick={() => setPageIndexHandler(2)}>
                        <TableProperties color="white"/>
                    </button>
                </div>




        </div>
    )
}

