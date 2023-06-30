import { Link } from "react-router-dom";
import './index.css'

function Header(){
    return(
        <section className="header">
            <div className="header-name">
                <h1>Menu</h1>
            </div>
            <div className="navbar">
                    <h2><Link to="/">Chat</Link></h2>
                    <h2><Link to="images">Image Generator</Link></h2>
                    <h2><Link to="sequel">SQL Generator</Link></h2>
            </div>
        </section>
    )
}

export default Header;