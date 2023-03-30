import React, { useState } from "react";
import Table from "../components/Table.css";
import CloseIcon from "@mui/icons-material/Close";

const DataTable = ({ data }) => {
  const [tableData, setTableData] = useState(data);

  const handleDelete = (itemId) => {
    const newData = removeItem(itemId, tableData);
    setTableData(newData);
  };

  const removeItem = (itemId, data) => {
    let newData = data.filter((item) => item.data.ID !== itemId);
    newData.forEach((item) => {
      if (
        item.children &&
        item.children.has_nemesis &&
        item.children.has_nemesis.records
      ) {
        item.children.has_nemesis.records = removeItem(
          itemId,
          item.children.has_nemesis.records
        );
      }
    });
    return newData;
  };

  const renderTable = (data) => {
    return (
      <table className="title">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Ability</th>
            <th>Minimal distance</th>
            <th>Weight</th>
            <th>Born</th>
            <th>In space since</th>
            <th>Beer consumption (l/y)</th>
            <th>Knows the answer?</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <React.Fragment key={i}>
              <tr>
                <td>{item.data.ID}</td>
                <td>{item.data.Name}</td>
                <td>{item.data.Gender}</td>
                <td>{item.data.Ability}</td>
                <td>{item.data["Minimal distance"]}</td>
                <td>{item.data.Weight}</td>
                <td>{item.data.Born}</td>
                <td>{item.data["In space since"]}</td>
                <td>{item.data["Beer consumption (l/y)"]}</td>
                <td>{item.data["Knows the answer?"]}</td>
                <td>
                  <button onClick={() => handleDelete(item.data.ID)}>
                    <CloseIcon color="error"></CloseIcon>{" "}
                  </button>
                </td>
              </tr>
              <React.Fragment>
                {item.children &&
                  item.children.has_nemesis &&
                  item.children.has_nemesis.records &&
                  item.children.has_nemesis.records.map((child, i) => (
                    <tr key={i}>
                      <td>
                        <div className="child_title">ID</div>
                        {child.data.ID}
                      </td>
                      <td>
                        <div className="child_title">Character ID</div>
                        {child.data["Character ID"]}
                      </td>
                      <td>
                        <div className="child_title">Is Alive?</div>
                        {child.data["Is alive?"]}
                      </td>
                      <td>
                        <div className="child_title">Years</div>
                        {child.data.Years}
                      </td>

                      <td>
                        <button onClick={() => handleDelete(child.data.ID)}>
                          <CloseIcon color="error"></CloseIcon>
                        </button>
                      </td>

                      {/* {child.children &&
                        child.children.has_secrete &&
                        child.children.has_secrete.records &&
                        child.children.has_secrete.records.map((grandchild) => (
                          <tr key={grandchild.data.ID}>
                            <td key={grandchild.data.ID}>
                              ID{grandchild.data.ID}
                            </td>
                            <td>Nemesis ID{grandchild.data["Nemesis ID"]}</td>
                            <td>Secret ID{grandchild.data["Secret ID"]}</td>

                            <td></td>
                            <button
                              onClick={() => handleDelete(grandchild.data.ID)}
                            >
                              Delete
                            </button>
                          </tr>
                        ))} */}
                    </tr>
                  ))}
              </React.Fragment>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  };

  return <div>{renderTable(tableData)}</div>;
};

export default DataTable;
