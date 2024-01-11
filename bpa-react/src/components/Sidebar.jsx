import react from "react"
import ChatNavBar from "./ChatNavBar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <ChatNavBar />
            <Search />
            <Chats />
        </div>
    )
}
export default Sidebar