
let handle = document.getElementById("handle");
let btn = document.getElementById("btn");
let cnt=document.getElementById("cnt");
let add=document.getElementById("tagsList");
btn.addEventListener("click", function(event) {
     event.preventDefault();
     let handleValue = handle.value;
     analyzeHandle(handleValue);
});

//handleValue="sayansamantabirth2005";
     
async function analyzeHandle(handleValue) {
          let res = await fetch("https://codeforces.com/api/user.status?handle=" + handleValue);
          let data = await res.json();
          console.log(data.result.length);
          cnt.innerHTML="Total Submissions: " + data.result.length;
          let mp = {};let html;
          for (let i of data.result) {
            console.log("ContestId: "+i.problem.contestId);
            console.log("index: "+i.problem.index);
            const url = `https://codeforces.com/problemset/problem/${i.problem.contestId}/${i.problem.index}`;
               for (let tag of i.problem.tags) {
                    if (!mp[tag]) mp[tag] = [];
                    mp[tag].push(i.problem.name + " (" + url + ")");
                    html += `<a href="${url}" target="_blank">${i.problem.name}</a><br>`;
               }
          }
         let keys=Object.keys(mp);
        // console.log(keys);
       /* const v=[];
         for(let i of keys){
            v.push({tag:i,count:mp[i].length});
         }
            */
           let div=document.createElement("div");
                div.innerHTML=html;
            add.appendChild(div);
            /*
         for(let i of keys){
                let div=document.createElement("div");
                div.innerHTML="<h2> " + i + " (" + mp[i].length + ")" + "</h2>";
            add.appendChild(div);
            for(let j of mp[i]){
                 div=document.createElement("div");
                div.innerText=j;
                add.appendChild(div);
            }
         }
            */


}

///analyzeHandle(handleValue);
