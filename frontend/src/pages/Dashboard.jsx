import ActiveFileButton from "../components/ActiveFileButton";
import ExtractButton from "../components/ExtractButton";
import TagTable from "../components/TagTable";
import NotFoundTable from "../components/NotFoundTable";
import Notification from "../components/UI/Notification/Notification";

import useFileConnection from "../hooks/useFileConnection.jsx";
import useNotification from "../hooks/useNotification";
import useExtractTags from "../hooks/useExtractTags.jsx";
import Sidebar from "@/components/UI/Sidebar/Sidebar";
import SidebarHeader from "@/components/UI/Sidebar/SidebarHeader";
import DropdownSwitch from "@/components/UI/Dropdown/DropdownSwitch";
import { Code, Cog, Users, Wallet } from "lucide-react";
import SidebarTrigger from "@/components/UI/Sidebar/SidebarTrigger";
import { SidebarProvider } from "@/contexts/SidebarContext";

function Dashboard() {
  const {
    fileResponse,
    fileConnectionState,
    isFileConnectionLoading,
    pingEffect,
    handleFileConnection,
  } = useFileConnection();

  const { visible, textContent, notificationType } = useNotification();

  const { tagResponse, isExtractionRunning, handleExtractTags } =
    useExtractTags();

  const menuItems = [
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
    <section className="h-screen flex overflow-hidden">
      <SidebarProvider>
<Sidebar>
        <SidebarHeader>
          <DropdownSwitch items={menuItems} />
        </SidebarHeader>
      </Sidebar>
      <main className="flex-1 flex flex-col gap-3 p-4 bg-gray-100 overflow-y-auto">
        <SidebarTrigger />

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

        {tagResponse ? (
          <TagTable tagResponse={tagResponse} fileID={fileResponse.id} />
        ) : (
          <NotFoundTable />
        )}

        <Notification
          textContent={textContent}
          hidden={visible}
          type={notificationType}
        />
      </main>
      </SidebarProvider>
      
    </section>
  );
}

export default Dashboard;
