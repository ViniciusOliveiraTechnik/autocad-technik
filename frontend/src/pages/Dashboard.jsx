import Notification from "@/components/UI/Notification/Notification";
import SidebarHeader from "@/components/UI/Sidebar/SidebarHeader";
import Sidebar from "@/components/UI/Sidebar/Sidebar";
import DropdownSwitch from "@/components/UI/Dropdown/DropdownSwitch";
import SidebarTrigger from "@/components/UI/Sidebar/SidebarTrigger";

import ActiveFileButton from "@/components/ActiveFileButton";
import ExtractButton from "@/components/ExtractButton";
import NotFoundTable from "@/components/NotFoundTable";
import Table from "@/components/Table";

import useNotification from "@/hooks/useNotification";
import useTag from "@/hooks/useTag.jsx";
import useFile from "@/hooks/useFile.jsx";
import useTable from "@/hooks/useTable";

import { SidebarProvider } from "@/contexts/components/SidebarContext";

import { Building2, Cog, Users, Wallet } from "lucide-react";

function Dashboard() {
  const {
    fileResponse,
    fileConnectionState,
    isFileConnectionLoading,
    pingEffect,
    handleFileConnection,
  } = useFile();

  const { visible, textContent, notificationType } = useNotification();
  const { tableData } = useTable();
  const { isExtractionRunning, handleExtractTags } = useTag();

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
          <ActiveFileButton
            pingEffect={pingEffect}
            onChange={handleFileConnection}
            fileConnectionState={fileConnectionState}
            isFileConnectionLoading={isFileConnectionLoading}
          />

          <ExtractButton
            disabled={!fileResponse || isExtractionRunning}
            onClick={() => handleExtractTags(fileResponse.id)}
            isLoadingExtract={isExtractionRunning}
          />

          {tableData ? <Table /> : <NotFoundTable />}

          <Notification
            textContent={textContent}
            hidden={visible}
            type={notificationType}
          />
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
