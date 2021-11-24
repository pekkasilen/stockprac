export const constructRows = (dataObject, setRows, setFetchError) => {
  let updatedRows = [[]];
  //Current data
  try {
    let todayData = dataObject.current;
    let todayRow = [
      "Now",
      todayData["05. price"],
      " ",
      0.0,
      todayData["06. volume"],
    ];
    updatedRows[0] = todayRow;
  } catch {}

  //Historical data. Checking 11 previous dates if they are trading days. Finally removing extra.
  let today = new Date();
  let previousDates = 0;
  while (previousDates < 11) {
    today.setDate(today.getDate() - 1);
    previousDates++;
    try {
      let historyData = dataObject.day;
      let dateToGet = today.toISOString().split("T")[0];
      let rowOfTheDay = [
        dateToGet,
        historyData[dateToGet]["4. close"],
        " ",
        0.0,
        historyData[dateToGet]["5. volume"],
      ];
      updatedRows.push(rowOfTheDay);
    } catch {}
  }
  //Checking that updatedRows really contains enough stuff
  if (updatedRows.length > 2) {
    updatedRows[1][0] = "Previous day";
    let dailyPrices = [];
    for (var x of updatedRows) {
      dailyPrices.push(x[1]);
    }
    dailyPrices
      .concat([])
      .splice(1)
      .map((x, i) => {
        updatedRows[i][3] = (
          (100 * (parseFloat(dailyPrices[i]) - parseFloat(x))) /
          parseFloat(x)
        ).toFixed(3);
        if (updatedRows[i][3] >= 0) {
          updatedRows[i][2] = (
            <code className="arrow-up" data-type="html-code">
              &#8593;
            </code>
          );
        } else {
          updatedRows[i][2] = (
            <code className="arrow-down" data-type="html-code">
              &#8595;
            </code>
          );
        }
      });

    setRows(updatedRows.slice(0, 7));
    setFetchError(false);
  } else {
    setFetchError(true);
  }
};
