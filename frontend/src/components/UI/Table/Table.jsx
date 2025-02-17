import React, { useState } from "react";
import Container from "../Container/Container";

function Table() {
  return (
    <Container bgColor={"transparent"} flex shadow extraStyles="w-[90%] h-auto">
      <table className="">
        <tr className="">
          <th className="bg-white text-red-600 border border-gray-600">Tag Antiga</th>
        </tr>
      </table>
    </Container>
  );
}

export default Table;
