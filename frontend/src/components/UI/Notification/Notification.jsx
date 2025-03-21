import useNotificationStore from "@/store/useNotificationStore";
import { CircleCheckBig, TriangleAlert } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

export default function Notification() {
  const { visible, notificationType, textContent } = useNotificationStore();

  return (
    <div className="relative">
      <AnimatePresence initial={false}>
        {visible ? (
          <motion.div
            className={`notification ${
              notificationType === "error"
                ? "bg-red-red/70 text-white"
                : "bg-white text-sky-600 ring-1 ring-sky-600"
            }`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            {notificationType === "error" ? (
              <TriangleAlert className="size-4 md:size-5" />
            ) : (
              <CircleCheckBig className="size-4 md:size-5" />
            )}

            <span className="text-default-mobile md:text-default-desktop">
              {textContent}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
