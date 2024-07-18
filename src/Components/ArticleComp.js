import React, {useContext, useEffect, useState} from 'react'
import Papa from "papaparse";
import { useLocation } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AppContext } from '../context/AppContext';
import { nanoid } from 'nanoid';
import "./styles/articleComp.css";
import generatePDF, { Margin, Resolution, usePDF } from 'react-to-pdf';

const sheetURI = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS3g3IYrHuOodXN8jaAg8h5--ZLaSLdZBk-yl45WjxDsDnxHOJi8O2HOW_Kpa-17w/pub?gid=714031361&single=true&output=csv";
const GPT = "GPT";
const GEMINI = "GEMINI";
const gptApiKey = "sk-proj-Oj8a9C1vyByZoHGPxXchT3BlbkFJyDRLSmdsLgvlS06qaHYr"
const genAIKey = "AIzaSyD9uz73qadW3X5tVN3PEfwY6U6VeYaeXN4"
const gptEndpoint = "https://api.openai.com/v1/chat/completions"

const genAI = new GoogleGenerativeAI(genAIKey)

function ArticleChain (props) {
    const {contentArr, onRegenerate, onNext, isLoading, onRemove, priorityOrder, setPriorityOrder, onGenerateMore} = props;
    if(isLoading) {
        return (
            <div>
                <center>
                    <h3>Generating...</h3>
                </center>
            </div>
        )
    }
    return (
        <div className='articles'>
            {contentArr?.map((content, index) => {
                const res = content?.replace(/\*\*(.*?)\*\*/g, `<strong>$1</strong>`)
                const temp = res.split("\n")
                let html = ``;
                temp.forEach(item => {
                    if (item.startsWith("* ")) {
                        html += item.replace("* ", "<li>") + "</li>\n"
                    } else {
                        html += item+"\n"
                    }
                })
                return (
                <><p key={nanoid(6)} dangerouslySetInnerHTML={{ __html: html }}></p>
                <div className='article-footer'>
                    <button onClick={() => onRegenerate(index)}>
                        Regenerate response
                    </button>
                    {onRemove && <button style={{ backgroundColor: "red" }} onClick={() => onRemove(index)}>
                        Remove article
                    </button>}
                </div></>
            )})}
            {onRemove && <div className='articles-activities-footer'>
                    <button onClick={onGenerateMore}>
                    Generate more...
                    </button><br />
                    <label for="priority">
                        Set Priority:
                    </label>
                    <input className='priority-order-input' type='text' value={priorityOrder} onChange={(e) => setPriorityOrder(e.target.value)} placeholder='1, 2, 3, 4,...' /><br />
                    <small>
                        Enter <b>comma seperated</b> order of articles. 
                    </small>
                </div>}
            <button style={{ backgroundColor: "green" }} onClick={onNext}>
                Good to go, move to next
            </button>
        </div>
    )
}

function MockDoc (props) {
    const {intro, articlesArr, activitiesArr, skill, age, schema} = props;

    const { toPDF, targetRef } = usePDF({
        filename: `${skill}_${age}_${schema}.pdf`, 
        resolution: Resolution.HIGH,
        page: {
            margin: Margin.SMALL,
            format: 'letter',
            
        }})

    const {articlePriority, setArticlePriority,
        activityPriority, setActivityPriority} = useContext(AppContext);
    if (articlePriority !== "") {
        let articlesSeq = articlePriority?.split(",")?.map(item => (parseInt(item)-1))
        const temp = [...articlesArr]
        articlesSeq?.forEach((i, index) => {
            console.log(temp[i], i, temp)
            articlesArr[index] = temp[i]
        })
    }
    if (activityPriority !== "") {
        let activitiesSeq = activitiesArr?.split(",")?.map(item => parseInt(item))
        const temp = [...activitiesArr]
        activitiesSeq?.forEach((i, index) => {
            activitiesArr[index] = temp[i]
        })
    }

    return (
        <div className='article-body'>
            <div ref={targetRef} className='article-body'>
                <h1>
                    Document on {skill} for {age} year old children in the context of {schema}
                </h1>
                <h3>
                    Introductory Article:
                </h3>
                {intro?.map(item => {
                    const res = item?.replace(/\*\*(.*?)\*\*/g, `<strong>$1</strong>`)
                    const temp = res.split("\n")
                    let html = ``;
                    temp.forEach(item => {
                        if (item.startsWith("* ")) {
                            html += item.replace("* ", "<li>") + "</li>\n"
                        } else {
                            html += item+"\n"
                        }
                    })
                    return (
                        <p dangerouslySetInnerHTML={{__html: html}} key={nanoid(6)}>
                        </p>
                    )
                })}
            </div>
            <div className='article-body'>
            {articlesArr?.map((content, index) => {
                const res = content?.replace(/\*\*(.*?)\*\*/g, `<strong>$1</strong>`)
                const temp = res.split("\n")
                let html = ``;
                temp.forEach(item => {
                    if (item.startsWith("* ")) {
                        html += item.replace("* ", "<li>") + "</li>\n"
                    } else {
                        html += item+"\n"
                    }
                })
                return (
                    <div>
                    <h3>
                        Article no: {index+1}
                    </h3>
                    <p key={nanoid(6)} dangerouslySetInnerHTML={{__html: html}}>
                    </p>
                    </div>
                )
            })}
            </div>
            <div className='article-body'>
            {activitiesArr?.map((content, index) => {
                const res = content?.replace(/\*\*(.*?)\*\*/g, `<strong>$1</strong>`)
                const temp = res.split("\n")
                let html = ``;
                temp.forEach(item => {
                    if (item.startsWith("* ")) {
                        html += item.replace("* ", "<li>") + "</li>\n"
                    } else {
                        html += item+"\n"
                    }
                })
                return (
                <div>
                <h3>
                Activity no: {index+1}
                </h3>
                <p key={nanoid(6)} dangerouslySetInnerHTML={{__html: html}}>
                </p>
                </div>
            )})}
            </div>
            <div>
                <button onClick={() => {
                    window.print()
                }}>
                    Download as PDF
                </button>
            </div>
        </div>
    )
}
 
export default function ArticleComp() {
    const propSeq = ["intro-gpt", "intro-gemini", "articles-gpt", "articles-gemini", "activities-gpt", "activities-gemini"];
    const [data, setData] = useState({});
    const [model, setModel] = useState(GPT);
    const [params, setParams] = useState({});
    const [responseContent, setResponseContent] = useState([])
    const [error, setError] = useState(null)
    const [prompt, setPrompt] = useState("");
    const [priorityOrder, setPriorityOrder] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const location = useLocation()

    const { articles, setArticles, intro, setIntro, activities, setActivities, propIndex, setPropIndex, promptIndex, setPromptIndex, articlePriority, setArticlePriority, activityPriority, setActivityPriority } = useContext(AppContext)

    const fetchData = () => {
        try {
            Papa.parse(sheetURI, {
                download: true,
                header: true,
                complete: (results) => {
                    setData(results.data)
                    setPropIndex(0)
                    setPromptIndex(0)
                }
            })
    
            // console.log(data)
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }

    const fetchGptResponse = async (prompt, arr) => {
        // console.log("Data fetched from gpt")
        await fetch(gptEndpoint, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${gptApiKey}`,
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo-0125",
                messages: [prompt]
            })
        }).then(res => res.json())
          .then(resData => {
            const result = resData?.choices[0]?.message?.content
            // console.log(result)
            arr.push(result)
            return result;
        }).catch(error => {
            console.log(error)
            setError(error)
            return "";
        })
    }

    const generateContent = async (prmIndex, prpIndex, isRegen = false, isMore = false,index=-1) => {
        console.log(propSeq[prpIndex], data[prmIndex][propSeq[prpIndex]])
        setIsLoading(true)
        if (data[prmIndex][propSeq[prpIndex]] === "" || data[prmIndex][propSeq[prpIndex]] == "NA") {
            setPropIndex(state => state+1)
            return;
        }

        let promptContent = "";
        if (data[prmIndex][propSeq[prpIndex]]?.includes("<article>") || data[prmIndex][propSeq[prpIndex]]?.includes("<activity>")) {
            //use article from previous response
            if (propSeq[propIndex].includes("articles")) {
                let newArticles = [];
                const m = genAI.getGenerativeModel({
                    model: "gemini-pro"
                })

                if (propSeq[prpIndex].includes("gpt")) {
                    setModel(GPT)
                    await articles?.forEach(async (article, index) => {
                        const p = data[prmIndex][propSeq[prpIndex]]?.replace(/<article>/, `"${article}"`)
                        console.log(data[prmIndex][propSeq[prpIndex]])
                        console.log(p)
                        const pObj = {
                            role: "user", content: p
                        }
                        const r = await fetchGptResponse(pObj, newArticles)
                        setResponseContent([...newArticles])
                    })
                } else {
                    setModel(GEMINI)
                    console.log(articles)
                    await articles?.forEach(async (article, index) => {
                        const p = data[prmIndex][propSeq[prpIndex]]?.replace(/<article>/, `"${article}"`)
                        console.log(data[prmIndex][propSeq[prpIndex]])
                        console.log(p)
                        const r = await m.generateContent(p)
                        // newArticles?.push(r.response.text())
                        setResponseContent(state => [...state, r.response.text()])
                    })
                }
                setPrompt(data[prmIndex][propSeq[prpIndex]])
                // await articles?.forEach(async (article, index) => {
                //     const p = data[prmIndex][propSeq[prpIndex]]?.replace(/<article>/, `"${article}"`)
                //     // setPrompt(p)
                //     console.log(data[prmIndex][propSeq[prpIndex]])
                //     console.log(p)
                //     if (propSeq[prpIndex].includes("gpt")) {
                //         const pObj = {
                //             role: "user", content: p
                //         }
                //         const r = await fetchGptResponse(pObj, newArticles)
                //     } else {
                //         const r = await m.generateContent(p)
                //         newArticles?.push(r.response.text())
                //     }
                //     setResponseContent(newArticles)
                // })
            } else if (propSeq[propIndex].includes("activities")) {
                let newActivities = [];
                const m = genAI.getGenerativeModel({
                    model: "gemini-pro"
                })

                if (propSeq[prpIndex].includes("gpt")) {
                    setModel(GPT)
                    await activities?.forEach(async (article, index) => {
                        const p = data[prmIndex][propSeq[prpIndex]]?.replace(/<activity>/, `"${article}"`)
                        console.log(data[prmIndex][propSeq[prpIndex]])
                        console.log(p)
                        const pObj = {
                            role: "user", content: p
                        }
                        const r = await fetchGptResponse(pObj, newActivities)
                        setResponseContent([...newActivities])
                    })
                } else {
                    setModel(GEMINI)
                    console.log(activities)
                    await activities?.forEach(async (article, index) => {
                        const p = data[prmIndex][propSeq[prpIndex]]?.replace(/<activity>/, `"${article}"`)
                        console.log(data[prmIndex][propSeq[prpIndex]])
                        console.log(p)
                        const r = await m.generateContent(p)
                        // newArticles?.push(r.response.text())
                        setResponseContent(state => [...state, r.response.text()])
                    })
                }
                setPrompt(data[prmIndex][propSeq[prpIndex]])
                
            }
            setIsLoading(false)
            return;
        } else {
            promptContent = data[prmIndex][propSeq[prpIndex]]
        }

        const p = promptContent?.replace(/<skill>/g, params?.skill).replace(/<age>/g, params?.ageGroup)
        setPrompt(p)

        if (propSeq[prpIndex].includes("gpt")) {
            setModel(GPT)
            // call openai api
            const promptObj = {
                role: "user", content: promptContent?.replace(/<skill>/g, params?.skill).replace(/<age>/g, params?.ageGroup)
            }
            let tempRes = [];
            if (propSeq[prpIndex] === "articles-gpt" || propSeq[propIndex] === "activities-gpt"){
                if (isRegen) {
                    const result = await fetchGptResponse(promptObj, tempRes)
                    let temp = [...responseContent]
                    temp[index] = tempRes.pop()
                    setResponseContent(temp)
                } else if (isMore) {
                    const result = await fetchGptResponse(promptObj, tempRes)
                    setResponseContent(state => [...state, ...tempRes])
                } else {
                    for(let i = 1; i <= 4; i++) {
                        await fetchGptResponse(promptObj, tempRes)
                        setResponseContent([...tempRes])
                        // setPriorityOrder(state => [...state, (state.length+i)])
                    }
                }
            } else {
                const result = await fetchGptResponse(promptObj, tempRes)
                setResponseContent(tempRes)
            }

        } else {
            // call gemini
            setModel(GEMINI)
            const m = genAI.getGenerativeModel({
                model: "gemini-pro"
            })
            if (propSeq[prpIndex] === "articles-gemini" || propSeq[prpIndex] === "activities-gemini") {
                if (isRegen) {
                    const result = await m.generateContent(promptContent?.replace(/<skill>/g, params?.skill).replace(/<age>/g, params?.ageGroup))
                    let temp = [...responseContent]
                    temp[index] = result.response.text()
                    setResponseContent(temp)
                } else {
                    for (let i = 1; i <= 4; i++) {
                        const result = await m.generateContent(promptContent?.replace(/<skill>/g, params?.skill).replace(/<age>/g, params?.ageGroup))
                        setResponseContent(state => [...state, result.response.text()])
                        // setPriorityOrder(state => [...state, (state.length+i)])
                    } 
                }
            } else {
                const result = await m.generateContent(promptContent?.replace(/<skill>/g, params?.skill).replace(/<age>/g, params?.ageGroup))
                setResponseContent([result.response.text()])
            }
        }
        setIsLoading(false)
    }

    const nextHandler = () => {
        if (propSeq[propIndex].includes("intro")) {
            setIntro([...responseContent])
        } else if (propSeq[propIndex].includes("articles")) {
            setArticles([...responseContent])
        } else if (propSeq[propIndex].includes("activities")) {
            setActivities([...responseContent])
        }
        setResponseContent([])
        setPropIndex(state => state+1)
        // generateContent(promptIndex, propIndex+1)
    }

    const nextPromptHandler = () => {
        setIntro([])
        setArticles([])
        setArticles([])
        setResponseContent([])
        setPropIndex(0)
        setPromptIndex(state => state+1)
    }

    useEffect(() => {
        setParams(JSON.parse(location.state))
        fetchData();
        // generateContent(0, 0);
    }, [])
    useEffect(() => {
        if(propIndex >= 0 && propIndex < propSeq?.length) {
            generateContent(promptIndex, propIndex)
        }
    }, [data, propIndex, promptIndex])

    // useEffect(() => {
    //     if(propIndex>=0 && promptIndex>=0) {
    //         generateContent()
    //         console.log(propSeq[propIndex])
    //         if (propSeq[propIndex].includes("gpt")) {
    //             setModel(GPT)
    //         } else {
    //             setModel(GEMINI)
    //         }
    //     }
    // }, [propIndex, promptIndex])

    useEffect(() => {
        console.log(responseContent)
    }, [responseContent])

    useEffect(() => {
        console.log(articlePriority, activityPriority)
    }, [activityPriority, articlePriority])

    useEffect(() => {
        console.log({
            articles, intro, activities
        })
    }, [articles, intro, activities])

    if (propIndex >=0 && propIndex < propSeq?.length) {
        // articles chain
        return (
            <div className='article-main'>
                <div className='article-header'>
                    <p>
                        {params?.skill} | {data[promptIndex]?.Schema} | {params?.ageGroup} | {model}
                        {/* {console.log(data[promptIndex]?.schema, promptIndex, data)} */}
                    </p>
                    <p style={{ fontWeight: "normal" }}>
                        <b>Prompt used:</b> {prompt}
                    </p>
                </div>
                <ArticleChain
                 contentArr={responseContent}
                 onRegenerate={(i) => {
                    console.log(i)
                    generateContent(promptIndex, propIndex, true, false, i)
                }}
                 onNext={nextHandler}
                 isLoading={isLoading}
                 onRemove={propSeq[propIndex].includes("articles") || propSeq[propIndex].includes("activities") ? (i) => {
                    let temp = [...responseContent]
                    temp.splice(i, 1)
                    setResponseContent(temp)
                 } : false}
                 priorityOrder={propSeq[propIndex].includes("articles") ? articlePriority : activityPriority}
                 setPriorityOrder={propSeq[propIndex].includes("articles") ? setArticlePriority : setActivityPriority}
                 onGenerateMore={() => {
                    // let temp = responseContent;
                    generateContent(promptIndex, propIndex, false, true, -1)
                    // setResponseContent(state => [...temp, ...state])
                 }}
                />
            </div>
        )
    } else if (propIndex >= propSeq?.length) {
        return (
            <div className='article-main'>
                <div className='article-header'>
                    <p>
                        {params?.skill} | {data[0]?.Schema} | {params?.ageGroup}
                    </p>

                </div>
                <MockDoc
                  intro={intro}
                  articlesArr={articles}
                  activitiesArr={activities}
                  onNext={nextPromptHandler}
                  skill={params?.skill}
                  age={params?.ageGroup}
                  schema={data[0]?.Schema}
                />
            </div>
          )
    }
}
