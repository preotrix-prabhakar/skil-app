"use client"
import React from "react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


 function page() {
  const [skillsData, setSkillsData] = useState([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editableLevels, setEditableLevels] = useState([]);

  useEffect(() => {

    const questions = async () => {

      try {
        const response = await fetch('./data/questions.json');
        const result = await response.json();
        console.log(result.data);
        console.log(currentSkillIndex, currentCategoryIndex);
        setSkillsData(result.data);
      } catch (error) {
        console.log({ error });
      }
    }
    questions();
  }, [])



  const handleNext = () => {


    if (currentSkillIndex < currentCategory.skills.length - 1) {
      setCurrentSkillIndex(currentSkillIndex + 1);
    }
    else if (currentCategoryIndex < skillsData.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentSkillIndex(0);
    }
  }

  const handlePrevious = () => {

    if (currentSkillIndex > 0) {
      setCurrentSkillIndex(currentSkillIndex - 1);
    }
    else if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      setCurrentSkillIndex(skillsData[currentCategoryIndex - 1].skills.length - 1);
    }
  }
  const handleLooksGood = () => {
    toast.success("Looks good! Moving to the next skill.");
    handleNext();
  };
  const handleEditClick = () => {
    setIsEditing(true);
    setEditableLevels([...currentSkill.skill_levels]);
    toast.info("You can now edit the skills.");
  };
  
  const currentCategory = skillsData[currentCategoryIndex];
  const currentSkill = currentCategory && currentCategory.skills ? currentCategory.skills[currentSkillIndex] : null;


  return (
    <div >
      <ToastContainer />
      The Category is:
      <div>

        {currentCategory && (
          <div>

            <h1 className="text-blue-600 text-xl p-4 font-black">
              {currentCategory.name}
            </h1>
            {console.log(currentCategoryIndex, currentSkillIndex)}
            <p>and current skill is:</p>
            {currentSkill.name}
            <p> {currentSkill.description}</p>

            <table className="w-full mt-5 border-2 border-black bg-gray-100">
              <thead>
                <tr>
                  <th className="text-left">Level</th>
                  <th className="text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {(isEditing ? editableLevels: currentSkill.skill_levels).map((level,index)=>(
                  <tr key={index}  className="border-black border-2">
                  <td className="p-4">{level.skill_level_mark}</td>
                  <td>
                    {isEditing ? (
                      <input type="text"
                      className="w-full"
                      value={level.skill_level_description}
                       />
                    ):
                    (level.skill_level_description

                    ) }
                  </td>
                  </tr>
                ))}
                
              </tbody>
            </table>

          </div>


        )}


        <button className="bg-gray-600 mr-5" onClick={handlePrevious} >previous</button>
        <button className="bg-red-600 m-5" onClick={handleNext} >Next</button>
        <button className="bg-green-600 mr-5" onClick={handleLooksGood}>Looks Good to Me</button>
        {isEditing ? (
              <button className="bg-blue-600" >Save Changes</button>
            ) : (
              <button className="bg-red-600" onClick={handleEditClick}>Suggest Edits</button>
            )}
      </div>
    </div>
  )
}

export default page;