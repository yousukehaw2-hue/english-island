// English Island curriculum quality pass v0.8.1
(function(){const B=id=>bank.find(q=>q.id===id),A=[
["g20","My sister (  ) thirteen years old.",["am","is","are","be"],1],
["g21","My brother (  ) breakfast at seven.",["eat","eats","ate","eating"],1],
["g22","(  ) your friends walk to school?",["Are","Do","Does","Is"],1],
["g23","Mika (  ) her grandmother last Sunday.",["visit","visits","visited","visiting"],2],
["g24","You can (  ) this computer after class.",["use","uses","used","using"],0],
["g25","We (  ) watch TV in the morning.",["aren't","don't","doesn't","didn't"],1],
["g26","Aya (  ) the piano after dinner.",["practice","practices","practiced","practicing"],1],
["g27","Can Emi (  ) a bike?",["rides","ride","rode","riding"],1],
["g28","We (  ) a beautiful bird yesterday.",["see","saw","seen","seeing"],1],
["g29","(  ) is your birthday?",["When","Where","Who","How many"],0]];
A.forEach((v,k)=>{const q=B(v[0]);Object.assign(q,{q:v[1],c:v[2],a:v[3],e:"文法と文中の手がかりから正答を選ぶ。",sibling_group:q.skill+"-transfer-"+v[0],quality_revision:"v0.8.1"});});})();
