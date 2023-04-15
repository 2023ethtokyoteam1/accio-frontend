import Header from "./Header";
import Footer from "./Footer";
// import Sidebar from "./SideBar";

type MyComponentProps = {
  children : React.ReactNode;
};

export default function Layout({ children }: MyComponentProps) {
    return (
        <div className="bg-primary">
            <Header />
            <div> {children} </div>
            <Footer />
        </div>
    );
}
