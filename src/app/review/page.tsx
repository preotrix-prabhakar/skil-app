"use client"
import React from "react";
import { useEffect, useState } from "react";
function page() {
  const [skillsData, setSkillsData] = useState([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  
  
  useEffect(() => {
    const questions = async () => {

      try {
        const response = await fetch('./data/questions.json');
        const result = await response.json();
        // console.log(result.data);
        // console.log(currentSkillIndex,currentCategoryIndex);
        setSkillsData(result.data);
      } catch (error) {
        console.log({ error });
      }
    }
    questions();
  }, [])



  const handleNext = () => {
   
    
    if (currentSkillIndex < currentCategory.skills.length-1) {
        setCurrentSkillIndex(currentSkillIndex + 1);
      }
      else if (currentCategoryIndex < skillsData.length-1) {
        setCurrentCategoryIndex(currentCategoryIndex + 1);
        setCurrentSkillIndex(0);
      } }
  
  const currentCategory = skillsData[currentCategoryIndex];
  const handlePrevious = () => {
    
    if (currentSkillIndex > 0) {
      setCurrentSkillIndex(currentSkillIndex - 1);
    }
    else if(currentCategoryIndex>0){
      setCurrentCategoryIndex(currentCategoryIndex-1);
      setCurrentSkillIndex(skillsData[currentCategoryIndex-1].skills.length-1);
    }
  }
  
  
  return (
    <div >
      The Category is:
      <div>

        {currentCategory && (
          <div>

            <h1 className="text-blue-600">
              {currentCategory.name}
            </h1>
            {console.log(currentCategoryIndex,currentSkillIndex)}
            <p>and current skill is:</p>
            {currentCategory.skills[currentSkillIndex].name}
            <p> {currentCategory.skills[currentSkillIndex].description}</p>
          </div>


        )}

        <hr />
        <button className="bg-gray-600 mr-5" onClick={handlePrevious} >previous</button>
        <button className="bg-red-600" onClick={handleNext} >Next</button>
      </div>
    </div>
  )
}

export default page
