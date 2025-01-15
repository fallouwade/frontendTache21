import { SidebarComponent } from "./sideBarAmin/SidebarComponent";

const AdmineContent = () => {
    return ( 
        <div className="flex w-full min-h-screen">
            <div>
                <SidebarComponent />
            </div>
            <div className="w-10/12 border border-red-700">
                <div className="border w-full border-r-emerald-600">
                </div>
                <div>content</div>
            </div>
        </div>
     );
}
 
export default AdmineContent;