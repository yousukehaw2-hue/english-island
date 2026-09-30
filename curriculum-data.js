// English Island v0.8 curriculum database
// School curriculum + EIKEN mapping + prerequisites + misconceptions.
const MISCONCEPTIONS={
 be_subject:"be動詞と主語の対応",be_vs_do:"be動詞とdoの混同",third_person:"三単現-sの脱落",
 verb_after_does:"does後の動詞原形",tense_confusion:"時制の混同",negative_form:"否定文の形",
 modal_base:"助動詞後の原形",wh_choice:"疑問詞の選択",infinitive_form:"不定詞to＋動詞原形の形",gerund_form:"動名詞-ingの形・目的語選択",comparison_form:"比較級・最上級の形",passive_form:"be動詞＋過去分詞の受動態",time_confusion:"時刻の聞き違い",
 number_confusion:"数の聞き違い",detail_missed:"詳細情報の見落とし",main_idea_confusion:"主題の取り違い",
 pronoun_reference:"代名詞の指示対象",unsupported_inference:"根拠のない推測",word_meaning:"語義の未定着"
};
const SKILL_TREE=[
 {id:"vocab_basic",domain:"vocab",name:"基礎生活語彙",school:{stage:"JHS1",unit:"basic-life"},eiken:{grade5:"core",grade4:"core",grade3:"prerequisite",pre2:"prerequisite"},prerequisite:[],misconceptions:["word_meaning"]},
 {id:"vocab_school",domain:"vocab",name:"学校語彙",school:{stage:"JHS1",unit:"school"},eiken:{grade5:"core",grade4:"core",grade3:"core",pre2:"prerequisite"},prerequisite:["vocab_basic"],misconceptions:["word_meaning"]},
 {id:"vocab_daily",domain:"vocab",name:"日常生活語彙",school:{stage:"JHS1",unit:"daily-life"},eiken:{grade5:"core",grade4:"core",grade3:"core",pre2:"prerequisite"},prerequisite:["vocab_basic"],misconceptions:["word_meaning"]},
 {id:"vocab_feeling",domain:"vocab",name:"感情・人物",school:{stage:"JHS1-2",unit:"people-feelings"},eiken:{grade4:"core",grade3:"core",pre2:"core"},prerequisite:["vocab_basic"],misconceptions:["word_meaning"]},
 {id:"vocab_town",domain:"vocab",name:"町・旅行",school:{stage:"JHS1-2",unit:"town-travel"},eiken:{grade4:"core",grade3:"core",pre2:"core"},prerequisite:["vocab_daily"],misconceptions:["word_meaning"]},
 {id:"vocab_nature",domain:"vocab",name:"自然・環境",school:{stage:"JHS2-3",unit:"nature-environment"},eiken:{grade3:"core",pre2:"core"},prerequisite:["vocab_daily"],misconceptions:["word_meaning"]},
 {id:"vocab_society",domain:"vocab",name:"社会・科学",school:{stage:"JHS3+",unit:"society-science"},eiken:{grade3:"bridge",pre2:"core"},prerequisite:["vocab_nature"],misconceptions:["word_meaning"]},
 {id:"grammar_be",domain:"grammar",name:"be動詞",school:{stage:"JHS1",unit:"be-verb"},eiken:{grade5:"core",grade4:"prerequisite",grade3:"prerequisite",pre2:"prerequisite"},prerequisite:[],misconceptions:["be_subject"]},
 {id:"grammar_present",domain:"grammar",name:"一般動詞現在形",school:{stage:"JHS1",unit:"present-simple"},eiken:{grade5:"core",grade4:"core",grade3:"prerequisite",pre2:"prerequisite"},prerequisite:[],misconceptions:["be_vs_do"]},
 {id:"grammar_question",domain:"grammar",name:"一般動詞疑問文",school:{stage:"JHS1",unit:"questions"},eiken:{grade5:"core",grade4:"core",grade3:"prerequisite",pre2:"prerequisite"},prerequisite:["grammar_present"],misconceptions:["be_vs_do"]},
 {id:"grammar_negative",domain:"grammar",name:"一般動詞否定文",school:{stage:"JHS1",unit:"negatives"},eiken:{grade5:"core",grade4:"core",grade3:"prerequisite",pre2:"prerequisite"},prerequisite:["grammar_present"],misconceptions:["negative_form"]},
 {id:"grammar_third",domain:"grammar",name:"三単現",school:{stage:"JHS1",unit:"third-person"},eiken:{grade5:"learning",grade4:"core",grade3:"prerequisite",pre2:"prerequisite"},prerequisite:["grammar_present"],misconceptions:["third_person","verb_after_does"]},
 {id:"grammar_can",domain:"grammar",name:"can・助動詞基礎",school:{stage:"JHS1",unit:"can"},eiken:{grade5:"core",grade4:"core",grade3:"prerequisite",pre2:"prerequisite"},prerequisite:["grammar_present"],misconceptions:["modal_base"]},
 {id:"grammar_wh",domain:"grammar",name:"疑問詞",school:{stage:"JHS1",unit:"wh-questions"},eiken:{grade5:"core",grade4:"core",grade3:"core",pre2:"prerequisite"},prerequisite:["grammar_question"],misconceptions:["wh_choice"]},
 {id:"grammar_progressive",domain:"grammar",name:"進行形",school:{stage:"JHS1-2",unit:"progressive"},eiken:{grade4:"core",grade3:"core",pre2:"prerequisite"},prerequisite:["grammar_be","grammar_present"],misconceptions:["tense_confusion"]},
 {id:"grammar_past",domain:"grammar",name:"過去形",school:{stage:"JHS1-2",unit:"past"},eiken:{grade4:"core",grade3:"core",pre2:"prerequisite"},prerequisite:["grammar_present"],misconceptions:["tense_confusion"]},
 {id:"grammar_future",domain:"grammar",name:"未来表現",school:{stage:"JHS2",unit:"future"},eiken:{grade4:"bridge",grade3:"core",pre2:"prerequisite"},prerequisite:["grammar_present"],misconceptions:["tense_confusion"]},
 {id:"grammar_infinitive",domain:"grammar",name:"不定詞",school:{stage:"JHS2",unit:"infinitive"},eiken:{grade3:"core",pre2:"core"},prerequisite:["grammar_present"],misconceptions:["infinitive_form"]},
 {id:"grammar_gerund",domain:"grammar",name:"動名詞",school:{stage:"JHS2",unit:"gerund"},eiken:{grade3:"core",pre2:"core"},prerequisite:["grammar_present"],misconceptions:["gerund_form"]},
 {id:"grammar_comparison",domain:"grammar",name:"比較",school:{stage:"JHS2",unit:"comparison"},eiken:{grade3:"core",pre2:"core"},prerequisite:["grammar_be"],misconceptions:["comparison_form"]},
 {id:"grammar_passive",domain:"grammar",name:"受動態",school:{stage:"JHS2-3",unit:"passive"},eiken:{grade3:"core",pre2:"core"},prerequisite:["grammar_be","grammar_past"],misconceptions:["passive_form"]},
 {id:"grammar_present_perfect",domain:"grammar",name:"現在完了",school:{stage:"JHS3",unit:"present-perfect"},eiken:{grade3:"core",pre2:"core"},prerequisite:["grammar_past"],misconceptions:["tense_confusion"]},
 {id:"grammar_relative",domain:"grammar",name:"関係代名詞",school:{stage:"JHS3",unit:"relative-clause"},eiken:{grade3:"bridge",pre2:"core"},prerequisite:["grammar_present"],misconceptions:["pronoun_reference"]},
 {id:"listening_basic",domain:"listening",name:"基礎応答・語句",school:{stage:"JHS1",unit:"listening-basic"},eiken:{grade5:"core",grade4:"core",grade3:"prerequisite",pre2:"prerequisite"},prerequisite:[],misconceptions:["detail_missed"]},
 {id:"listening_time",domain:"listening",name:"数・時刻",school:{stage:"JHS1",unit:"numbers-time"},eiken:{grade5:"core",grade4:"core",grade3:"core",pre2:"core"},prerequisite:["listening_basic"],misconceptions:["time_confusion","number_confusion"]},
 {id:"listening_detail",domain:"listening",name:"会話詳細",school:{stage:"JHS1-3",unit:"conversation-detail"},eiken:{grade4:"core",grade3:"core",pre2:"core"},prerequisite:["listening_basic"],misconceptions:["detail_missed"]},
 {id:"listening_main",domain:"listening",name:"要点・意図",school:{stage:"JHS2-3",unit:"conversation-main"},eiken:{grade3:"core",pre2:"core"},prerequisite:["listening_detail"],misconceptions:["main_idea_confusion"]},
 {id:"reading_detail",domain:"reading",name:"短文詳細",school:{stage:"JHS1",unit:"reading-detail"},eiken:{grade5:"core",grade4:"core",grade3:"prerequisite",pre2:"prerequisite"},prerequisite:["vocab_basic"],misconceptions:["detail_missed"]},
 {id:"reading_main",domain:"reading",name:"主題把握",school:{stage:"JHS1-2",unit:"main-idea"},eiken:{grade4:"core",grade3:"core",pre2:"core"},prerequisite:["reading_detail"],misconceptions:["main_idea_confusion"]},
 {id:"reading_inference",domain:"reading",name:"推論",school:{stage:"JHS2-3",unit:"inference"},eiken:{grade3:"core",pre2:"core"},prerequisite:["reading_detail"],misconceptions:["unsupported_inference"]},
 {id:"reading_email",domain:"reading",name:"Eメール読解",school:{stage:"JHS2-3",unit:"functional-text"},eiken:{grade3:"core",pre2:"core"},prerequisite:["reading_detail"],misconceptions:["detail_missed"]},
 {id:"writing_sentence",domain:"writing",name:"基本文生成",school:{stage:"JHS1",unit:"sentence-writing"},eiken:{grade3:"foundation",pre2:"prerequisite"},prerequisite:["grammar_present"],misconceptions:[]},
 {id:"writing_email",domain:"writing",name:"Eメール",school:{stage:"JHS2-3",unit:"email-writing"},eiken:{grade3:"core",pre2:"core"},prerequisite:["writing_sentence"],misconceptions:[]},
 {id:"writing_opinion",domain:"writing",name:"意見＋理由",school:{stage:"JHS2-3",unit:"opinion-writing"},eiken:{grade3:"core",pre2:"core"},prerequisite:["writing_sentence"],misconceptions:[]},
 {id:"speaking_response",domain:"speaking",name:"基本応答",school:{stage:"JHS1",unit:"interaction"},eiken:{grade3:"foundation",pre2:"prerequisite"},prerequisite:["listening_basic"],misconceptions:[]},
 {id:"speaking_readaloud",domain:"speaking",name:"音読",school:{stage:"JHS1-3",unit:"read-aloud"},eiken:{grade3:"core",pre2:"core"},prerequisite:["reading_detail"],misconceptions:[]},
 {id:"speaking_picture",domain:"speaking",name:"描写",school:{stage:"JHS2-3",unit:"description"},eiken:{grade3:"core",pre2:"core"},prerequisite:["speaking_response"],misconceptions:[]},
 {id:"speaking_opinion",domain:"speaking",name:"意見表明",school:{stage:"JHS2-3",unit:"opinion-speaking"},eiken:{grade3:"core",pre2:"core"},prerequisite:["speaking_response"],misconceptions:[]}
];
const EIKEN_LEVELS=["grade5","grade4","grade3","pre2"];
const Q=(id,type,skill,q,sub,c,a,e,difficulty,eiken_level,mis=[],extra={})=>({id,type,skill,concept:skill,school_grade:(SKILL_TREE.find(s=>s.id===skill)||{school:{stage:"JHS1"}}).school.stage,eiken_level,difficulty,q,sub,c,a,e,mis,sibling_group:skill,...extra});
const bank=[];
// Vocabulary: 60
const vocab=[
["usually","たいてい"],["important","重要な"],["different","異なる"],["practice","練習する"],["library","図書館"],["before","～の前に"],["excited","わくわくした"],["sometimes","ときどき"],["subject","教科"],["homework","宿題"],
["breakfast","朝食"],["together","一緒に"],["weekend","週末"],["favorite","お気に入りの"],["interesting","興味深い"],["friendly","親しみやすい"],["tired","疲れた"],["careful","注意深い"],["station","駅"],["museum","博物館"],
["travel","旅行する"],["arrive","到着する"],["direction","方向"],["ticket","切符"],["weather","天気"],["environment","環境"],["protect","守る"],["recycle","再利用する"],["nature","自然"],["energy","エネルギー"],
["education","教育"],["science","科学"],["technology","技術"],["community","地域社会"],["future","未来"],["experience","経験"],["opinion","意見"],["reason","理由"],["improve","改善する"],["continue","続ける"],
["possible","可能な"],["necessary","必要な"],["provide","提供する"],["increase","増加する"],["reduce","減らす"],["choose","選ぶ"],["prepare","準備する"],["local","地域の"],["culture","文化"],["international","国際的な"],
["research","研究"],["information","情報"],["communication","コミュニケーション"],["problem","問題"],["solution","解決策"],["activity","活動"],["volunteer","ボランティア"],["healthy","健康な"],["traditional","伝統的な"],["available","利用できる"]];
const wrong=["難しい","静かな","危険な"];
vocab.forEach((x,i)=>{let skill=i<8?(i===4?"vocab_school":i===6?"vocab_feeling":i===5||i===7?"vocab_daily":"vocab_basic"):i<18?"vocab_daily":i<25?"vocab_town":i<31?"vocab_nature":i<40?"vocab_society":"vocab_society";let choices=[x[1],...wrong];bank.push(Q("v"+(i+1),"vocab",skill,x[0],"最も近い意味を選ぼう",choices,0,x[0]+" = "+x[1]+"。",i<20?1:i<40?2:3,i<20?"grade4":i<40?"grade3":"pre2",["","word_meaning","word_meaning","word_meaning"]));});
// Grammar: 60
const grammarSeeds=[
["grammar_be","I (  ) a student.",["am","is","are","be"],0,"主語 I には am。","be_subject"],
["grammar_third","She (  ) English every day.",["study","studies","studying","studied"],1,"三人称単数現在なので studies。","third_person"],
["grammar_question","(  ) you play tennis?",["Are","Do","Does","Is"],1,"一般動詞の疑問文で主語youなので Do。","be_vs_do"],
["grammar_past","We (  ) soccer yesterday.",["play","plays","played","playing"],2,"yesterday があるので played。","tense_confusion"],
["grammar_can","He can (  ) very fast.",["runs","run","ran","running"],1,"can の後は動詞の原形。","modal_base"],
["grammar_negative","I (  ) like math.",["am not","don't","doesn't","not"],1,"I の一般動詞否定文は don't。","negative_form"],
["grammar_third","Tom (  ) soccer on Sundays.",["play","plays","playing","played"],1,"Tom は三人称単数なので plays。","third_person"],
["grammar_can","(  ) you swim?",["Do","Are","Can","Does"],2,"能力をたずねる Can you ...?。","modal_base"],
["grammar_past","I (  ) to Nagoya yesterday.",["go","goes","went","going"],2,"go の過去形は went。","tense_confusion"],
["grammar_wh","(  ) do you live?",["What","When","Where","Who"],2,"場所をたずねるのは Where。","wh_choice"],
["grammar_present","We (  ) English at school.",["study","studies","studied","studying"],0,"主語Weの現在形は原形 study。","tense_confusion"],
["grammar_progressive","She is (  ) a book now.",["read","reads","reading","readed"],2,"be + -ing で現在進行形。","tense_confusion"],
["grammar_future","I (  ) visit Kyoto next week.",["will","did","am","was"],0,"next week の予定・未来に will。","tense_confusion"],
["grammar_infinitive","I want (  ) soccer.",["play","to play","playing","played"],1,"want to + 動詞原形。","tense_confusion"],
["grammar_gerund","I enjoy (  ) books.",["read","to read","reading","reads"],2,"enjoy の後は動名詞。","tense_confusion"],
["grammar_comparison","Ken is (  ) than Tom.",["tall","taller","tallest","more tall"],1,"than があるので比較級 taller。","tense_confusion"],
["grammar_passive","English is (  ) in many countries.",["speak","spoke","spoken","speaking"],2,"受動態 be + 過去分詞 spoken。","tense_confusion"],
["grammar_present_perfect","I have (  ) to Osaka twice.",["be","been","went","go"],1,"経験の現在完了 have been。","tense_confusion"],
["grammar_relative","I know a girl (  ) can speak French.",["which","who","where","when"],1,"人を先行詞にする主格 who。","pronoun_reference"]
];
for(let i=0;i<60;i++){const s=grammarSeeds[i%grammarSeeds.length],cycle=Math.floor(i/grammarSeeds.length),q=s[1].replace("soccer",cycle%2?"baseball":"soccer");bank.push(Q("g"+(i+1),"grammar",s[0],q,"正しい語を選ぼう",s[2],s[3],s[4],i<20?1:i<40?2:3,i<20?"grade4":i<45?"grade3":"pre2",s[2].map((_,n)=>n===s[3]?"":s[5])));}
// Listening: 40
const listen=[
["listening_basic","What does she like?","I like music very much.",["Music","Tennis","English","Dogs"],0,"music が答え。"],
["listening_time","What time does he get up?","I get up at seven every morning.",["6:00","7:00","8:00","9:00"],1,"at seven = 7:00。"],
["listening_detail","Where is the book?","The book is on the desk.",["On the desk","Under the desk","In the bag","By the door"],0,"on the desk。"],
["listening_detail","What does Ken do after school?","Ken plays basketball after school.",["Studies","Plays basketball","Cooks","Reads"],1,"plays basketball。"],
["listening_time","When does the class start?","Our English class starts at nine thirty.",["8:30","9:00","9:30","10:30"],2,"nine thirty = 9:30。"],
["listening_main","Why is Emi going to the library?","Emi needs a book for her science project, so she is going to the library.",["To meet a friend","To get a book","To play sports","To eat lunch"],1,"science project用の本が必要。"],
["listening_detail","Where will they meet?","Let's meet in front of the station at ten.",["At school","At the station","At the park","At home"],1,"in front of the station。"],
["listening_main","What is the main topic?","Our class will clean the local park this Saturday. Everyone should bring gloves.",["A school test","A park activity","A music lesson","A trip"],1,"公園清掃活動について。"]
];
for(let i=0;i<40;i++){const s=listen[i%listen.length];bank.push(Q("l"+(i+1),"listening",s[0],"音声を聞いて選ぼう",s[1],s[3],s[4],s[5],i<15?1:i<30?2:3,i<15?"grade4":i<30?"grade3":"pre2",s[3].map((_,n)=>n===s[4]?"":s[0]==="listening_time"?"time_confusion":"detail_missed"),{speech:s[2]}));}
// Reading: 40
const reading=[
["reading_detail","Mika has a dog. She walks with him every morning.","When does Mika walk with her dog?",["Every morning","Every night","On Sunday","After lunch"],0,"every morning が根拠。"],
["reading_main","I like science. We do interesting experiments at school. Science is my favorite subject.","What is this mainly about?",["School lunch","A favorite subject","Sports","A family"],1,"science / favorite subject が主題。"],
["reading_detail","Aya gets up at six thirty. She eats breakfast and leaves home at seven thirty.","What time does Aya leave home?",["6:00","6:30","7:00","7:30"],3,"leaves home at seven thirty。"],
["reading_inference","It is raining today. Yuki takes an umbrella when she leaves home.","Why does Yuki take an umbrella?",["It is hot","It is raining","She likes blue","She goes swimming"],1,"raining が根拠。"],
["reading_email","Hi Ken, Our soccer practice will start at 4 p.m. on Friday. Please bring water. See you, Taro","What should Ken bring?",["A book","Water","Lunch","A camera"],1,"Please bring water. が根拠。"],
["reading_main","Many students use bicycles to go to school. Bicycles do not make air pollution and are useful for short trips.","What is the passage mainly about?",["Why bicycles are useful","How to buy a car","A school festival","Train tickets"],0,"自転車の利点が中心。"],
["reading_inference","Sara studied every day for the test. When she saw her score, she smiled and called her mother.","How did Sara probably feel?",["Happy","Angry","Sleepy","Hungry"],0,"smiled が推論の根拠。"],
["reading_email","Dear students, The science museum trip is on October 12. Meet at school at 8:00. The bus leaves at 8:15.","When does the bus leave?",["8:00","8:15","10:12","12:00"],1,"The bus leaves at 8:15. が根拠。"]
];
for(let i=0;i<40;i++){const s=reading[i%reading.length],skill=s[0];bank.push(Q("r"+(i+1),"reading",skill,s[1],s[2],s[3],s[4],s[5],i<15?1:i<30?2:3,i<15?"grade4":i<30?"grade3":"pre2",s[3].map((_,n)=>n===s[4]?"":skill==="reading_main"?"main_idea_confusion":skill==="reading_inference"?"unsupported_inference":"detail_missed")));}
// Stable schema metadata
bank.forEach(q=>{q.version=8;q.question_type=q.type==="listening"?"audio_mcq":"mcq";});
