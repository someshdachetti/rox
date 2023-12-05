import { useEffect, useState, useContext } from "react";
import { TableDataContext } from "../../App";
import "./index.css";

export const Table = () => {
  const { data } = useContext(TableDataContext);
  const [dataTable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(false);
  
  let soldCount = 0;
  useEffect(() => {
    setLoading(true);
    if (data.length > 0) {
      const tableData = data.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        category: item.category,
        description: item.description,
        image: item.image,
        sold: item.sold,
        dataOfSale: item.dataOfSale,
      }));

      setDataTable(tableData);
      setLoading(false);
      // console.log(tableData , "table data");
    }
  }, [data]);

  // console.log(dataTable , "table data");

  return (
    <>
      <div className="table">
        <div className="table-container">
          <h1 className="table-heading">Id</h1>
          <h1 className="table-heading">Title</h1>
          <h1 className="table-heading">Description</h1>
          <h1 className="table-heading">Price</h1>
          <h1 className="table-heading">Category</h1>
          <h1 className="table-heading">Sold</h1>
          <h1 className="table-heading">Image</h1>
        </div>

        {!loading ? (
          <ul>
            {dataTable.map((each) => (
              <li className="table-values-container" key={each.id}>
                <p>{each.id}</p>
                <p className="title">{each.title}</p>
                <p className="discription">{each.description}</p>
                <p>{each.price}</p>
                <p>{each.category}</p>
                <p>{each.sold ? soldCount + 1 : soldCount }</p>
                <img src={each.image} alt={each.title} />
              </li>
            ))}
          </ul>
        ) : (
          <h1>Loading....</h1>
        )}
      </div>
    </>
  );
};
