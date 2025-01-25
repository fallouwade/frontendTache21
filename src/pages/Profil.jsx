import Sidebar from "../components/Sidebar";
function Profil(){
    return(
        <>
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
                
                    <li className="nav-item active">
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
            </div> */}
           
            {/* affichage du profil du prestataire */}
            <div className="main-panel">
            <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                <div className="container mx-auto mx-auto px-4">
                <div className="navbar-wrapper">
                    <a className="navbar-brand" href="javascript:;">Profil</a>
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
            <div className="content">  
                <div className="container mx-auto mx-auto px-4">
                <div className="flex flex-wrap -mx-2">
                    <div className="md:w-8/12 px-2">
                    <div className="card">
                        <div className="card-header card-header-primary">
                        <h4 className="card-title" data-color="white">Profil</h4>
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
                                <label className="bmd-label-floating">Téléphone</label>
                                <h4>789653214</h4>
                                </div>
                            </div>
                            <div className="md:w-12/12 px-1">
                                <div className="form-group">
                                <label className="bmd-label-floating">Email</label>
                                <h4>mouhamedtidiany02@gmail.com</h4>
                                </div>
                            </div>
                            </div>
                            
                            <div className="clearfix"></div>
                        </form>
                        </div>
                    </div>
                    </div>
                    <div className="md:w-4/12 px-2">
                    <div className="card card-profile">
                        <div className="card-avatar">
                        <a href="">
                            <img className="img" src="/assets/plombier1.jpg" />
                        </a>
                        </div>
                        <div className="card-body">
                        <h6 className="card-category text-gray">Entreprise général de plomberie</h6>
                        <h4 className="card-title">Mouhamed Tidiany</h4>
                        <p className="card-description">
                            Plomberie professionel Tuyauterie appareillage assainissement et divers
                        </p>
                        <a href="/pages/editer" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-purple-500 hover:purple
 text-white inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm-round">Editer Profil</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            {/* fin affichage du profil du prestataire */}
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
export default Profil;