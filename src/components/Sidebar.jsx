
import "./demo.css";
import "./demo1.css";
import "./demo3.css";
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
                        <a className="nav-link" href="/">
                        <i className="material-icons">dashboard</i>
                        <p>Dashboard</p>
                        </a>
                    </li>
                
                    <li className="nav-item ">
                        <a className="nav-link" href="/pages/profil">
                        <i className="material-icons">person</i>
                        <p>Profil</p>
                        </a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link" href="/pages/demande">
                        <i className="material-icons">message</i>
                        <p>Demande</p>
                        </a>
                    </li>     
                    </ul>
                </div>
            </div>
        </div>
    );
}
 
export default Sidebar;