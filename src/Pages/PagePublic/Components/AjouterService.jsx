import LocalServiceModel from "./FormulaireAjoutService/LocalServiceModel";
import Layout from "../components/Layout";


function AjouterService() {
    return (
        <>
           <Layout>
                <h1 className="text-3xl font-semibold text-gray-800 mb-6 pt-6 mt-6">Service</h1>
                <LocalServiceModel/>
           </Layout>

        </>
    );
}

export default AjouterService;