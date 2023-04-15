import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
import { Container } from "@mui/material";
// import Sidebar from "./SideBar";

type MyComponentProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: MyComponentProps) {
  return (
    <div className="bg-primary min-h-screen bg-gradient-to-t from-blue-50 via-slate-50 to-white">
      <Header />
      <Container maxWidth="xl" className="grid grid-flow-col xl:grid-cols-4 ">
        <div className="xl:col-span-1">
          <SideBar />
        </div>
        <div className="w-full xl:col-span-3">{children}</div>
      </Container>
    </div>
  );
}
