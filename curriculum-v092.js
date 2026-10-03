// v0.9.2 editorial corrections and knowledge-specific base/transfer links.
const LEARNING_TARGETS={};
(function(){
const B=id=>bank.find(q=>q.id===id);
const edit=(id,patch)=>Object.assign(B(id),patch);
// Fix competing answers by specifying the intended meaning or tense explicitly.
for(const id of ['g2','g7','g11','g21','g25','g26','g30','g40','g44','g45','g49'])edit(id,{sub:'現在の習慣を表す現在形になるよう、正しい語を選ぼう'});
edit('g8',{sub:'「泳ぐことができますか」と能力を尋ねる文を完成させよう'});
edit('g42',{q:'I (  ) my keys on the desk yesterday morning.'});
edit('g16',{c:['tall','taller','tallest','as tall']});
edit('g35',{c:['light','lighter','lightest','as light']});
edit('l11',{c:['To borrow a pen','To ask about homework','To ask someone to keep his notebook','To invite a friend']});
edit('l26',{sub:'Which pages must the students read?'});
edit('l37',{c:['Study at Aya\'s house','Play basketball','Go to a game if she finishes homework by five','Watch TV at five']});
edit('r11',{q:'Raindrops were falling as Nana walked home. She put her wet umbrella by the door and changed into dry socks.'});
edit('r33',{q:'Yui practices the trumpet on Tuesday and Thursday. On Saturday, she also plays the trumpet with the whole school band.'});
edit('r6',{q:'Many students ride bicycles to school. Riding a bicycle produces no exhaust fumes and is useful for short trips.'});
// Reclassify clear skill mismatches; levels remain internal estimates.
for(const id of ['v9','v10'])edit(id,{skill:'vocab_school'});
for(const id of ['v16','v17','v18'])edit(id,{skill:'vocab_feeling'});
edit('v31',{skill:'vocab_society'});
edit('v28',{c:['再資源化する','捨てる','修理する','節約する'],e:'recycleは、使い終えた材料を処理して再び資源として使うこと。reuse（そのまま再使用する）と区別しよう。'});
edit('g41',{skill:'grammar_third'});
edit('r4',{skill:'reading_detail'});
edit('r15',{skill:'reading_detail'});
edit('r22',{sub:'What is the passage mainly about?',c:['Selling bicycles','The benefits of new bicycle parking','A larger station building','Closing a road']});
edit('r34',{sub:'What is the passage mainly about?',c:['An app that teaches local history','New phone stores','Foreign language lessons','Changes to bus schedules']});
const meaningChoices={"41":["可能な","必要な","利用できる","安全な"],"42":["必要な","重要な","可能な","十分な"],"43":["提供する","選ぶ","受け取る","準備する"],"44":["増加する","減少する","維持する","比較する"],"45":["減らす","増やす","守る","集める"],"46":["選ぶ","決める","比べる","変える"],"47":["準備する","提供する","片付ける","計画する"],"48":["地域の","国際的な","伝統的な","個人的な"],"49":["文化","地域社会","伝統","歴史"],"50":["国際的な","地域の","伝統的な","国内の"],"51":["研究","情報","教育","経験"],"52":["情報","意見","理由","連絡"],"53":["コミュニケーション","情報","教育","活動"],"54":["問題","解決策","理由","結果"],"55":["解決策","問題","方法","意見"],"56":["活動","経験","練習","行動"],"57":["ボランティア","地域住民","研究者","観光客"],"58":["健康な","安全な","元気な","強い"],"59":["伝統的な","国際的な","現代的な","地域の"],"60":["利用できる","必要な","可能な","便利な"]};
const context=[
['usually','On most school days, I (  ) walk to school.',['usually','never','tomorrow','once'],'On most school days＝ほとんどの登校日。頻度を表すusuallyを選ぶ。'],
['important','Wearing a helmet can protect your head. It is (  ) for safety.',['important','famous','empty','round'],'頭を守るという安全上の必要性がimportant（重要な）の根拠。'],
['different','One shirt is red and the other is blue. Their colors are (  ).',['different','identical','empty','asleep'],'redとblueは同じ色ではないのでdifferent。'],
['practice','To play the piano better, I (  ) the same song every day.',['practice','forget','sell','borrow'],'同じ曲を毎日弾いて上達する行動はpractice（練習する）。'],
['library','I borrowed two books from the school (  ).',['library','kitchen','pool','station'],'borrowed books＝本を借りた。貸出を行うlibrary。'],
['before','Class starts at nine. Arrive (  ) nine so you will not be late.',['before','after','behind','under'],'遅刻しないため9時より前に着く必要がありbefore。'],
['excited','I cannot wait for the trip! I feel (  ) about it.',['excited','bored','angry','sleepy'],'cannot wait＝待ちきれない、という楽しみな気持ちはexcited。'],
['sometimes','I go swimming a few times a month, but not every day. I (  ) swim.',['sometimes','always','never','tomorrow'],'毎日ではなく月に数回という頻度はsometimes（ときどき）。'],
['subject','Of all my school (  )s, science is my favorite.',['subject','ticket','station','meal'],'scienceは教科の一つ。subjectの複数形subjects。'],
['homework','Our teacher asked us to do these exercises at home. They are our (  ).',['homework','breakfast','weather','ticket'],'先生が家で行うよう指示した課題はhomework。'],
['breakfast','I eat (  ) after waking up and before going to school.',['breakfast','lunch','dinner','dessert'],'朝起きて登校する前の食事はbreakfast。'],
['together','We did not work alone. We worked (  ) as a team.',['together','alone','separately','yesterday'],'チームで共同作業をしたためtogether。一人で、別々にとは異なる。'],
['weekend','Saturday and Sunday together are called the (  ).',['weekend','weekday','season','morning'],'土曜と日曜をまとめてweekend（週末）と呼ぶ。'],
['favorite','Of all the fruits, I like apples best. Apples are my (  ) fruit.',['favorite','empty','broken','sleeping'],'like ... best＝最も好き、という個人の好みはfavorite。'],
['interesting','The story made me want to learn more. It was (  ).',['interesting','boring','empty','asleep'],'もっと知りたいと思わせる物語はinteresting（興味深い）。'],
['friendly','She smiles and welcomes new students. She is (  ).',['friendly','unfriendly','asleep','empty'],'新入生を笑顔で迎える人物特性はfriendly。'],
['tired','After walking all day, I have little energy and need to rest. I feel (  ).',['tired','energetic','empty','round'],'エネルギーがなく休息が必要な状態はtired。'],
['careful','He checks every number twice to avoid mistakes. He is (  ).',['careful','careless','asleep','empty'],'間違いを避けるため確認を重ねる行動はcareful。'],
['station','We waited for our train at the railway (  ).',['station','museum','kitchen','pool'],'railwayとtrainが鉄道の駅stationの根拠。'],
['museum','We saw ancient tools on display at the history (  ).',['museum','station','bakery','pool'],'歴史資料を展示する場所はmuseum。'],
['travel','I want to (  ) around the world and visit many countries.',['travel','sleep','recycle','repair'],'世界を回って各国を訪れる行動はtravel。'],
['arrive','We will leave home at eight and (  ) at school at eight thirty.',['arrive','depart','protect','recycle'],'出発後に学校へ到着する動作はarrive。'],
['direction','Which (  ) should we go, north or south?',['direction','ticket','weather','price'],'northとsouthは進む方向direction。'],
['ticket','You need a train (  ) to pass through this gate.',['ticket','weather','breakfast','subject'],'改札を通るために必要な切符はticket。'],
['weather','It may rain tomorrow. Check the (  ) forecast.',['weather','homework','library','culture'],'雨などの予報を表す連語はweather forecast。'],
['environment','Clean air and water are parts of our natural (  ).',['environment','ticket','breakfast','opinion'],'自然の空気や水を含む周囲の条件はenvironment。'],
['protect','Wear gloves to (  ) your hands from injury.',['protect','injure','forget','arrive'],'けがから手を守る目的に合うのはprotect。'],
['recycle','We collect used paper to (  ) it into new paper.',['recycle','discard','hide','borrow'],'古紙を処理して新しい紙にすることはrecycle。'],
['nature','Forests, rivers, and wild animals are parts of (  ).',['nature','technology','homework','traffic'],'森林・川・野生動物が示す対象はnature。'],
['energy','Solar panels use the sun to produce electrical (  ).',['energy','opinion','culture','direction'],'太陽光発電で作るのは電気エネルギーenergy。'],
['education','Learning at school is part of our (  ).',['education','weather','ticket','breakfast'],'学校で学ぶ活動はeducation（教育）の一部。'],
['science','In (  ) class, we test ideas through experiments.',['science','music','history','art'],'実験で考えを確かめる教科はscience。'],
['technology','New computer (  ) helps us process data faster.',['technology','weather','breakfast','direction'],'コンピューターでデータ処理を改善する技術はtechnology。'],
['community','People living in the same town form a local (  ).',['community','ticket','direction','solution'],'同じ地域の住民の集まりはcommunity。'],
['future','The past is behind us; the (  ) is still to come.',['future','past','present','history'],'これから来る時間を表すfuture。'],
['experience','Working at the shop taught me a lot. It was useful work (  ).',['experience','weather','ticket','direction'],'実際に働いて学んだ経験はwork experience。'],
['opinion','I think the book is wonderful. That is my personal (  ).',['opinion','ticket','energy','direction'],'I thinkとpersonalが、個人の考えopinionを示す。'],
['reason','The bus was late, and that was the (  ) I missed class.',['reason','solution','opinion','future'],'授業に遅れた原因・理由を示すreason。'],
['improve','My score rose from 40 to 80. Practice helped me (  ) it.',['improve','lower','forget','arrive'],'得点が40から80へ良くなる変化はimprove。'],
['continue','Do not stop reading. Please (  ) until the last page.',['continue','stop','finish','arrive'],'止めずに最後まで続ける指示はcontinue。'],
['possible','There is enough time and we have all the tools. It is (  ) to finish today.',['possible','impossible','local','traditional'],'時間と道具がそろい実行できる＝possible。'],
['necessary','We cannot live without water. Water is (  ) for all living things.',['necessary','optional','international','different'],'without waterでは生きられないためnecessary（必要不可欠な）。'],
['provide','Guests do not need to bring food. The hotel will (  ) breakfast.',['provide','remove','forget','arrive'],'客のために朝食を用意して提供する動作はprovide。'],
['increase','We expect 200 visitors next year instead of 100. The number will (  ).',['increase','decrease','prepare','recycle'],'100から200へ数が増えるのでincrease。'],
['reduce','We want less plastic waste, so we should (  ) it.',['reduce','increase','provide','arrive'],'less＝より少なく、がreduce（減らす）の根拠。'],
['choose','Select the book you like best. You can (  ) one from these three.',['choose','discard','arrive','sleep'],'Selectと同じ意味で、候補から選ぶchoose。'],
['prepare','Get everything ready for tomorrow\'s trip. Please (  ) in advance.',['prepare','forget','arrive','sleep'],'get ... ready＝準備する、に対応するprepare。'],
['local','This farm is in our own town. It is a (  ) farm.',['local','foreign','international','distant'],'自分たちの町にある農園なのでlocal。'],
['culture','Food customs and festivals are parts of a country\'s (  ).',['culture','solution','direction','price'],'食の習慣や祭りといった文化はculture。'],
['international','Students from many countries join our (  ) exchange program.',['international','domestic','local','private'],'many countries＝多くの国が参加するためinternational。'],
['research','The students investigated clean energy and wrote a report on their (  ).',['research','breakfast','direction','weather'],'調査して報告書にまとめた研究はresearch。'],
['information','The website lists opening hours and prices. It gives useful (  ).',['information','experiments','volunteers','directions'],'営業時間・料金といった具体的な情報はinformation。'],
['communication','Team members need to share ideas and listen to each other. Good (  ) is essential.',['communication','isolation','silence','pollution'],'意思を伝え合い相手の話を聞く行為はcommunication。'],
['problem','Traffic jams cause delays. They are a serious (  ) in many cities.',['problem','solution','benefit','success'],'遅延という困りごとを生む交通渋滞はproblem。'],
['solution','A plan that solves a problem is called a (  ).',['solution','problem','question','failure'],'問題を解決する方法はsolution。'],
['activity','Cleaning the park is something our club does every Saturday. It is a weekly (  ).',['activity','information','culture','future'],'クラブが毎週行う活動はactivity。'],
['volunteer','My sister helps at the animal shelter without being paid. She is a (  ).',['volunteer','customer','visitor','passenger'],'報酬を受けず支援する人はvolunteer。'],
['healthy','Daily exercise and enough sleep help your body stay (  ).',['healthy','sick','broken','empty'],'運動と睡眠で体の健康を保つという意味のhealthy。'],
['traditional','People here have passed this dance down for generations. It is a (  ) dance.',['traditional','newly invented','international','modern'],'for generations＝何世代も受け継がれた、がtraditionalの根拠。'],
['available','The room is locked until three. After it opens, it is (  ) for students to use.',['available','unavailable','broken','asleep'],'開室して生徒が使える状態になるためavailable。']
];
context.forEach((v,i)=>{
 const original=B('v'+(i+1));
 const transfer={...original,id:i<40?'v'+(61+i):original.id,q:v[1],sub:'文脈の手がかりから最も適切な語を選ぼう',c:v[2],a:0,e:v[3],question_type:'context_mcq',transfer_check:true,word:v[0]};
 if(i<40)bank.push(transfer);else{
  const basic={...original,id:'v'+(61+i),q:v[0],sub:'最も近い意味を選ぼう',c:[vocab[i][1],'切符','朝食','方向'],a:0,e:v[0]+'は「'+vocab[i][1]+'」。文脈問題でもこの意味を確かめよう。',question_type:'mcq',transfer_check:false,word:v[0]};
  basic.c=meaningChoices[String(i+1)];bank.push(basic);Object.assign(original,transfer);
 }
 original.word=v[0];
});
// Question-specific grammar explanations (including the former 41 generic ones).
const grammarReasons=[
'主語Iに対応するbe動詞はam。isは三人称単数、areはyou・複数に用いる。',
'現在の習慣。主語Sheは三人称単数なのでstudyのyをiesに変えてstudies。',
'一般動詞playの疑問文。主語youにはDoを使い、be動詞AreやIsは使わない。',
'yesterdayが過去を指定しているためplayの過去形played。',
'canの直後の動詞は原形run。runs・ran・runningにはしない。',
'主語Iの一般動詞の否定はdo not＝don\'t。be動詞am notをlikeの前には置かない。',
'現在の習慣。主語Tomは三人称単数なのでplayにsを付けてplays。',
'「できるか」という能力を尋ねる指示なのでCan you swim?。Doは習慣を尋ねる別の意味。',
'yesterdayが過去を示す。goの不規則な過去形はwent。',
'住む場所を尋ねるWhere。Whenは時、Whoは人、Whatは物事を尋ねる。',
'現在の習慣で主語Weは複数なので原形study。studiesは三人称単数、studiedは過去形。',
'isとnowが進行中の動作を示す。be動詞＋動詞-ingなのでreading。',
'未来の出来事を表すwill＋動詞原形。didは過去、am・wasの後にvisitの原形は置けない。',
'wantの後で「～したい」はto＋動詞原形。want to playでサッカーをしたい。',
'enjoyの目的語には動名詞を用いる。enjoy readingで本を読むことを楽しむ。',
'thanが比較を示す。短い形容詞tallの比較級はtaller。as tallならasが後ろにも必要。',
'Englishが話される側なので受動態。is＋過去分詞spokenを用いる。',
'have been toは「行ったことがある」。twiceは2回の経験を示す。wentはhaveの後に使えない。',
'先行詞a girlは人で、後ろの節の主語を表す関係代名詞はwho。',
'主語My sisterは三人称単数なのでbe動詞is。amやareとは主語の対応が違う。',
'現在の習慣。主語My brotherが三人称単数なのでeatにsを付ける。',
'主語your friendsは複数。一般動詞walkの疑問文はDoで始める。',
'last Sundayという過去の時点があるのでvisitの過去形visited。',
'canの後は動詞の原形use。主語Youでも動詞にsや-ingは付けない。',
'現在の習慣で主語Weは複数。一般動詞の否定はdon\'t＋原形watch。',
'現在の習慣。主語Ayaは三人称単数なのでpractices。practicedは過去形。',
'疑問文でもcanの後の動詞は原形ride。主語Emiでもridesにはしない。',
'yesterdayが過去を示す。seeの過去形はsaw。seenは過去分詞。',
'誕生日がいつかを尋ねるのでWhen。Whereは場所、Whoは人を尋ねる。',
'現在の習慣で主語My parentsは複数なのでdrink。drinksは三人称単数、drankは過去。',
'Look!とareが現在進行中の動作を示す。swimはmを重ねてswimming。',
'tomorrowの未来についてwill be。did・was・hasの後にbeの原形はこの形で置けない。',
'decideの後で決めた行動を表すにはto＋原形。decided to joinで加入を決めた。',
'enjoyの目的語は動名詞。enjoys cookingで料理することを楽しむ。',
'thanがあるのでlightの比較級lighter。lightestは最上級、as lightには後ろのasが必要。',
'cookiesが作られた側。were＋makeの過去分詞madeで受動態になる。',
'haveの後は過去分詞。seeの過去分詞seenとthree timesで3回見た経験を表す。',
'The manという人を先行詞にし、teachesの主語を補うwho。whichは物を指す。',
'主語Those flowersは複数なのでare。isは単数、amはIに使う。',
'現在の習慣。主語Our teacherは三人称単数なのでcomes。cameは過去形。',
'疑問文のDoesが三人称単数を担うので後ろの動詞は原形play。playsにはしない。',
'yesterday morningが過去を示す。leaveの不規則な過去形はleft。',
'mustの後は原形。quietをつなぐbe動詞も原形beを用いる。',
'現在の食習慣でKenは三人称単数。doesn\'t＋原形eat。didn\'tは過去の否定。',
'現在の習慣。主語The busが三人称単数なのでleaves。leftは過去形。',
'May Iは許可を求める表現。助動詞mayの後は原形open。',
'last yearが過去を指定する。buildの不規則な過去形はbuilt。',
'withの相手である人を尋ねるのでWho。Whenは時、Howは方法を尋ねる。',
'現在の習慣で主語Iには原形finish。finishesは三人称単数、finishedは過去。',
'isとright nowが進行中の動作を示す。is washingで今洗っている。',
'be going toの後は動詞原形visit。visits・visited・visitingは置けない。',
'店へ行った目的を表すto buy。「牛乳を買うために」で不定詞の目的用法。',
'文の主語を動名詞Singing English songsにすると「英語の歌を歌うこと」。To sangはtoの後が原形でない。',
'in Japanという範囲で最も高い山。the＋最上級highestを用いる。',
'festivalが開催される側なのでis＋holdの過去分詞held。holdingなら進行中の能動表現になる。',
'has＋過去分詞livedとsince 2022で、2022年から今まで住んでいる継続を表す。',
'先行詞cameraは物で、I boughtの目的語を補う関係代名詞which。whoは人を指す。',
'There areの後ろのtwo catsは複数なのでare。単数の場合はThere is。',
'Doesの後では主語Mr. Satoが単数でもteachの原形を用いる。',
'主語your motherは三人称単数で一般動詞workの疑問文なのでDoes。'
];
bank.filter(q=>q.type==='grammar').forEach(q=>{q.e=grammarReasons[Number(q.id.slice(1))-1];});
const listeningEvidence=[
'six forty-fiveが6:45。fifteen（15）とforty-five（45）を区別する。',
'bought two sandwiches for lunchが購入品と数の根拠。cakesやfruitは述べられていない。',
'Could you keep it for me?が依頼の目的。itは前のnotebookを指す。',
'practice badmintonが競技名の根拠。with my sisterは相手であって競技名ではない。',
'twoからfour fifteenまでは2時間15分。終了時刻そのものと長さを区別する。',
'leave your bags beside the doorが場所の指示。besideは「～のそば」。',
'Let\'s take the dog for a walkが次の行動の提案。before dinnerは順序を示す。',
'bus number twelve＝12番。museumは行き先で、バス番号ではない。',
'Could I have some orange juice?が希望する飲み物。',
'Thursday ... not Wednesdayが変更後の曜日。notの後の曜日を選ばない。',
'missed the first busが遅刻の原因。ten minutesは遅れた長さ。',
'The gym will be closedが告知の中心。床の清掃は閉鎖の理由。',
'need eggs and milkが必要な物。enough breadはパンは足りているという意味。',
'sevenの30分前は6:30。開始時刻7:00と集合時刻を区別する。',
'school is too far to walkとno busの2点から通学用の自転車が必要だと分かる。',
'Mine is the green umbrellaが本人の傘の色。red oneは隣の別の傘。',
'cold and windyが天気の2つの特徴。warm coatは勧める服装。',
'read pages twenty to twenty-fourが読むページ。answer question fiveは別の課題。',
'picture ... has frozenが画面停止の問題。I can hear youなので音声は聞こえている。',
'two adult ticketsとone child ticketを足して合計3枚。大人の枚数だけを選ばない。',
'but it was in my jacket pocketが実際の発見場所。bagとdeskは探しただけ。',
'Try using one large pictureが先生の提案。too much textは現在の問題点。',
'a small brown rabbitがペットの種類。Cocoは名前。',
'today we\'ll close at sevenが今日の閉店時刻。usually ... eightは普段の時刻。',
'I forgot my hatが忘れた物。lunchとwaterは持参している。',
'elevator is being repairedが階段を使う理由。運動のためとは述べられていない。',
'moved from Room 201 to Room 305のtoの後が変更後の部屋305。',
'Monday, Wednesday, and Fridayの3日を数える。every weekは週ごとという意味。',
'If I finish ... by fiveが条件。その条件を満たす場合に試合を見に行く予定。',
'Do you have ... in large?が希望サイズ。mediumは試したが小さかったサイズ。',
'visiting my grandparents in GifuのGifuが訪問先。',
'I\'ll take the red oneが最終的な選択。blueは安いが購入を決めた色ではない。'
];
const readingEvidence=[
'at 10:00 on Saturdaysが土曜の開館時刻。8:30は平日、休館は日曜。',
'grow tomatoes ... watering ... cooking classはクラスの庭の活動を説明する。science roomは場所だけ。',
'Raindrops were fallingとwet umbrellaが雨の根拠。雪についての情報はない。',
'Please wait near the ticket officeが待ち合わせ場所の指示。3:30は時間。',
'13歳はsix to fifteenの範囲なので300 yen。under sixの無料条件には入らない。',
'used to throw awayからbegan separatingへの変化が中心。学校で学んだことが家庭のリサイクル習慣につながった。',
'waiting for bus 18という明示情報から、12番ではなく別のバスが必要。混雑だけを理由にしない。',
'Bring gym shoes instead of soccer cleatsが持参物の変更指示。instead ofは「～の代わりに」。',
'rides his bicycle for fifteen minutesが所要時間。7:20と7:35は出発・到着時刻。',
'音楽が勉強に与える効果と注意点が段落全体の話題。lyricsは一部の例。',
'冷蔵庫を確認してmilk, eggs, applesの買い物メモを持つ行動からスーパーへ行く可能性が高い。',
'bring your worksheet from Mondayが持参物の根拠。Room 4は授業場所。',
'Drinks and cakes are available until ... 5:00がケーキを買える期限。2:00は昼食の終了時刻。',
'new bicycle parkingによってsidewalkが空き、安全な駐輪場所ができたという利点が主題。',
'同じ作家の別の小説を探す行動から、読んだ本を気に入った可能性が高い。断定ではなくprobablyに注意。',
'should be home around 6:00が帰宅予定。5:15は会合終了、5:30はバスの時刻。',
'The last entry is at 11:30が最終入場時刻。noonは閉園時刻。',
'turning off lightsとunplugging chargersの具体例、電気使用量が減った結果が節電の主題を支える。',
'movie started in twenty minutesと時計を見る行動から、待つ時間が少ない。店が閉まったとは書かれていない。',
'I\'ll return it ... tomorrowが翌日の行動。itは貸してもらったdictionary。',
'The music show starts at 10:30が根拠。9:00は祭り開始、1:00は科学ショー。',
'reduce plastic wasteとsave moneyの2点が再使用ボトルの利点。',
'alarm did not ring、skipped breakfast、ran to the stationから遅刻を心配していると推測できる。',
'bring your own drinkが持参物。Gloves will be providedなので手袋は支給される。',
'Tuesday、Thursday、Saturdayの3日ともtrumpetを演奏すると明記されている。',
'古い建物にスマホを向けると過去の写真と物語を表示するアプリが段落全体の主題。',
'dark cloudsを見てまだ雨が降る前に準備したことから、雨を予想していたと推測できる。',
'Let\'s meet ... at 2:00が集合時刻。2:20は列車の発車時刻。',
'four apples for each groupとthree groupsから4×3＝12個。4＋3ではない。',
'no food waste、small lunch portion、Less food ... thrown awayが食品廃棄を減らす目的の根拠。',
'read ... twice、measured ... carefully、checked the timerという慎重な行動がcarefulの根拠。',
'reopen at 8:00 on Tuesday morningが再開時刻。Mondayは祝日で閉鎖。'
];
for(let n=9;n<=40;n++){B('l'+n).e=listeningEvidence[n-9];B('r'+n).e=readingEvidence[n-9];}
// Add only the missing base forms needed by existing transfer questions.
const extra=[
['g61','grammar_infinitive','I went to the park (  ) soccer.',['play','to play','played','plays'],1,'目的を表すto＋原形。公園に行った目的はサッカーをするため。','infinitive_form'],
['g62','grammar_gerund','(  ) books is fun.',['Read','Reads','Reading','Readed'],2,'動作を文の主語にするには動名詞Reading。「本を読むこと」は楽しい。','gerund_form'],
['g63','grammar_comparison','This is (  ) book in the shop.',['cheap','cheaper','the cheapest','as cheap'],2,'店という範囲で最も安い本なのでthe＋最上級cheapest。','comparison_form'],
['g64','grammar_future','I am going to (  ) a book tomorrow.',['buy','buys','bought','buying'],0,'be going to＋原形buyで買う予定を表す。','tense_confusion'],
['g65','grammar_relative','This is the book (  ) I read yesterday.',['who','which','where','when'],1,'物の先行詞bookを、readの目的語として受けるwhich。','pronoun_reference'],
['g66','grammar_can','(  ) your brother ride a bike?',['Do','Does','Can','Are'],2,'能力を尋ねる指示なのでCan。Doesなら普段乗るかという習慣の意味。','modal_base']
];
extra.forEach(v=>bank.push(Q(v[0],'grammar',v[1],v[2],v[0]==='g66'?'「自転車に乗れますか」と能力を尋ねる文を完成させよう':'正しい語を選ぼう',v[3],v[4],v[5],1,'grade3',v[3].map((_,i)=>i===v[4]?'':v[6]),{version:8,question_type:'mcq'})));
const extraListen=[
['l41','How long is the lesson?','The lesson starts at one and ends at two.',['One hour','Two hours','Three hours','Thirty minutes'],0,'1時から2時までは1時間。終了時刻2時と所要時間を区別する。','time_confusion'],
['l42','How many apples does the speaker want?','Two red apples and two green apples, please.',['Two','Three','Four','Five'],2,'赤2個と緑2個を足すと4個。色ごとの数と合計数を区別する。','number_confusion'],
['l43','How often does the speaker run?','I run on Tuesday and Saturday every week.',['Once a week','Twice a week','Three times a week','Every day'],1,'火曜と土曜の2日なので週2回。','number_confusion'],
['l44','When is the meeting?','The meeting is on Monday, not Tuesday.',['Monday','Tuesday','Wednesday','Thursday'],0,'on Mondayが会合の日。not Tuesdayは否定された候補。','time_confusion']
];
extraListen.forEach(v=>bank.push(Q(v[0],'listening','listening_time','音声を聞いて選ぼう',v[1],v[3],v[4],v[5],1,'grade4',v[3].map((_,i)=>i===v[4]?'':v[6]),{speech:v[2],version:8,question_type:'audio_mcq'})));
// Align diagnostic declarations and individual choice tags.
SKILL_TREE.find(s=>s.id==='grammar_present').misconceptions=['be_vs_do','third_person','tense_confusion'];
const diagnostic={grammar_be:'be_subject',grammar_present:'third_person',grammar_question:'be_vs_do',grammar_negative:'negative_form',grammar_third:'third_person',grammar_can:'modal_base',grammar_wh:'wh_choice',grammar_progressive:'tense_confusion',grammar_past:'tense_confusion',grammar_future:'tense_confusion',grammar_infinitive:'infinitive_form',grammar_gerund:'gerund_form',grammar_comparison:'comparison_form',grammar_passive:'passive_form',grammar_present_perfect:'tense_confusion',grammar_relative:'pronoun_reference'};
bank.forEach(q=>{
 const skill=SKILL_TREE.find(s=>s.id===q.skill);q.concept=q.skill;q.school_grade=skill.school.stage;
 let tag=q.type==='vocab'?'word_meaning':q.type==='grammar'?diagnostic[q.skill]:q.skill==='listening_time'?'time_confusion':q.skill.endsWith('_main')?'main_idea_confusion':q.skill==='reading_inference'?'unsupported_inference':'detail_missed';
 if(['g41','g59'].includes(q.id))tag='verb_after_does';
 if(['l28','l36','l42','l43'].includes(q.id))tag='number_confusion';
 q.mis=q.c.map((_,i)=>i===q.a?'':tag);
 if(['grammar_infinitive','grammar_gerund','grammar_comparison','grammar_passive'].includes(q.skill))q.diagnostic_revision='v0.8.3';
 if(q.type==='grammar')q.mis=q.c.map((choice,i)=>i===q.a?'':(q.skill==='grammar_present'&&['studied','drank','finished'].includes(choice)?'tense_confusion':tag));
 q.editorial_revision='v0.9.2';q.label={vocab:'Vocabulary',grammar:'Grammar',listening:'Listening',reading:'Reading'}[q.type];
 q.evidence=q.type==='listening'?q.speech:q.type==='reading'?q.q:q.e;
 q.distractor_notes=q.c.map((choice,i)=>i===q.a?'':q.type==='grammar'?'「'+choice+'」を入れると、'+q.e:q.type==='vocab'?'「'+choice+'」は、'+q.e:'「'+choice+'」では設問の根拠と一致しません。'+q.e);
});
const target=(id,skill,baseId,questionIds,rule)=>{
 const base=B(baseId);LEARNING_TARGETS[id]={id,skill,baseQuestionId:baseId,prerequisite:SKILL_TREE.find(s=>s.id===skill).prerequisite,rule};
 for(const qid of questionIds){const q=B(qid);if(!q)throw Error('Missing target question '+qid);q.target_id=id;q.baseQuestionId=baseId;q.learning_role=qid===baseId?'base':'transfer';q.transfer_check=qid!==baseId;q.sibling_group=id;q.transferPairReviewed=true;}
};
context.forEach((v,i)=>{const baseId=i<40?'v'+(i+1):'v'+(61+i),transferId=i<40?'v'+(61+i):'v'+(i+1);target('word:'+v[0],B(baseId).skill,baseId,[baseId,transferId],v[0]+' = '+vocab[i][1]);});
const grammarTargets=[
['be_agreement','grammar_be','g1',['g1','g20','g39','g58'],'主語に合わせてam / is / areを選ぶ。'],
['third_affirmative','grammar_third','g2',['g2','g7','g21','g26','g40','g45'],'現在の習慣を三人称単数で表すとき動詞に-s / -esを付ける。'],
['do_question','grammar_question','g3',['g3','g22','g60'],'一般動詞の疑問文はDo / Does＋主語＋動詞原形。'],
['past_form','grammar_past','g4',['g4','g9','g23','g28','g42','g47'],'過去の時点では規則・不規則の過去形を使う。'],
['modal_base','grammar_can','g5',['g5','g24','g27','g43','g46'],'助動詞の直後は、主語にかかわらず動詞原形。'],
['negative_present','grammar_negative','g6',['g6','g25','g44'],'一般動詞の現在否定はdon\'t / doesn\'t＋原形。'],
['can_ability','grammar_can','g8',['g8','g66'],'能力「できる」を尋ねるにはCan＋主語＋原形。'],
['wh_meaning','grammar_wh','g10',['g10','g29','g48'],'場所Where、時When、人Whoなど尋ねたい情報に応じて疑問詞を選ぶ。'],
['present_plain','grammar_present','g11',['g11','g30','g49'],'現在の習慣をI / We / 複数で表すときは動詞原形。'],
['progressive','grammar_progressive','g12',['g12','g31','g50'],'現在進行中の動作はbe動詞＋動詞-ing。'],
['will_future','grammar_future','g13',['g13','g32'],'will＋原形で未来の出来事を表す。'],
['infinitive_object','grammar_infinitive','g14',['g14','g33'],'want / decideの後で行動を表すときto＋原形を使う。'],
['gerund_object','grammar_gerund','g15',['g15','g34'],'enjoyの目的語は動名詞-ing。'],
['comparative','grammar_comparison','g16',['g16','g35'],'thanで比較するとき短い形容詞は-er。'],
['passive','grammar_passive','g17',['g17','g36','g55'],'動作を受ける側を主語にするときbe＋過去分詞。'],
['perfect_experience','grammar_present_perfect','g18',['g18','g37'],'have＋過去分詞と回数で経験を表す。'],
['relative_subject','grammar_relative','g19',['g19','g38'],'人を先行詞として関係節の主語を補うwho。'],
['does_base','grammar_third','g41',['g41','g59'],'Doesの後の動詞は原形。三単現-sを二重に付けない。'],
['going_to','grammar_future','g64',['g64','g51'],'be going toの後は動詞原形。'],
['infinitive_purpose','grammar_infinitive','g61',['g61','g52'],'行動の目的「～するために」はto＋原形。'],
['gerund_subject','grammar_gerund','g62',['g62','g53'],'動作を主語にするには動詞-ingの動名詞。'],
['superlative','grammar_comparison','g63',['g63','g54'],'範囲の中で最も～はthe＋最上級。'],
['relative_object','grammar_relative','g65',['g65','g57'],'物の先行詞を関係節の目的語として補うwhich。']
];grammarTargets.forEach(v=>target('grammar:'+v[0],...v.slice(1)));
// Continuative perfect needs its own base; reuse neither experience nor past tense.
bank.push(Q('g67','grammar','grammar_present_perfect','I have (  ) here since 2020.','正しい語を選ぼう',['live','lived','living','lives'],1,'have＋過去分詞livedとsince 2020で、2020年から現在まで住んでいる継続を表す。',1,'grade3',['tense_confusion','','tense_confusion','tense_confusion'],{version:8,question_type:'mcq',editorial_revision:'v0.9.2',label:'Grammar'}));
target('grammar:perfect_continuation','grammar_present_perfect','g67',['g67','g56'],'have / has＋過去分詞とsinceで現在までの継続を表す。');
const listenGroups=[
['literal','listening_basic','l1',['l1','l12','l17','l25','l31','l39'],'聞こえた物・場所・特徴を設問に合わせて拾う。'],
['clock','listening_time','l2',['l2','l5','l9','l22','l32'],'設問の時刻を選ぶ。変更後の時刻や集合時刻を普段・開始時刻と区別する。'],
['duration','listening_time','l41',['l41','l13'],'開始と終了の差を求め、時刻と所要時間を区別する。'],
['calendar','listening_time','l44',['l44','l18'],'曜日を聞き、notで否定された曜日と区別する。'],
['quantity','listening_time','l42',['l42','l28'],'種類ごとの数を合計し、合計数を答える。'],
['frequency','listening_time','l43',['l43','l36'],'列挙された日を数えて1週間の回数を答える。'],
['detail','listening_detail','l3',['l3','l4','l7','l10','l14','l16','l19','l21','l24','l26','l29','l33','l35','l38'],'設問の対象を先に確認し、but / from ... to ...などで実際の情報を選ぶ。'],
['intent','listening_main','l6',['l6','l8','l11','l15','l20','l23','l27','l30','l34','l37','l40'],'理由・提案・最終判断を、音声の要点と条件から読み取る。']
];listenGroups.forEach(v=>target('listening:'+v[0],...v.slice(1)));
const readGroups=[
['time_detail','reading_detail','r3',['r1','r3','r9','r17','r21','r25','r29'],'時刻・期間の設問で、該当する日・行動と時間を対応させる。'],
['quantity_detail','reading_detail','r13',['r13','r33','r37'],'数・料金の条件を確認して必要な数値を選ぶ。'],
['cause_detail','reading_detail','r4',['r4','r15'],'本文に明示された理由と行動を対応させる。'],
['main','reading_main','r2',['r2','r6','r10','r14','r18','r22','r26','r30','r34','r38'],'段落全体をまとめる主題を選び、一つの例だけに引きずられない。'],
['inference','reading_inference','r7',['r7','r11','r19','r23','r27','r31','r35','r39'],'行動や状況という本文の証拠から可能性の高い答えを推測する。'],
['email','reading_email','r5',['r5','r8','r12','r16','r20','r24','r28','r32','r36','r40'],'依頼・変更・時刻をメール本文の具体的な文で確認する。']
];readGroups.forEach(v=>target('reading:'+v[0],...v.slice(1)));
bank.forEach(q=>{
 if(!q.target_id)throw Error('Unlinked question '+q.id);
 if(!q.evidence)q.evidence=q.e;
 if(!q.distractor_notes)q.distractor_notes=q.c.map((_,i)=>i===q.a?'':q.e);
 q.school_grade=SKILL_TREE.find(s=>s.id===q.skill).school.stage;
 q.curriculum_alignment='internal-estimate';q.level_alignment='internal-estimate';
 q.answer_quality_review='AI-editorial-v0.9.2';
});
})();
