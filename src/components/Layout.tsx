import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
// import Sidebar from "./SideBar";

type MyComponentProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: MyComponentProps) {
  return (
    <div className="bg-primary min-h-screen bg-gradient-to-t from-blue-50 via-slate-50 to-white">
      <Header />
      <div className="flex justify-center 2xl:mr-40">
        <div className="">
          <SideBar />
        </div>
        <div className="">{children}</div>
      </div>
      
    </div>
  );
}
