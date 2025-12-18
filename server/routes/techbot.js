const express = require('express');
const router = express.Router();

const adminTechData = {
    skills: ['PostgreSQL', 'ExpressJs', 'NodeJs', 'ReactJs'],
    software: 'VS code',
    programmingLang : ['C++ Basics', 'JavaScript'],
    framework: ['ReactJs', 'ExpressJs'],
    database: ['PostgreSQL'],
    workingExperience: "3 Years",
    levelOfExpertise: "Intermediate",
    realTimeProjects: "I made Restaurant's Menu website -> Full stack Project, made using PERN.",
    descOfRealProj : "A full-stack restaurant web application built using the PERN stack (PostgreSQL, Express.js, React.js, Node.js) that allows users to explore menus, place orders, and enables admins to manage restaurant operations efficiently. Frontend: React.js, Bootstrap 5, Axios, Backend: Node.js ; Express.js ; Database: PostgreSQL ; Authentication: cookies ; bcryptTools: Postman, Git, GitHub.",
    challengingTask : "CRUD operations, showing data fetched from backend in UI. ",
    complexPrblmApp : "Dividing a big problem into small problems, if it's still seems tough, I divide it into small sub problems.",
    taskPriority : "I put my work above all then go for less important work.",
    newskills : "Integrating AI with PERN stack.",
    skillToImprove: "Write functions with more efficiency"
}

const rules = [
     {
        keywords: [' new skills ', ' recent skills ', ' learning ', ' new skills practicing '],
        reply: () =>  {
            return `Currently I am practicing ${adminTechData.newskills}, Netflix based portfolio is my first project in which I am introduced to "Rule BAsed AI"`
        }
    },
    {
        keywords: [' real time projects ', ' main projects ', ' working projects ', ' projects '],
        reply: () => {
            return `${adminTechData.realTimeProjects} other than that, I made React based projects for frontend expertise.`
        }
    },
    {
        keywords: [' description about restaurant proj ', ' tell about restaurant project ', ' desc about working project ', ' desc about restaurant proj '],
        reply:() => {
            return `${adminTechData.descOfRealProj}`
        }
    },
    {
        keywords: [' challenges ', ' challenging ', ' task ', ' hard task ', ' complex task '],
        reply: () => {
            return `The task which took most of my time was ${adminTechData.challengingTask}. With time I became good in this.`
        }
    },
    {
        keywords: [' approach to solve ', ' solve problem ', ' solve problems ' , ' complexity ', ' complexities ' , ' complex problems ', ' complex problem '],
        reply: () => {
            return `I solve complex problems ${adminTechData.complexPrblmApp}`
        }
    },
    {
        keywords: [' priority ', ' priorities ' ,' work life balance ', ' important work '],
        reply: () => {
            return `${adminTechData.taskPriority}`
        }
    },
    {
        keywords: [' improving skills ', ' sharpening skills '],
        reply: () => {
            return ` I am  practicing how to ${adminTechData.skillToImprove}`
        }
    },
    {
        keywords: [' skills ', ' talent ', ' work '],
        reply: () => {
            return `I am skilled in ${adminTechData.skills.join(",")}`
        }
    },
    {
        keywords: [' software ', ' write code ', ' app '],
        reply: () => {
            return `I write my code in ${adminTechData.software}`
        }
    },
    {
        keywords: [' lang ', ' language ', ' prog lang ', ' prog ', ' programming '],
        reply: () => {
            return `I can write my code in ${adminTechData.programmingLang.join(',')}`
        }
    },
    {
        keywords: [' framework '],
        reply: () => {
            return `I use ${adminTechData.framework.join(',')} as my framework`
        }
    },
    {
        keywords: [' db ', ' database '],
        reply: () => {
            return `I use ${adminTechData.database} as my database in full stack.`
        }
    },
    {
        keywords: [' working since ', ' experience '],
        reply: () => {
            return `I am working in FULL STACK since ${adminTechData.workingExperience}`
        }
    },
    {
        keywords: [' level ', ' expertise '],
        reply: () => {
            return `I am ${adminTechData.levelOfExpertise} as I have been working since ${adminTechData.workingExperience}`
        }   
    }
]

router.post('/', (req,res) => {

    const userquery = req.body.message;

    if(!userquery){
        return res.json({
            alert: "Please ask something about Admin's Profession"
        })
    }

    const msg = ` ${userquery.toLowerCase().trim()} `;

    for(let rule of rules){
        for(let keyword of rule.keywords){
            if(msg.includes(keyword)){
                return res.json({
                    reply: rule.reply()
                })
            }
        }
    }

    res.json({
        reply: "I can tell you about my work and experience."
    })


})

module.exports =  router;