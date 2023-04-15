import Header from "./Header";
import Footer from "./Footer";
// import Sidebar from "./SideBar";

type MyComponentProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: MyComponentProps) {
    return (
        <div className="bg-primary min-h-screen bg-gradient-to-t from-blue-50 via-slate-50 to-white">
            <Header />
            <div> {children} </div>
            
        </div>
    );
}
