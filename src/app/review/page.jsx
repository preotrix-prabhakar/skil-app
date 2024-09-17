
"use client"
import { useEffect, useState } from "react"




function page() {
  const [skillsData,setSkillsData]=useState([]);

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
  return (
    <div>
      hello world!!!
      <div>
        {skillsData.map((array,index)=>(<h1>{array.name}</h1> ))}
        
      </div>
    </div>
  )
}

export default page
