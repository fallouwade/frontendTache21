import React from "react";
import { Link } from "react-router-dom";
function Demande () {
    return ( 
        <>
          <div className="wrapper ">
            <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
            <div className="logo"><a href="#" className="simple-text logo-normal">
               Logo
                </a>
            </div>
            <div className="sidebar-wrapper">
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link" href="/">
                    <i className="material-icons">dashboard</i>
                    <p>Dashboard</p>
                    </a>
                </li>
            
                <li className="nav-item">
                    <a className="nav-link" href="/pages/profil">
                    <i className="material-icons">person</i>
                    <p>Profil</p>
                    </a>
                </li>
                <li className="nav-item active">
                    <a className="nav-link" href="/pages/demande">
                    <i className="material-icons">message</i>
                    <p>Demande</p>
                    </a>
                </li>     
                </ul>
             </div>
            </div>
            <div className="main-panel">
            <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div className="container mx-auto mx-auto px-4">
                <div className="navbar-wrapper">
                    <a className="navbar-brand" href="javascript:;">Demande</a>
                </div>
                <div className="collapse navbar-collapse justify-end">
                    <form className="navbar-form">
                    <div className="input-group no-border">
                        <input type="text" value="" className="form-control" placeholder="Search..." />
                        <button type="submit" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm-white inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm-round inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm-just-icon">
                        <i className="material-icons">search</i>
                        <div className="ripple-container mx-auto"></div>
                        </button>
                    </div>
                    </form>
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="javascript:;">
                        <i className="material-icons">dashboard</i>
                        <p className="d-lg-none d-md-block">
                            Stats
                        </p>
                        </a>
                    </li>
                    
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="javascript:;" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="material-icons">person</i>
                        <p className="d-lg-none d-md-block">
                            Account
                        </p>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
                        <a className="dropdown-item" href="#">Profile</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Log out</a>
                        </div>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
            {/* fin navbar */}
            {/* liste des demandes */}
            <div className="content">
                <div className="container mx-auto mx-auto px-4">
                <div className="flex flex-wrap -mx-2">
                    <div className="md:w-full px-2">
                    <div className="card">
                        <div className="card-header card-header-primary">
                        <h4 className="card-title ">Liste des demandes</h4>
                        <p className="card-category"></p>
                        </div>
                        <div className="card-body">
                        <div className="table-responsive">
                            <table className="table">
                            <thead className=" text-purple-900">
                                <th>
                                N demande
                                </th>
                                <th>
                                Prénom
                                </th>
                                <th>
                                Nom
                                </th>
                                <th>
                                Adresse
                                </th>
                                <th>
                                Action
                                </th>
                            </thead>
                            <tbody>
                                <tr>
                                <td>
                                    1
                                </td>
                                <td>
                                    Falou 
                                </td>
                                <td>
                                   WADE
                                </td>
                                <td>
                                    DAKAR
                                </td>
                                <td>
                                  <Link to="/pages/detaildemande" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-purple-900 hover:bg-purple-900 text-white">Voir</Link>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    2
                                </td>
                                <td>
                                  Ndeye Ngoné 
                                </td>
                                <td>
                                  GNINGUE 
                                </td>
                                <td>
                                    DAKAR
                                </td>
                                <td>
                                  <Link to="/pages/detaildemande" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-purple-900 hover:bg-purple-900 text-white">Voir</Link> 
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    3
                                </td>
                                <td>
                                    PapaLaye
                                </td>
                                <td>
                                    DIOUF
                                </td>
                                <td>
                                    DAKAR
                                </td>
                                <td>
                                  <Link to="/pages/detaildemande" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-purple-900 hover:bg-purple-900 text-white">Voir</Link>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    4
                                </td>
                                <td>
                                    Abdouroihmane
                                </td>
                                <td>
                                    SOILIHI
                                </td>
                                <td>
                                    DAKAR
                                </td>
                                <td>
                                  <Link to="/pages/detaildemande" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-purple-900 hover:bg-purple-900 text-white">Voir</Link>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    5
                                </td>
                                <td>
                                    Alimatou
                                </td>
                                <td>
                                  SOW
                                </td>
                                <td>
                                    THIES
                                </td>
                                <td>
                                 <Link to="/pages/detaildemande" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-purple-900 hover:bg-purple-900 text-white">Voir</Link>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    6
                                </td>
                                <td>
                                    Mouhamed
                                </td>
                                <td>
                                    GUEYE
                                </td>
                                <td>
                                    DAKAR
                                </td>
                                <td>
                                < Link to="/pages/detaildemande" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-purple-900 hover:bg-purple-900 text-white">Voir</Link>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    7
                                </td>
                                <td>
                                    Abdou KHOUDOUSS
                                </td>
                                <td>
                                    MBACKE 
                                </td>
                                <td>
                                    DAKAR
                                </td>
                                <td>
                                  <Link to="pages/detaildemande" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-purple-900 hover:bg-purple-900 text-white">Voir</Link>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                 </div>
                </div>
              </div>
            </div>
           
            {/* fin liste des demandes */}
        
            <footer className="footer">
                        <div className="container mx-auto mx-auto px-4">
                        <nav className="float-left">
                            <ul>
                            <li>
                                <a href="https://www.creative-tim.com">
                                Sen Plomberie
                                </a>
                            </li>
                            <li>
                                <a href="https://creative-tim.com/presentation">
                                Qui sommes nous
                                </a>
                            </li>
                            <li>
                                <a href="http://blog.creative-tim.com">
                                Blog
                                </a>
                            </li>
                            <li>
                                <a href="https://www.creative-tim.com/license">
                                Licenses
                                </a>
                            </li>
                            </ul>
                        </nav>
                        <div className="copyright float-right">
                            &copy;
                            copyright <i className="material-icons">favorite</i> by
                            <a href="https://www.creative-tim.com" target="_blank">Bakeli</a>.
                        </div>
                        </div>
            </footer>
            </div>
        </div>
      
      </>
     );
}
 
export default Demande;