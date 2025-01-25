import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function DetailDemande(){
    const { id } = useParams();
    return(
        <>
            <Navbar />
            <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
                  <Sidebar />    
                </div>
            {/* <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
                
                <div className="logo"><a href="#" className="simple-text logo-normal">
                    Logo
                    </a></div>
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
                        <a className="nav-link" href="/pages/detaildemande">
                        <i className="material-icons">message</i>
                        <p>Détail Demande</p>
                        </a>
                    </li>     
                    </ul>
                </div>
            </div> */}
            < div className="main-panel">
            <div className="content">  
                <div className="container mx-auto mx-auto px-4">
                <div className="flex flex-wrap -mx-2">
                    <div className="md:w-8/12 px-2">
                    <div className="card">
                        <div className="card-header card-header-primary">
                        <h4 className="card-title" data-color="white">Détail d'une demande</h4>
                        <p className="card-category"></p>
                        </div>
                        <div className="card-body">
                        <form>
                            <div className="flex flex-wrap -mx-2">
                           <div className="md:w-5/12 px-2">
                                <div className="form-group">
                                <label className="bmd-label-floating">Nom</label>
                                <h4>Tidiany</h4>
                                </div>
                            </div>
                            <div className="md:w-3/12 px-2">
                                <div className="form-group">
                                <label className="bmd-label-floating">Prénom</label>
                                <h4>Mouhamed</h4>
                                </div>
                            </div>
                           
                            </div>
                            <div className="flex flex-wrap -mx-2">
                           <div className="md:w-5/12 px-2">
                                <div className="form-group">
                                <label className="bmd-label-floating">Service demandé</label>
                                <h4>Plomberie</h4>
                                </div>
                            </div>
                            <div className="md:w-3/12 px-2">
                                <div className="form-group">
                                <label className="bmd-label-floating">Date</label>
                                <h4>12/02/2025</h4>
                                </div>
                            </div>
                           
                            </div>
                            <div className="flex flex-wrap -mx-2">
                                <div className="md:w-5/12 px-2">
                                    <div className="form-group">
                                    <label className="bmd-label-floating">Téléphone</label>
                                    <h4>789653214</h4>
                                    </div>
                                </div>
                                <div className="md:w-5/12 px-2">
                                    <div className="form-group">
                                    <label className="bmd-label-floating">Localisation</label>
                                    <h4>Dakar</h4>
                                    </div>
                                </div>
                                <div className="md:w-12/12 px-1">
                                    <div className="form-group">
                                    <label className="bmd-label-floating">Description</label>
                                    <h4>Une toilette qui fuit, entraînant une augmentation de ma facture d’eau du à un flotteur défectueux ou un joint d’étanchéité usé. Je souhaite un remplacement de ces pièces pour résoudre le problème.</h4>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-green-500 hover:bg-green-700 text-white pull-right">Valider</button>
                            <button type="submit" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-red-500 hover:bg-red-700 text-white pull-right">Rejeter</button>

                            <div className="clearfix"></div>
                        </form>
                        </div>
                    </div>
                    </div>
  
                </div>
                </div>
            </div>
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
        </>
    )
}
export default DetailDemande;