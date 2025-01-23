import React, { useState } from "react";
function EditerProfil() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [profession, setProfession] = useState('');
    const [categorie, setCategorie] = useState('');
    const [nomentrepise, setNomentreprise] = useState('');
    const [adresse, setAdresse] = useState('');
    const [telephone, setTelephone] = useState('');
    const [photo, setPhoto] = useState('');
    const [description, setDescription] = useState('');
    return(
    <div>
        <div className="wrapper">
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
        </div>
        {/* affichage du profil du prestataire */}
        <div className="main-panel">
        <div className="content">
            <div className="container mx-auto mx-auto px-4">
            <div className="flex flex-wrap -mx-2">
                <div className="md:w-8/12 px-2">
                <div className="card">
                    <div className="card-header card-header-primary">
                    <h4 className="card-title">Editer Profil</h4>
                    <p className="card-category"></p>
                    </div>
                    <div className="card-body">
                    <form>
                        <div className="flex flex-wrap -mx-2">
                            <div className="md:w-5/12 px-2">
                                <div className="form-group">
                                <label className="bmd-label-floating">Nom</label>
                                <input type="text"
                                    className="form-control"
                                    value={nom}
                                    onChange={(e) => setNom(e.target.value)}
                                    
                                />
                                </div>
                            </div>
                            <div className="md:w-5/12 px-2">
                                <div className="form-group">
                                <label className="bmd-label-floating">Prénom</label>
                                <input type="text"
                                    className="form-control"
                                    value={prenom}
                                    onChange={(e) => setPrenom(e.target.value)}
                                    
                                />
                                </div>
                            </div>
                            <div className="md:w-5/12 px-2">
                                <div className="form-group">
                                <label className="bmd-label-floating">Email</label>
                                <input type="text"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    
                                />
                                
                                </div>
                            </div>
                            <div className="md:w-5/12 px-2">
                                <div className="form-group">
                                <label className="bmd-label-floating">Téléphone</label>
                                <input type="text"
                                    className="form-control"
                                    value={telephone}
                                    onChange={(e) => setTelephone(e.target.value)}
                                />
                                </div>
                            </div>
                           
                        </div>
                        <button type="submit" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-blue-500 hover:bg-blue-700 text-white pull-right">Enregistrer</button>
                        <div className="clearfix"></div>
                    </form>
                    </div>
                </div>
                </div>
                <div className="md:w-4/12 px-2">
                <div className="card card-profile">
                    <div className="card-avatar">
                    <a href="javascript:;">
                        <img className="img" src="/assets/plombier1.jpg" />
                    </a>
                    </div>
                    <div className="card-body">
                    <h6 className="card-category text-gray">Entreprise général de plomberie</h6>
                    <h4 className="card-title">Mouhamed Tidiany</h4>
                    <p className="card-description">
                        Plomberie professionel Tuyauterie appareillage assainissement et divers
                    </p>
                    <a href="/pages/profil" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-purple-700 hover:bg-purple-700 text-white inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm-round">Voir Profil</a>
                    </div>
                </div>
                </div>
            </div>
            </div>
            
        </div>
        {/* fin edit du profil du prestataire */}
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

    </div>
    )
}
export default EditerProfil;