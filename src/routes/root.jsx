import NavBar from "../components/NavBar";
import ItemListContainer from "../components/ItemListContainer";
import { useParams } from "react-router-dom";
import React from "react";

function Root() {

  const params = useParams();
  const isCategoryRoute = Boolean(params.id);
   
  return (
      <div>
        <NavBar />
        <ItemListContainer isCategoryRoute={isCategoryRoute} categoryId={params.id} />
      </div>
    );
} 

export default Root;
