import { useContext } from "react";
import TagContext from "../contexts/TagContext";

export default function useExtractTags() {
  return useContext(TagContext);
}
