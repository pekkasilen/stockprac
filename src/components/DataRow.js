const DataRow = ({ row }) => {
  return (
    <tr>
      {row.map((rowElement, i) => {
        return <td key={i}>{rowElement}</td>;
      })}
    </tr>
  );
};

export default DataRow;
