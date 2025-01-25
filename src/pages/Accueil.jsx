import  { useEffect, useState } from "react";
// import "../components/demo.css";
// import "../components/demo1.css";
// import "../components/demo3.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Accueil () {

    return ( 
        <>
            <div className="wrapper">
                <Navbar/>
                <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
                  <Sidebar />    
                </div>
                <div className="main-panel">
                    <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                        <div className="container mx-auto mx-auto px-4">
                        <div className="navbar-wrapper">
                            <a className="navbar-brand" href="javascript:;">Dashboard</a>
                        </div>
                        {/* <div className="collapse navbar-collapse justify-end">
                            <form className="navbar-form">
                            <div className="input-group no-border">
                                <input type="text" value="" className="form-control" placeholder="Search..."/>
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
                                <a className="dropdown-item" href="#">Settings</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Déconnexion</a>
                                </div>
                            </li>
                            </ul>
                        </div> */}

                        </div>
                    </nav>
                <div className="content">
                <div className="container mx-auto mx-auto px-4">
                <div className="flex flex-wrap -mx-2">
                    <div className="lg:w-12/12 px-2 md:w-6/12 px-2 sm:w-6/12 px-2">
                    <div className="card card-stats">
                        <div className="card-header card-header-warning card-header-icon">
                        <div className="card-icon">
                            <i className="material-icons">content_copy</i>
                        </div>
                        <p className="card-category font-extralight">Nombre de demande</p>
                        <h3 className="card-title">50
                            <small></small>
                        </h3>
                        </div>
                        <div className="card-footer">
                        <div className="stats">
                            <i className="material-icons text-red-500"></i>
                        </div>
                        </div>
                    </div>
                    </div>
                
                    <div className="lg:w-12/12 px-2 md:w-6/12 px-2 sm:w-6/12 px-2">
                    <div className="card card-stats">
                        <div className="card-header card-header-success card-header-icon">
                        <div className="card-icon">
                        <i className="material-icons">store</i>
                        </div>
                        <p className="card-category">Demande en attente</p>
                        <h3 className="card-title">5</h3>
                        </div>
                        <div className="card-footer">
                        {/* <div className="stats">
                          <i className="material-icons">date_range</i>
                        </div> */}
                        </div>
                    </div>
                    </div>
                </div>
                       
                {/*liste des clients*/}
                <div className="lg:w-full px-2 md:w-full px-2">
                    <div className="card">
                        <div className="card-header card-header-warning">
                        <h4 className="card-title">Clients</h4>
                        <p className="card-category">Liste des clients ayant validés leurs demandes</p>
                        </div>
                        <div className="card-body table-responsive">
                        <table className="table table-hover" align="center">
                            <thead className="text-yellow-500">
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Prix</th>
                            <th>Localisation</th>
                            <th>Action</th>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Dakota Rice</td>
                                <td>$36,738</td>
                                <td>Dakar</td>
                                <td>
                                 <button className="inline-flex items-center justify-center px-2 py-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-red-600 hover:bg-red-600 text-white">Supprimer</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Minerva Hooper</td>
                                <td>$23,789</td>
                                <td>Thiès</td>
                                <td>
                                  <button className="inline-flex items-center justify-center px-2 py-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-red-600 hover:bg-red-600 text-white">Supprimer</button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Sage Rodriguez</td>
                                <td>$56,142</td>
                                <td>Saint Louis</td>
                                <td>
                                  <button className="inline-flex items-center justify-center px-2 py-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-red-600 hover:bg-red-600 text-white">Supprimer</button>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Philip Chaney</td>
                                <td>$38,735</td>
                                <td>Ziguinchor</td>
                                <td>
                                    <button className="inline-flex items-center justify-center px-2 py-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-red-600 hover:bg-red-600 text-white">Supprimer</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                    {/* footer */}
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
 
export default Accueil;