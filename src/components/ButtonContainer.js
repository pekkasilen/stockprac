import reloadIcon from "../reload.PNG";
const ButtonContainer = ({ setSelected, stocksToFollow, selected, reload }) => {
  return (
    <div className="button-container">
      {stocksToFollow.map((x, i) => {
        return x === selected ? (
          <button key={i} className="custom-button-selected">
            {x}
          </button>
        ) : (
          <button
            key={i}
            className="custom-button"
            onClick={() => setSelected(x)}
          >
            {x}
          </button>
        );
      })}
      <img
        src={reloadIcon}
        onClick={() => {
          reload();
        }}
      />
    </div>
  );
};

export default ButtonContainer;
