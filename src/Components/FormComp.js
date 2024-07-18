import React, { useContext, useEffect, useState } from 'react'
import "./styles/form.css"
import { AppContext } from '../context/AppContext'
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'

export default function FormComp() {

    const navigate = useNavigate()

    const {skillsState} = useContext(AppContext)

    const [ageGroups, setAgeGroups] = useState([0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12])
    const [skills, setSkills] = useState([...skillsState?.skills])
    const [upperLimit, setUpperLimit] = useState(0)
    const [lowerLimit, setLowerLimit] = useState(0)
    const [skill, setSkill] = useState(skills[0]?.skill)

    const {
        setArticles, setActivities, setArticlePriority, setActivityPriority
    } = useContext(AppContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        // const formData = new FormData(event.target)
        // const prompt = formData.get("schema") === "parent" ? parentPromptTemplate : childPromptTemplate;
        console.log({
            upperLimit, lowerLimit,skill 
        })

        navigate("/article", {state: JSON.stringify({
            ageGroup: `${lowerLimit}-${upperLimit}`,
            skill
        })})
    }

    const handleChange = (event) => {
        if (event?.target?.name === "schema") {
            console.log(event.target?.value)
            const temp1 = ageGroups?.filter(grp => grp?.type === event.target?.value)
            const temp2 = skillsState?.skills?.filter(s => s?.type === event.target?.value)
            // console.log(temp)
            setAgeGroups(temp1)
            setSkills(temp2)
        }
        if (event?.target?.name === "lower-limit") {
            console.log(event?.target?.value)
            setLowerLimit(event?.target?.value)
        } else if (event?.target?.name === "upper-limit") {
            setUpperLimit(event?.target?.value)
        } else {
            setSkill(event?.target?.value)
        }
    }

    useEffect(() => {
        setActivities([])
        setArticles([])
        setActivityPriority("")
        setActivityPriority("")
    }, [])

    return (
        <div className='form-main'>
            <div className='form-container'>
                <form onSubmit={handleSubmit} onChange={handleChange}>
                    <center>
                        <h1>
                            Get your prompt...
                        </h1>
                    </center>
                    <div className='input-container'>
                        <label htmlFor="age-group">
                            Age group:
                        </label>
                        <div className='input-container'>
                            <label htmlFor='lower-limit'>Lower Limit:</label>
                            <select value={lowerLimit} name="lower-limit">
                                {ageGroups?.map(item => (
                                    <option key={nanoid(6)} value={item}>{item}</option>
                                ))}
                            </select>
                            <label htmlFor='upper-limit'>Upper Limit:</label>
                            <select value={upperLimit} name="upper-limit">
                                {ageGroups?.map(item => (
                                    <option key={nanoid(6)} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='input-container'>
                        <label htmlFor="skill">
                            Skills:
                        </label>
                        <select value={skill} name='skill'>
                            {skills.map(grp => (
                                <option key={nanoid(6)} value={grp.skill} >{grp.skill}</option>
                            ))}
                        </select>
                    </div>
                    <center>
                    <input className='btn' type='submit' value="Generate" />
                    </center>
                </form>
            </div>
            {/* <div>
                <p>
                    prompt
                </p>
            </div> */}
        </div>
      )
}
