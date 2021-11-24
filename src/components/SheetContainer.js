import DataRow from "./DataRow";

const SheetContainer = ({ headers, rows }) => {
  return (
    <div>
      <table rules="none">
        <thead>
          <tr>
            {headers.map((header, i) => {
              return <th key={i}>{header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((sDataRow, i) => {
            return <DataRow key={i} row={sDataRow} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SheetContainer;
