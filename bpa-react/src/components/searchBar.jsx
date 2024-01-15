import { Link } from 'react-router-dom';
import '../index.css'
import { useState } from 'react'
import data from './MOCK_DATA'




export default function searchBar() {
  const [value, setValue] = useState('');
const onChange = (event) => {
  setValue(event.target.value);
}
const onSearch = (searchTerm) => {
  setValue(searchTerm);
}

return(
     <>
//      <div className="searchBar">

                   search bar 
                   <div className="search ">
                 <div className="search-inner">
                   <input
                     type="text"
                     value={value} 
                     onChange={onChange}
                     />
                    <button onClick={() => onSearch(value)}> 
                       <p> search</p> 
                     </button>
                     <div className="nav-dropdown">
                       {data.filter(item => {
                           const searchTerm = value.toLowerCase();
                           const pageTitle = item.page_title.toLowerCase();                        
                           return searchTerm && pageTitle.startsWith(searchTerm) && pageTitle !== searchTerm;
                         }).slice(0, 5)
                         .map((item) => (
                             <div onClick={() => onSearch(item.page_title)}
                             className="nav-dropdown-row" key={item.page_title}>{item.page_title}</div>
                             ))}
                     </div>
                 </div>
               </div>
               </div> 
    </>
 )
 }