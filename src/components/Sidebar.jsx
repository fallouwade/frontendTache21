
import "./demo.css";
import "./demo1.css";
import "./demo3.css";
import { Link } from "react-router-dom";
function Sidebar ()  {
    return ( 
        <div>
            <div className="sidebar" data-color="blue" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
       
                <div className="logo"><a href="http://www.creative-tim.com" className="simple-text logo-normal">
                    Logo
                    </a></div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/Accueil">
                        <i className="material-icons">dashboard</i>
                        <p>Dashboard</p>
                        </Link>
                    </li>
                
                    <li className="nav-item ">
                        <Link clLinkssName="nav-link" to="/profil">
                        <i className="material-icons">person</i>
                        <p>Profil</p>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/demande">
                        <i className="material-icons">message</i>
                        <p>Demande</p>
                        </Link>
                    </li> 

                    <li className="nav-item ">
                        <Link className="nav-link" to="/ajouter">
                        <i className="material-icons">message</i>
                        <p>Ajouter Service</p>
                        </Link>
                    </li>    
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default Sidebar;