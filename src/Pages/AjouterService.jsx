
import { Link, useParams } from "react-router-dom";
import LocalServiceModel from "./FormulaireAjoutService/LocalServiceModel";
import Layout from "../components/Layout";


function AjouterService() {
    const { id } = useParams()
    return (
        <>
           <Layout>
                <LocalServiceModel/>
           </Layout>

        </>
    );
}

export default AjouterService;