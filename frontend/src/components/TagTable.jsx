import { useState } from "react";

import ModifyTags from "../api/ModifyTags";
import Input from "./UI/Input/Input";
import ModifyButton from "./ModifyButton";
import useNotification from "../hooks/useNotification";

export default function TagTable({ tagResponse, fileID }) {
  const [tableContent, setTableContent] = useState(tagResponse);
  const [isModifyingRunning, setIsModifyingRunning] = useState(false);

  const { visible, textContent, notificationType, showNotification } = useNotification();

  const handleInputChangeValue = (id, field, value) => {
    const updateData = tableContent.map((tag) =>
      tag.id === id ? { ...tag, [field]: value } : tag
    );

    setTableContent(updateData);
  };

  const handleModifyTags = (fileID) => {
    setIsModifyingRunning(true);
    if (!fileID) {
      return;
    }

    const response = ModifyTags(fileID, tableContent);

    console.log(response);
    setIsModifyingRunning(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[500px] 2xl:max-h-[600px]">
        <table className="table-primary">
          <thead className="text-default-mobile md:text-default-desktop text-gray-500 bg-gray-50">
            <tr>
              <th className="px-5 py-2">Tag Antiga</th>
              <th className="px-5 py-2">Tag Nova</th>
            </tr>
          </thead>
          <tbody className="text-default-mobile md:text-default-desktop">
            {tableContent.map((tag) => (
              <tr
                key={tag.id}
                className="bg-white border-b border-gray-200 hover:bg-gray-100 h-12 md:h-14 text-left"
              >
                <th className="px-5 font-medium text-gray-700 whitespace-nowrap">
                  {tag.old_tag_regex}
                </th>
                <td>
                  <Input
                    spanText={"TECH"}
                    placeholder={"Insira a nova Tag"}
                    onChange={(event) =>
                      handleInputChangeValue(
                        tag.id,
                        "new_tag",
                        event.target.value
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModifyButton
        onClick={() => handleModifyTags(fileID)}
        disabled={isModifyingRunning}
      />
    </div>
  );
}
