import useNotificationStore from "@/store/useNotificationStore";
import { CheckCheck, TriangleAlert } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function Notification() {
  // useNotificationStore
  const { visible, notificationType, textContent } = useNotificationStore();

  // Component Attrs
  const notifcationTitle = notificationType === "normal" ? "Sucesso" : "Erro";
  const iconContent =
    notificationType === "error" ? (
      <TriangleAlert className="size-3 md:size-4" />
    ) : (
      <CheckCheck className="size-3 md:size-4" />
    );

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-md text-white ${
            notificationType === "normal" ? "bg-sky-500/80" : "bg-red-500/80 "
          }`}
        >
          <div className="flex flex-col justify-center px-4 py-2">
            <header className="flex items-center justify-start gap-3">
              {iconContent}
              <h2 className="text-small-sm md:text-small-md font-semibold">
                {notifcationTitle}
              </h2>
            </header>
            <main>
              <p className="text-small-sm md:text-small-md">{textContent}</p>
            </main>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
