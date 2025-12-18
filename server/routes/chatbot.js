// display general info about admin

/*
Goal of this step:

-> Store admin info
-> Respond to ONE keyword only
-> Prove chatbot logic works 
*/

const express = require('express');
const router = express.Router();

const adminData = {
    name: "Adya Mishra",
    role: "Full Stack Developer",
    bio: "Passionate developer with expertise in building scalable web applications and a knack for problem-solving.",
    hobbies: ['Developing websites', 'Writing Novels', 'Travelling', 'Vlogging', 'Singing', 'Dancing', 'Self Portrait Photography', "Painting", 'Cooking'],
    contact: {
        email: "mishraadya714@gmail.com",
        linkedIn: "https://www.linkedin.com/in/adya-mishra-334a88303/",
        github: "https://github.com/adyaamishraa"
    },
    eduBg : 'I completed my 10th from Sri Sathya Sai Vidhya Vihar and 12th from dummy school. I am in 4th year of college, completeing my B.tech from IPS academy Rau.',
    motivation: `I get motivated in my hard days by reviewing my past projects. I take inspiration from myself only.`
}




const rules = [
    {
        keywords: [' hey ', ' hi ', ' hello '],
        reply: () => {
            return 'Hello! How Can I help You!'
        }
    },
    {
        keywords: [' who are you ', ' tell me about yourself ', ' about you ', ' name ', ' introduce ', ' introduction ', ' role ', ' bio '],
        reply: () => {
            return `My name is ${adminData.name}, my role in tech is ${adminData.role}. ${adminData.bio}`
        }
    },
    {
        keywords: [' age ', ' date of birth ', ' dob ', ' year ', ' birthday ', ' bday ', ' old ', ' born '],
        reply: () => {
            return `I was born in 2004 7 January, will turn 22 in 2026`
        }
    },
    {
        keywords: [' employed ', ' work ', ' experience ', ' knowledge about full stack ', ' pern ', ' full stack ', ' company '],
        reply: () => {
            return `I am working in Web Dev since second year of my college. Looking forward to collaborate.`
        }
    },
    {
        keywords: [' passion ', ' things your are passionate about ', ' hobbies ', ' interests '],
        reply: () => {
            return `My hobbies are:  ${adminData.hobbies.join(" , ")}`
        }
    },
    {
        keywords: [' contact ', ' email ', ' linkedin ', ' reach '],
        reply: () => {
            return `You can contact me through my email ${adminData.contact.email} or on my linkedIn profile ${adminData.contact.linkedIn}`
        }
    },
    {
        keywords: [' education ', ' school ', ' college ', ' course '],
        reply: () => {
            return `${adminData.eduBg}`
        }
    },
    {
        keywords: [' motivation ', ' inspiration ', ' motivate ', ' inspire ', ' hard days '],
        reply: () => {
            return `${adminData.motivation}`
        }
    },
    {
        keywords: [' thank you ', ' good ', ' bye '],
        reply: () => {
            return `Thank You. Bye Bye.`
        }
    }
]




router.post('/', (req,res) => {
    const usermsg = req.body.message; //comes from frontend - user will send the query

    // safety security
    if(!usermsg){
        return res.json({
            alert: "Please ask something about Admin"
        })
    }

    const msg = ` ${usermsg.toLowerCase().trim()} `;  //trim removes extra space 

    for(let rule of rules){ // looping though every rule inside rules. 
        for(let keyword of rule.keywords){  //finding keyword user entered inside keywords
            if(msg.includes(keyword)){  // after finding/matching keyword
                return res.json({  
                    reply: rule.reply() // reply hardcoded will be shown in UI
                })
            }
        }
    }

    /* 
    Check rule 1:
    Does message contain keyword 1? No
    Does message contain keyword 2? Yes
    → Reply and stop

    Don’t check other rules.
    */

    res.json({
        reply: "I can tell you about my hobbies, my name or how to contact. Try asking one of those."
    });

})

module.exports = router;
