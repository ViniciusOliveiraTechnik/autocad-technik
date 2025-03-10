import { Loader2 } from "lucide-react";

export default function Spinner({ extraStyles = "" }) {
  return (
    <div>
      <Loader2 className={`spin ${extraStyles}`} />
    </div>
  );
}
