import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Table = ({ partners }) => {
  const columns = [
    { field: "id", headerName: "#", width: 50 },
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "mobile", headerName: "Mobile", width: 150 },
    { field: "country", headerName: "Country", width: 150 },
    { field: "joinDate", headerName: "Join Date", width: 100 },
    { field: "role", headerName: "Role", width: 200 },
  ];

  const row = [];
  partners?.map((partner, i) => {
    row.push({
      id: i + 1,
      _id: partner._id,
      fullName: partner.fullName,
      email: partner.email,
      mobile: partner.mobile,
      country: partner.country,
      joinDate: partner.joinDate,
      role: partner.role,
    });
  });

  const rows = row;
  return (
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
  );
};

export default Table;
