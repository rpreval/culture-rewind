const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;
app.use(express.static(__dirname));
app.get("/health", (_, res) => res.json({ ok: true, app: "Culture Rewind" }));

const questions = [
 {id:1,year:1992,era:"1990–1994",category:"Hip-Hop & Music",difficulty:"Easy",q:"Which group released the influential album The Chronic in 1992?",options:["N.W.A.","Dr. Dre","Public Enemy","A Tribe Called Quest"],answer:1,why:"Dr. Dre's solo debut helped popularize G-funk, shaping West Coast hip-hop's sound and production."},
 {id:2,year:1998,era:"1995–1999",category:"Hip-Hop & Music",difficulty:"Medium",q:"Which artist released the album The Miseducation of Lauryn Hill in 1998?",options:["Erykah Badu","Missy Elliott","Lauryn Hill","Mary J. Blige"],answer:2,why:"The album blended hip-hop, soul, and personal storytelling and won the Grammy for Album of the Year."},
 {id:3,year:1995,era:"1995–1999",category:"Movies",difficulty:"Easy",q:"The comedy film Friday, released in 1995, starred which pair?",options:["Eddie Murphy and Martin Lawrence","Ice Cube and Chris Tucker","Will Smith and DJ Jazzy Jeff","Martin Lawrence and Tisha Campbell"],answer:1,why:"Friday became a cult classic, portraying a day in South Central Los Angeles with humor and memorable characters."},
 {id:4,year:1990,era:"1990–1994",category:"TV Shows & Media",difficulty:"Easy",q:"Which sitcom follows Will, a teenager who moves from West Philadelphia to live with relatives in Bel-Air?",options:["Family Matters","Living Single","The Fresh Prince of Bel-Air","Moesha"],answer:2,why:"The show used comedy to explore class, family, belonging, and Black identity while bringing hip-hop style into mainstream TV."},
 {id:5,year:1999,era:"1995–1999",category:"Movies",difficulty:"Medium",q:"In The Matrix (1999), what is the Matrix revealed to be?",options:["A virtual reality simulation","A parallel planet","A government archive","A time-travel device"],answer:0,why:"The film's questions about reality and technology resonated as computers and the internet became central to everyday life."},
 {id:6,year:2001,era:"2000–2004",category:"Authors & Ideas",difficulty:"Medium",q:"Who wrote the novel Americanah, published in 2013?",options:["Zadie Smith","Chimamanda Ngozi Adichie","Toni Morrison","Maya Angelou"],answer:1,why:"Adichie's novel examines migration, race, identity, and belonging through the experiences of Nigerians in the United States and the UK."},
 {id:7,year:2003,era:"2000–2004",category:"Hip-Hop & Music",difficulty:"Medium",q:"Which Atlanta duo released the double album Speakerboxxx/The Love Below in 2003?",options:["Mobb Deep","Clipse","OutKast","UGK"],answer:2,why:"OutKast's genre-blending success challenged narrow expectations of Southern hip-hop and reached a global audience."},
 {id:8,year:2004,era:"2000–2004",category:"Painters, Art & Style",difficulty:"Medium",q:"Which artist is especially associated with street-art works that combine stencil imagery and political satire?",options:["Banksy","Claude Monet","Georgia O’Keeffe","Norman Rockwell"],answer:0,why:"Banksy's anonymous public interventions brought street art and questions about authority, war, consumerism, and public space into wider debate."},
 {id:9,year:2006,era:"2005–2009",category:"TV Shows & Media",difficulty:"Medium",q:"Which platform, launched in 2005, became central to the rise of online video culture?",options:["MySpace","YouTube","Tumblr","Snapchat"],answer:1,why:"YouTube lowered barriers to publishing and sharing video, changing music promotion, comedy, news, and celebrity."},
 {id:10,year:2008,era:"2005–2009",category:"Hip-Hop & Music",difficulty:"Easy",q:"Which rapper released the album Tha Carter III in 2008?",options:["T.I.","Lil Wayne","50 Cent","Common"],answer:1,why:"The album's commercial success reflected the mixtape era and the growing influence of Southern rap."},
 {id:11,year:2012,era:"2010–2014",category:"TV Shows & Media",difficulty:"Medium",q:"Which HBO series follows the drug trade and institutions in Baltimore across multiple seasons?",options:["The Wire","Entourage","Boardwalk Empire","Oz"],answer:0,why:"The Wire used crime drama to examine how institutions such as schools, politics, policing, and media shape city life."},
 {id:12,year:2014,era:"2010–2014",category:"Hip-Hop & Music",difficulty:"Medium",q:"Which Kendrick Lamar album was released in 2015 and won the Grammy for Best Rap Album?",options:["Section.80","good kid, m.A.A.d city","To Pimp a Butterfly","DAMN."],answer:2,why:"To Pimp a Butterfly connected jazz, funk, and hip-hop with complex reflections on race, fame, history, and selfhood."},
 {id:13,year:2016,era:"2015–2018",category:"Movies",difficulty:"Easy",q:"Which 2017 Jordan Peele film uses horror to explore race and liberal hypocrisy?",options:["Moonlight","Get Out","Us","Sorry to Bother You"],answer:1,why:"Get Out made social commentary central to a mainstream horror hit and sparked widespread discussion of race and representation."},
 {id:14,year:2015,era:"2015–2018",category:"Painters, Art & Style",difficulty:"Medium",q:"Which contemporary artist is known for reimagining portraits of Black subjects in the style of European Old Masters?",options:["Kehinde Wiley","Jeff Koons","Damien Hirst","Shepard Fairey"],answer:0,why:"Wiley's portraits place contemporary Black sitters into visual traditions that historically excluded or marginalized them."},
 {id:15,year:2017,era:"2015–2018",category:"Authors & Ideas",difficulty:"Medium",q:"Which author wrote Between the World and Me, a 2015 book framed as a letter to his son?",options:["Ta-Nehisi Coates","James Baldwin","Colson Whitehead","Michael Eric Dyson"],answer:0,why:"Coates explores race, history, and the lived experience of Black Americans, drawing on a long tradition of Black political writing."},
 {id:16,year:2010,era:"2010–2014",category:"TV Shows & Media",difficulty:"Easy",q:"Which social platform became known for short posts originally limited to 140 characters?",options:["Instagram","Twitter","Pinterest","Reddit"],answer:1,why:"Twitter accelerated real-time public conversation and helped hashtags organize discussion around news, entertainment, and social movements."},
 {id:17,year:1991,era:"1990–1994",category:"Painters, Art & Style",difficulty:"Medium",q:"Which New York artist's legacy is strongly associated with neo-expressionist paintings and graffiti-influenced imagery?",options:["Jean-Michel Basquiat","Edward Hopper","Mark Rothko","Andy Warhol"],answer:0,why:"Basquiat died in 1988, but his work continued to influence artists and debates about race, power, and the art market throughout the 1990s and beyond."},
 {id:18,year:2000,era:"2000–2004",category:"Movies",difficulty:"Medium",q:"Which 2000 film launched a long-running franchise centered on a group of young wizards?",options:["The Lord of the Rings: The Fellowship of the Ring","Harry Potter and the Philosopher’s Stone","The Chronicles of Narnia","Eragon"],answer:1,why:"The first Harry Potter film arrived in 2001, helping turn a bestselling book series into a global film phenomenon."},
 {id:19,year:1997,era:"1995–1999",category:"Authors & Ideas",difficulty:"Medium",q:"Who wrote the 1997 novel Paradise, and was the first Black woman to win the Nobel Prize in Literature?",options:["Alice Walker","Toni Morrison","Maya Angelou","Octavia E. Butler"],answer:1,why:"Morrison's work explored Black life, memory, history, and language; she received the Nobel Prize in Literature in 1993."},
 {id:20,year:2018,era:"2015–2018",category:"Hip-Hop & Music",difficulty:"Easy",q:"Which Childish Gambino song and video became a major 2018 cultural conversation about race and gun violence?",options:["Redbone","This Is America","3005","Feels Like Summer"],answer:1,why:"This Is America juxtaposed celebratory performance with sudden violence, prompting discussion of spectacle, racism, and media attention."},
 {id:21,year:2009,era:"2005–2009",category:"Painters, Art & Style",difficulty:"Easy",q:"What footwear culture became closely tied to hip-hop, basketball, collecting, and streetwear?",options:["Espadrilles","Sneaker culture","Clog collecting","Dress-shoe culture"],answer:1,why:"Sneakers became cultural symbols and collectibles, connecting sports, music, fashion, marketing, and identity."},
 {id:22,year:1996,era:"1995–1999",category:"Hip-Hop & Music",difficulty:"Medium",q:"Which rapper released All Eyez on Me in 1996?",options:["Nas","Tupac Shakur","The Notorious B.I.G.","Snoop Dogg"],answer:1,why:"The double album captured Tupac's mix of vulnerability, bravado, social observation, and the commercial scale of 1990s rap."},
 {id:23,year:2013,era:"2010–2014",category:"Movies",difficulty:"Medium",q:"Which 2014 film about a Black gay man growing up in Miami won the Academy Award for Best Picture?",options:["Fruitvale Station","Moonlight","Selma","Straight Outta Compton"],answer:1,why:"Moonlight offered an intimate coming-of-age story rarely centered in mainstream cinema and broadened conversations about representation."},
 {id:24,year:2005,era:"2005–2009",category:"TV Shows & Media",difficulty:"Easy",q:"Which long-running animated series features a yellow family living in Springfield?",options:["South Park","Family Guy","The Simpsons","King of the Hill"],answer:2,why:"The Simpsons became a major reference point for satire about American family life, politics, consumer culture, and television itself."},
 {id:25,year:1993,era:"1990–1994",category:"Hip-Hop & Music",difficulty:"Medium",q:"Which Wu-Tang Clan debut album arrived in 1993?",options:["Enter the Wu-Tang (36 Chambers)","The Infamous","Illmatic","Midnight Marauders"],answer:0,why:"The group's raw sound, distinctive personas, and business strategy influenced hip-hop collectives and independent-minded artists."}
];
const rooms = new Map();
function code(){ return Math.random().toString(36).slice(2,8).toUpperCase(); }
function safeQuestion(q){ const {answer, ...rest}=q; return {...rest, correctAnswer:answer}; }
function startRound(room){
 room.round++;
 if(room.round>=room.totalRounds){ room.status="finished"; io.to(room.code).emit("game-finished", {players:[...room.players.values()].map(p=>({id:p.id,name:p.name,score:p.score})).sort((a,b)=>b.score-a.score)}); return; }
 room.questionIndex=0; room.answers={}; room.status="playing";
 sendQuestion(room);
}
function sendQuestion(room){
 const used=room.used || (room.used=[]);
 let pool=questions.filter(q=>!used.includes(q.id));
 if(pool.length<5){used.length=0;pool=questions.slice();}
 const q=pool[Math.floor(Math.random()*pool.length)];
 used.push(q.id); room.current=q; room.answers={};
 io.to(room.code).emit("question", {question:safeQuestion(q),round:room.round+1,totalRounds:room.totalRounds,questionNumber:room.questionIndex+1,totalQuestions:room.questionsPerRound,deadline:Date.now()+15000,players:[...room.players.values()].map(p=>({id:p.id,name:p.name,score:p.score}))});
 if(room.timer) clearTimeout(room.timer);
 room.timer=setTimeout(()=>finishQuestion(room),15000);
}
function finishQuestion(room){
 if(room.status!=="playing") return;
 if(room.timer) clearTimeout(room.timer);
 const q=room.current;
 const results=[];
 for(const p of room.players.values()){
  const a=room.answers[p.id];
  const correct=!!a && a.choice===q.answer;
  const speed=correct?Math.max(0,Math.round(500*(1-Math.min(15000,a.elapsed)/15000))):0;
  const points=correct?1000+speed:0;
  p.score+=points;
  results.push({id:p.id,name:p.name,choice:a?a.choice:null,correct,points,total:p.score});
 }
 room.status="reveal";
 io.to(room.code).emit("answer-reveal",{correctAnswer:q.answer,explanation:q.why,results,players:[...room.players.values()].map(p=>({id:p.id,name:p.name,score:p.score})),questionNumber:room.questionIndex+1,totalQuestions:room.questionsPerRound});
 setTimeout(()=>{
  if(!rooms.has(room.code)||room.status!=="reveal")return;
  room.questionIndex++;
  if(room.questionIndex>=room.questionsPerRound) startRound(room);
  else sendQuestion(room);
 },6500);
}
io.on("connection",socket=>{
 socket.on("create-room",({name,mode="multiplayer"})=>{
  let c=code(); while(rooms.has(c)) c=code();
  const room={code:c,host:socket.id,players:new Map(),status:"lobby",round:-1,questionIndex:0,questionsPerRound:5,totalRounds:5,answers:{},mode,used:[]};
  rooms.set(c,room); room.players.set(socket.id,{id:socket.id,name:String(name||"Player").slice(0,20),score:0});
  socket.join(c); socket.emit("room-created",{code:c,players:[...room.players.values()]});
 });
 socket.on("join-room",({code:c,name})=>{
  c=String(c||"").toUpperCase().trim(); const room=rooms.get(c);
  if(!room){socket.emit("error-message","Room not found. Check the code and try again.");return;}
  if(room.status!=="lobby"){socket.emit("error-message","That game has already started.");return;}
  if(room.players.size>=8){socket.emit("error-message","This room is full (maximum 8 players).");return;}
  room.players.set(socket.id,{id:socket.id,name:String(name||"Player").slice(0,20),score:0}); socket.join(c);
  io.to(c).emit("lobby-update",{code:c,players:[...room.players.values()],host:room.host});
 });
 socket.on("start-game",({code:c})=>{
  const room=rooms.get(String(c||"").toUpperCase()); if(!room||room.host!==socket.id||room.status!=="lobby")return;
  if(room.players.size<1)return;
  room.players.forEach(p=>p.score=0); room.round=-1; room.used=[]; startRound(room);
 });
 socket.on("submit-answer",({code:c,choice})=>{
  const room=rooms.get(String(c||"").toUpperCase()); if(!room||room.status!=="playing"||room.answers[socket.id])return;
  if(!room.players.has(socket.id))return;
  const elapsed=Math.max(0,Math.min(15000,Date.now()-(room.currentStarted||Date.now())));
  room.answers[socket.id]={choice:Number(choice),elapsed};
  if(room.players.size===Object.keys(room.answers).length) finishQuestion(room);
 });
 socket.on("disconnect",()=>{
  for(const room of rooms.values()){
   if(room.players.has(socket.id)){
    room.players.delete(socket.id);
    io.to(room.code).emit("lobby-update",{code:room.code,players:[...room.players.values()],host:room.host});
    if(room.players.size===0){if(room.timer)clearTimeout(room.timer);rooms.delete(room.code);}
    else if(room.host===socket.id){room.host=[...room.players.keys()][0];io.to(room.code).emit("host-changed",{host:room.host});}
   }
  }
 });
});
const originalSend=sendQuestion;
sendQuestion=function(room){room.currentStarted=Date.now();originalSend(room);};
server.listen(PORT,()=>console.log(`Culture Rewind running on port ${PORT}`));
