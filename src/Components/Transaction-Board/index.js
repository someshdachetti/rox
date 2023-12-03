import "./index.css";
export const TransActionBoard = (props) => {
  const { Price, countSoldProducts, countNotSoldProducts } = props;

  return (
    <>
      <div className="transaction-board-container">
        <p className="transaction">
          Total Price : {Price} <br />
          TotalSold : {countSoldProducts} <br />
          TotalNotSold : {countNotSoldProducts}
        </p>
      </div>
    </>
  );
};
