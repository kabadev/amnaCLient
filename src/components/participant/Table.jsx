import React, { useContext, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import axios from "axios";

const Table = () => {
  const [paticipants, setPaticipant] = useState([]);

  const getPaticipant = async () => {
    const res = await axios.get(`participants`);
    setPaticipant(res.data.data);
  };
  useEffect(() => {
    getPaticipant();
  }, []);

  const columns = [
    { field: "id", headerName: "#", width: 100 },

    { field: "uniqueId", headerName: "Unique Id", width: 200 },
    { field: "nationality", headerName: "Nationality", width: 200 },
    { field: "age", headerName: "Age", width: 100 },
    { field: "gender", headerName: "Gender", width: 200 },
    { field: "isParent", headerName: "Parent", width: 100 },
  ];

  const row = [];
  paticipants?.map((paticipant, i) => {
    row.push({
      id: i + 1,
      _id: paticipant._id,
      uniqueId: paticipant.uniqueId,
      nationality: paticipant.nationality,
      age: paticipant.age,
      gender: paticipant.gender,
      role: paticipant.role,
      isParent: paticipant.isParent ? "Yes" : "No",
    });
  });

  const rows = row;
  return (
    <div className="contentg">
      <div className="table_card">
        <div className="table_card_header"></div>
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[10]}
            components={{ Toolbar: GridToolbar }}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
};

export default Table;
