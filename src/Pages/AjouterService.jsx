
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import LocalServiceModel from "./FormulaireAjoutService/LocalServiceModel";
function AjouterService() {
    const { id } = useParams()
    return (
        <>
            <div className="wrapper ">
                <Navbar />
                <div >

                    <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
                        <Sidebar />
                    </div>

                    <div className="container mx-auto pt-16 px-4" >
                        <LocalServiceModel />
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
    );
}

export default AjouterService;