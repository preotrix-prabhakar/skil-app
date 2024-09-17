"use client"
import React from "react";
import { useEffect, useState } from "react";
function page() {
  const [skillsData,setSkillsData]=useState([]);
  const [currentCategoryIndex,setCurrentCategoryIndex]=useState(0);
useEffect(()=>{
    const questions= async ()=>{

        try {
            const response= await fetch('./data/questions.json');
            const result=await response.json();
            console.log(result.data);
            setSkillsData(result.data);
        } catch (error) {
            console.log({error});
        }
    }
    questions();
},[])

const handleNext=()=>{
  if(currentCategoryIndex < skillsData.length-1)
  setCurrentCategoryIndex(currentCategoryIndex+1);
else {
  <div>No further category...</div>
}
}
const handlePrevious=()=>{
if(currentCategoryIndex >0){
  setCurrentCategoryIndex(currentCategoryIndex-1);
}
}
const currentCategory=skillsData[currentCategoryIndex];
  return (
    <div >
      The Category is:
      <div>
        
        {currentCategory && (
          <h1 className="text-blue-600">
            {currentCategory.name} {/* Display the first item's name */}
          </h1>
        )}
        
        <button className="bg-gray-600 mr-5" onClick={handlePrevious} >previous</button>
        <button className="bg-red-600" onClick={handleNext} >Next</button>
      </div>
    </div>
  )
}

export default page
