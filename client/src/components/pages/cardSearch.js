import React, { useEffect, useRef, useState } from "react";
import CardList from "../modules/cardList";
import axios from "axios";

function CardSearch() {
  const [query, setQuery] = useState("");
  const [prevQuery, setPrevQuery] = useState("");
  const [sentRequest, setSentRequest] = useState(false);
  const [cardData, setCardData] = useState(null);
  const [message, setMessage] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [direction, setDirection] = useState("asc");
  const [prevDirection, setPrevDirection] = useState("asc");
  const cancelToken = useRef();

  const handleQueryChange = (event) => {
    const { value } = event.target;
    setQuery(value);
  };

  const handlePagination = (page) => {
    if (pageNumber + page > 0 && pageNumber + page <= Math.ceil(cardData.data.length / 6)) {
      setPageNumber(pageNumber + page);
    }
  }

  const handleDirectionChange = (event) => {
    const { value } = event.target;
    setDirection(value);
  }

  useEffect(() => {
    //If we haven't sent a request, and either the query or direction has changed, send a new request
    if (!sentRequest && (query !== prevQuery || direction !== prevDirection)) {
      setSentRequest(true);
      setPrevQuery(query);
      setPrevDirection(direction);
      //Send a new request if the query isn't empty
      if (query.trim() !== "") {
        setCardData(null);
        setMessage("Loading Results . . .");
        setPageNumber(1);
        //The use of a cancel token is to prevent bubbling where the first request takes longer than the second and thus overwrites the second
        if (cancelToken.current) {
          cancelToken.current.cancel();
        }
        cancelToken.current = axios.CancelToken.source();
        axios.get(`/api/card/search?name=${query}&dir=${direction}`, { cancelToken: cancelToken.current.token }).then(data => {
          setCardData(data.data);
          setMessage("");
        }).catch(data => {
          //Display error message if the request wasn't cancelled, else we're still loading results
          setMessage((!axios.isCancel(data) ? data.response.data.errmsg : "Loading Results . . ."));
        });
      }
      //If the query was empty, clear the card data
      else if (query.trim() === "") {
        setCardData(null);
        setMessage("");
      }
      //Timeout to prevent sending more than 1 request per second
      setTimeout(() => { 
        setSentRequest(false);
      }, 1000);
    }
  }, [sentRequest, query, prevQuery, direction, prevDirection]);

  return (
    <div className="my-0 mx-auto md:w-11/12 lg:w-4/5 max-w-screen-lg">
      <div className="w-[60%] mr-[1%] md:w-[72%] inline-block">
      <label className="block text-gray-700 text-sm font-bold" htmlFor="cardname">
        Card Name
      </label>
      <input className="shadow border rounded w-full mb-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        onChange={handleQueryChange} id="cardname" type="text" placeholder="Start typing a card name to lookup . . ." />
      </div>
      <div className="w-[38%] ml-[1%] md:w-[26%] inline-block">
        <label className="block text-gray-700 text-sm font-bold" htmlFor="dir">
          Order By
        </label>
        <select className="shadow border rounded w-full mb-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
         id="dir" value={direction} onChange={handleDirectionChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {cardData && <>
        <button className="inline-block w-16 bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 mx-2 rounded"
          onClick={() => handlePagination(-1)}>Prev</button>
        <p className="inline-block">Page {pageNumber}/{Math.ceil(cardData.data.length / 6)}</p>
        <button className="inline-block w-16 bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 mx-2 rounded"
          onClick={() => handlePagination(1)}>Next</button>
        <p className="inline-block">Showing {cardData.data.length} results for "{prevQuery}" of {cardData.total_cards} total.</p>
      </>}
      <p>{message}</p>
      {cardData && <CardList cardData={cardData} pageNumber={pageNumber}/>}
    </div>
  );
}

export default CardSearch;