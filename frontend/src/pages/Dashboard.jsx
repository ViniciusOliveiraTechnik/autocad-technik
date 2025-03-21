import Notification from "@/components/UI/Notification/Notification";
import SidebarHeader from "@/components/UI/Sidebar/SidebarHeader";
import Sidebar from "@/components/UI/Sidebar/Sidebar";
import DropdownSwitch from "@/components/UI/Dropdown/DropdownSwitch";
import SidebarTrigger from "@/components/UI/Sidebar/SidebarTrigger";

import NotFoundTable from "@/components/NotFoundTable";

import { SidebarProvider } from "@/contexts/components/SidebarContext";

import { Building2, Cog, Users, Wallet } from "lucide-react";
import FileButton from "@/components/FileButton";
import ExtractButton2 from "@/components/ExtractButton";
import useTableStore from "@/store/useTableStore";
import TestTable from "@/components/UI/Table/Table";

function Dashboard() {
  const { tableData } = useTableStore();

  const menuItems = [
    {
      title: "Technik",
      description: "Empresa",
      icon: <Building2 />,
      link: "/",
    },
    {
      title: "AutoCAD",
      description: "Engenharia",
      icon: <Cog className="size-6" />,
      link: "/",
    },
    {
      title: "Financeiro",
      description: "Análises financeiras",
      icon: <Wallet className="size-6" />,
      link: "/",
    },
    {
      title: "RH",
      description: "Suporte de usuários",
      icon: <Users className="size-6" />,
      link: "/",
    },
  ];

  return (
    <>
      <section className="h-screen flex overflow-hidden">
        <main className="flex-1 flex flex-col gap-3 p-4 bg-gray-100 overflow-y-auto">
          <FileButton />
          <ExtractButton2 />

          {/* Conditional formating with table content and table warning */}
          {tableData.length ? <TestTable /> : <NotFoundTable />}

          <Notification />
        </main>
      </section>
      <section className="h-screen flex overflow-hidden">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <DropdownSwitch items={menuItems} />
            </SidebarHeader>
          </Sidebar>

          <main className="w-full h-screen bg-slate-700 p-4">
            <SidebarTrigger />
          </main>
        </SidebarProvider>
      </section>
    </>
  );
}

export default Dashboard;
