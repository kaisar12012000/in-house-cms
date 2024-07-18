import React, { useContext, useEffect, useState } from 'react'
import "./styles/form.css"
import { AppContext } from '../context/AppContext'
import { nanoid } from 'nanoid'
import { useNavigate } from 'react-router-dom'

export default function FormComp() {

    const navigate = useNavigate()

    const {ageGroupsState, skillsState} = useContext(AppContext)

    const [ageGroups, setAgeGroups] = useState([...ageGroupsState?.ageGroups?.filter(grp => grp.type === "parent")])
    const [skills, setSkills] = useState([...skillsState?.skills])

    const {
        setArticles, setActivities, setArticlePriority, setActivityPriority
    } = useContext(AppContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        // const prompt = formData.get("schema") === "parent" ? parentPromptTemplate : childPromptTemplate;

        navigate("/article", {state: JSON.stringify({
            ageGroup: formData?.get("age-group"),
            skill: formData.get("skill")
        })})
    }

    const handleChange = (event) => {
        if (event?.target?.name === "schema") {
            console.log(event.target?.value)
            const temp1 = ageGroupsState?.ageGroups?.filter(grp => grp?.type === event.target?.value)
            const temp2 = skillsState?.skills?.filter(s => s?.type === event.target?.value)
            // console.log(temp)
            setAgeGroups(temp1)
            setSkills(temp2)
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
                        <select name='age-group'>
                            {ageGroups.map(grp => (
                                <option key={nanoid(6)} value={grp.ageGroup} >{grp.ageGroup}</option>
                            ))}
                        </select>
                    </div>
                    <div className='input-container'>
                        <label htmlFor="skill">
                            Skills:
                        </label>
                        <select name='skill'>
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
