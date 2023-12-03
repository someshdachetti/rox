import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointRight,
  faHandPointLeft,
} from "@fortawesome/free-solid-svg-icons";

import { TableDataContext } from "../../App";
import "./index.css";
export const PrevNxt = () => {
  const { setData } = useContext(TableDataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const onClickNext = async () => {
    try {
      setLoading(true);
      const nextPageResponse = await fetch(
        `http://localhost:3005/?page=${currentPage + 1}`
      );
      if (nextPageResponse.ok) {
        const nextPageData = await nextPageResponse.json();
        setData(nextPageData);
        setCurrentPage(currentPage + 1);
      }
    } catch (error) {
      console.error("Error fetching next page:", error);
    } finally {
      setLoading(false);
    }
  };

  const onClickPrev = async () => {
    try {
      setLoading(true);
      if (currentPage > 1) {
        const prevPageResponse = await fetch(
          `http://localhost:3005/?page=${currentPage - 1}`
        );
        if (prevPageResponse.ok) {
          const prevPageData = await prevPageResponse.json();
          setData(prevPageData);
          setCurrentPage(currentPage - 1);
        }
      }
    } catch (error) {
      console.error("Error fetching previous page:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <p className="loading">Loading ....</p>}
      <div className="pages-container">
        <div>
          <h1 className="Page">Page : 0{currentPage}</h1>
        </div>

        <div>
          <button onClick={onClickPrev}>
            <FontAwesomeIcon className="icon-left" icon={faHandPointLeft} />
            Prev
          </button>
          <button onClick={onClickNext}>
            Next
            <FontAwesomeIcon className="icon-right" icon={faHandPointRight} />
          </button>
        </div>

        <div>
          <h1 className="no-of_pages">No of Pages : 10</h1>
        </div>
      </div>
    </>
  );
};
