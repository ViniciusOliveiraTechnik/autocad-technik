import { useContext } from "react";
import TagContext from "../contexts/utils/TagContext";

export default function useTag() {
  return useContext(TagContext);
}
