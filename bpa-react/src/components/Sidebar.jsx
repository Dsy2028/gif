import react from "react";
import ChatNavBar from "./ChatNavBar";
import Search from "./Search";

const Sidebar = () =>{
    return(
        <div className='sidebar'>
            <ChatNavBar/>
            <Search/>
        </div>
    )
}
export default Sidebar