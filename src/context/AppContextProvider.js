import React, { useState } from 'react'
import { AppContext } from './AppContext'

export default function AppContextProvider({children}) {
    const [ageGroups, setAgeGroups] = useState([
        {id: "01", type: "parent", ageGroup: "1-2"},
        {id: "02", type: "parent", ageGroup: "3-4"},
        {id: "03", type: "parent", ageGroup: "5-6"}, 
        {id: "04", type: "parent", ageGroup: "7-8"}, 
        {id: "05", type: "parent", ageGroup: "9-10"}, 
        {id: "06", type: "parent", ageGroup: "11-12"},
        {id: "07", type: "child", ageGroup: "1.5-2.5"},
        {id: "08", type: "child", ageGroup: "3.5-4.5"},
        {id: "09", type: "child", ageGroup: "5.5-6.5"},
        {id: "10", type: "child", ageGroup: "7.5-8.5"},
        {id: "11", type: "child", ageGroup: "9.5-10.5"},
        {id: "12", type: "child", ageGroup: "11.5-12.5"},
      ])
    const [skills, setSkills] = useState([
        {id: "01",type: "parent", skill:"Nutrition and Healthy Eating"},
        {id: "02",type: "parent", skill:"Technology Use"},
        {id: "03",type: "parent", skill:"Financial Management"},
        {id: "04",type: "parent", skill:"Social Connections"},
        {id: "05",type: "parent", skill:"Environmental Awareness"},
        {id: "06",type: "parent", skill:"Self-Care"},
        {id: "07",type: "parent", skill:"Work-Life Balance"},
        {id: "08",type: "child", skill: "Balance"},
        {id: "09",type: "child", skill: "Hand-eye coordination"},
        {id: "10",type: "child", skill: "Dietary habits"},
        {id: "11",type: "child", skill: "Visual"},
        {id: "12",type: "child", skill: "Puberty"},
        {id: "13",type: "child", skill: "Vocabulary development"},
        {id: "14",type: "child", skill: "Analytical thinking"},
        {id: "15",type: "child", skill: "Short-term memory"},
        {id: "16",type: "child", skill: "Focus duration"},
        {id: "17",type: "child", skill: "Inductive reasoning"},
        {id: "18",type: "child", skill: "Reading comprehension"},
        {id: "19",type: "child", skill: "Artistic expression"},
        {id: "20",type: "child", skill: "Verbal communication"},
        {id: "21",type: "child", skill: "Sharing"},
        {id: "22",type: "child", skill: "Social etiquette"},
        {id: "23",type: "child", skill: "Recognizing emotions in others"},
        {id: "24",type: "child", skill: "Negotiation skills"},
        {id: "25",type: "child", skill: "Recognizing one's own emotions"},
        {id: "26",type: "child", skill: "Strategies to calm down"},
        {id: "27",type: "child", skill: "Positive self-image"},
        {id: "28",type: "child", skill: "Relaxation techniques"},
        {id: "29",type: "child", skill: "Bouncing back from setbacks"},
        {id: "30",type: "child", skill: "Moral reasoning"},
        {id: "31",type: "child", skill: "Integrity"},
        {id: "32",type: "child", skill: "Truth-telling"},
        {id: "33",type: "child", skill: "Equality"},
        {id: "34",type: "child", skill: "Helping behavior"},
        {id: "35",type: "child", skill: "Sound discrimination"},
        {id: "36",type: "child", skill: "Word formation rules"},
        {id: "37",type: "child", skill: "Sentence structure"},
        {id: "38",type: "child", skill: "Meaning of words and phrases"},
        {id: "39",type: "child", skill: "Language use in social contexts"},
        {id: "40",type: "child", skill: "Temperament"},
        {id: "41",type: "child", skill: "Self-concept"},
        {id: "42",type: "child", skill: "Learning preferences"},
        {id: "43",type: "child", skill: "Emotional stability"},
        {id: "44",type: "child", skill: "Gender roles"},
        {id: "45",type: "child", skill: "Self-perception"},
        {id: "46",type: "child", skill: "Awareness of sexual orientation"},
        {id: "47",type: "child", skill: "Boundaries"},
        {id: "48",type: "child", skill: "Personal care"},
        {id: "49",type: "child", skill: "Expressive language"},
      ])
    const [articles, setArticles] = useState([])
    const [intro, setIntro] = useState([])
    const [activities, setActivities] = useState([])
    const [promptIndex, setPromptIndex] = useState(-1);
    const [propIndex, setPropIndex] = useState(-1)
    const [articlePriority, setArticlePriority] = useState("")
    const [activityPriority, setActivityPriority] = useState("")

    return (
        <AppContext.Provider
         value={{
            skillsState: {skills, setSkills}, 
            ageGroupsState: {ageGroups, setAgeGroups},
            articles,
            setArticles,
            intro, setIntro,
            activities, setActivities,
            propIndex, setPropIndex,
            promptIndex, setPromptIndex,
            articlePriority, setArticlePriority,
            activityPriority, setActivityPriority
         }}
        >
            {children}
        </AppContext.Provider>
    )
}
