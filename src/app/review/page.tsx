"use client";
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
    };
    questions();
  }, []);

  const handleNext = () => {
    if (currentSkillIndex < currentCategory.skills.length - 1) {
      setCurrentSkillIndex(currentSkillIndex + 1);
    } else if (currentCategoryIndex < skillsData.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentSkillIndex(0);
    }
    setIsEditing(false);
  };

  const handlePrevious = () => {
    if (currentSkillIndex > 0) {
      setCurrentSkillIndex(currentSkillIndex - 1);
    } else if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      setCurrentSkillIndex(skillsData[currentCategoryIndex - 1].skills.length - 1);
    }
    setIsEditing(false);
  };

  const handleLooksGood = () => {
    toast.success("Looks good! Moving to the next skill.");
    handleNext();
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditableLevels([...currentSkill.skill_levels]);
    toast.info("You can now edit the skills.");
  };

  const handleInputChange = (index: number, value: string, field: string) => {
    const updatedLevels = [...editableLevels];
    updatedLevels[index][field] = value;
    setEditableLevels(updatedLevels);
    console.log(index, value);
  };

  const handleSaveEdits = async () => {
    try {
      const response = await fetch("/dummyApiCallKrRhaHun", {
        method: "POST",
        body: JSON.stringify({ skill_levels: editableLevels }),
      });

      if (response.ok) {
        toast.success("edits saved");
        setIsEditing(false);
        setSkillsData((prevSkills) => {
          const updatedSkills = [...prevSkills];
          updatedSkills[currentCategoryIndex].skills[currentSkillIndex].skill_levels = editableLevels;
          return updatedSkills;
        });
      } else {
        toast.error('Failed to save edits.');
        setIsEditing(false);
      }
    } catch (error) {
      toast.error("error saving edits.");
      setIsEditing(false);
    }
  };

  const currentCategory = skillsData[currentCategoryIndex];
  const currentSkill = currentCategory && currentCategory.skills ? currentCategory.skills[currentSkillIndex] : null;
  const showPrevious = currentCategoryIndex > 0 || currentSkillIndex > 0;

  return (
    <div>
      <ToastContainer />
      <div>
        {currentCategory && (
          <div className="mb-10">
            <h1 className="text-blue-600 text-xl p-4 font-black">{currentCategory.name}</h1>
            <p className="text-3xl font-black">{currentSkill.name}</p>
            <p className="text-xl">{currentSkill.description}</p>
            <table className="w-full mt-5 border-2 border-black bg-gray-100">
              <thead>
                <tr>
                  <th className="text-left">Level</th>
                  <th className="text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {(isEditing ? editableLevels : currentSkill.skill_levels).map((level, index: number) => (
                  <tr key={index} className="border-black border-2">
                    <td className="p-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={level.skill_level_mark}
                          onChange={(e) => handleInputChange(index, e.target.value, "skill_level_mark")}
                        />
                      ) : (
                        level.skill_level_mark
                      )}
                    </td>
                    <td >
                      {isEditing ? (
                        <input
                          type="text"
                          value={level.skill_level_description}
                          onChange={(e) => handleInputChange(index, e.target.value, "skill_level_description")}
                        />
                      ) : (
                        level.skill_level_description
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-4 px-4">
        <div>
          {showPrevious ? (
            <button className="bg-gray-300 mr-5 px-2 border-2 border-black shadow-custom-black" onClick={handlePrevious}>previous</button>
          ) : (
            <button className="bg-white mr-5 px-2 border-2 border-black shadow-custom-gray" onClick={handlePrevious} disabled>previous</button>
          )}
          <button className="mx-2 px-2 border-2 border-black shadow-custom-black" onClick={handleNext}>Next</button>
        </div>
        <div>
          <button className="mx-5 px-2 bg-green-600 border-2 border-black shadow-custom-black" onClick={handleLooksGood}>Looks Good to Me</button>
          {isEditing ? (
            <button className="bg-blue-600 border-black shadow-custom-black mr-2" onClick={handleSaveEdits}>Save Changes</button>
          ) : (
            <button className="bg-red-600 border-2 border-black shadow-custom-black" onClick={handleEditClick}>Suggest Edits</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
