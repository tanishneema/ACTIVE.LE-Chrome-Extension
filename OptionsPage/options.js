// document.addEventListener('contextmenu', (e) => e.preventDefault());

// function ctrlShiftKey(e, keyCode) {
//     return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
// }

// document.onkeydown = (e) => {
//     // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
//     if (
//         e.key === "F12" ||
//         ctrlShiftKey(e, 'I') ||
//         ctrlShiftKey(e, 'J') ||
//         ctrlShiftKey(e, 'C') ||
//         (e.ctrlKey && e.key === 'U')
//     )
//         return false;
// };

chrome.storage.sync.get(["details"], function (result) {
    if (result.details === undefined) {
        document.getElementById("first").style.display = "block";
        document.getElementById("define").style.display = "block";
        document.getElementById("definetime").style.display = "none";
        document.getElementById("second").style.display = "none";
    } else {
        chrome.storage.sync.get(["rate"], function (res) {
            if (res.rate === undefined) {
                document.getElementById("first").style.display = "block";
                document.getElementById("definetime").style.display = "block";
                document.getElementById("define").style.display = "none";
                document.getElementById("second").style.display = "none";
                // document.getElementById("timming").style.display = "block";
                // document.getElementById("intro").style.display = "none";
            } else {
                chrome.storage.sync.get(["number"], function (rt) {
                    if (rt.number === undefined || rt.number === 0) {
                    } else {
                        document.getElementById("pf").style.display = "block";
                        // document.getElementById("second").style.display = "none";
                        // document.getElementById("third").style.display = "block";
                    }
                })
                // console.log(res.rate);   
                // console.log("this is the rate");
                document.getElementById("first").style.display = "none";
                document.getElementById("define").style.display = "none";
                document.getElementById("definetime").style.display = "none";
                document.getElementById("second").style.display = "block";
                // if (res.rate === "never")
                //     document.getElementById("never1").checked = "true";
                // else if (res.rate === "all")
                //     document.getElementById("all1").checked = "true";
                // else if (res.rate === "study")
                //     document.getElementById("study1").checked = "true";
                // else if (res.rate === "schedule")
                //     document.getElementById("schedule1").checked = "true";
            }
        });
    }
    // console.log(result);
});

// Taking name input 
document.getElementById('nameInput').addEventListener("keyup", changeName);
document.getElementById('passInput').addEventListener("keyup", changeName);
document.getElementById('conPassInput').addEventListener("keyup", changeName);
document.getElementById('secque').addEventListener("keyup", changeName);
document.getElementById('ans').addEventListener("keyup", changeName);

let checkName = document.getElementById('nameInput');
if (checkName != null)
    checkName.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' && track())
            saveName();
    });

let pass = document.getElementById('passInput');
if (pass != null)
    pass.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' && track())
            saveName();
    });

let conpass = document.getElementById('conPassInput');
if (conpass != null)
    conpass.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' && track())
            saveName();
    });

let ques = document.getElementById('secque');
if (ques != null)
    ques.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' && track())
            saveName();
    });

let answ = document.getElementById('ans');
if (answ != null) {
    answ.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' && track())
            saveName();
    });
}

function track() {
    var name = document.getElementById('nameInput').value;
    var pass = document.getElementById('passInput').value;
    var conpass = document.getElementById('conPassInput').value;
    var ques = document.getElementById('secque').value;
    var ans = document.getElementById('ans').value;
    if (name.trim().length > 0 && name.trim().length < 8)
        if (pass.trim().length > 0 && pass.trim().length < 8)
            if (conpass.trim().length > 0 && pass == conpass)
                if (ques.trim().length > 0 && ques.trim().length < 20)
                    if (ans.trim().length > 0 && ans.trim().length < 10)
                        return true;
    return false;
}

function changeName() {
    if (track())
        document.getElementById("subName").style.display = "block";
    else
        document.getElementById("subName").style.display = "none";
}

let sN = document.getElementById('subName');
if (sN != null)
    sN.addEventListener("click", saveName);

async function saveName() {
    var name = document.getElementById('nameInput').value;
    name = name.trim();
    var pass = document.getElementById('passInput').value;
    pass = pass.trim();
    let hashP = await run(pass);
    var ques = document.getElementById('secque').value;
    ques = ques.trim();
    var ans = document.getElementById('ans').value;
    ans = ans.trim();
    let hashA = await run(ans);
    const n = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    chrome.storage.sync.set({ details: { name: n, password: hashP, question: ques, answer: hashA } }, function () {
        document.getElementById("definetime").style.display = "block";
        document.getElementById("define").style.display = "none";
    });
}

// Change Password
let sN1 = document.getElementById('subName1');
if (sN1 != null)
    sN1.addEventListener("click", resetting);

async function resetting() {
    // console.log("call 1");
    var op = document.getElementById('passInput1').value;
    let hashO = await run(op);
    var np = document.getElementById('passInput2').value;
    let hashN = await run(np);
    var cp = document.getElementById('passInput3').value;
    // let pass = prompt('Enter Password');
    chrome.storage.sync.get(["details"], function (result) {
        // console.log("call 2");
        if (result.details === undefined) {
            // console.log("call 3");
            // alert("Something went wrong.");
            chrome.storage.sync.clear();
            // chrome.runtime.reload();
            window.close();
        }
        if (result.details.password === hashO && np !== op && np === cp) {
            // console.log("call 4");
            document.getElementById('passInput1').style.backgroundColor = "#1d2b3a";
            document.getElementById('passInput2').style.backgroundColor = "#1d2b3a";
            document.getElementById('passInput3').style.backgroundColor = "#1d2b3a";
            document.getElementById('passInput1').value = "";
            document.getElementById('passInput2').value = "";
            document.getElementById('passInput3').value = "";
            result.details.password = hashN;
            chrome.storage.sync.set({ details: result.details }, function () {
                // console.log("call 5");
            })
        }
        else {
            document.getElementById('passInput1').style.backgroundColor = "#ff00004d";
            document.getElementById('passInput2').style.backgroundColor = "#ff00004d";
            document.getElementById('passInput3').style.backgroundColor = "#ff00004d";
            // console.log("call 6");
            // alert("Wrong details");
        }
        // change(result.time);
    });
    // chrome.runtime.openOptionsPage();
}

// // Option Page
// document.getElementById('option').addEventListener("click", optionpage);

// function optionpage() {
//     // chrome.storage.sync.clear();
//     // chrome.runtime.reload();
//     chrome.runtime.openOptionsPage();
// }

// Setting up when to block websites
let st = document.getElementById('savetime1');
if (st != null)
    st.addEventListener("click", blocking);

function blocking() {
    let rate = document.querySelector('input[name="rate1"]:checked').value;
    // console.log(rate);
    // console.log("hi there");
    chrome.storage.sync.set({ rate: rate }, function () {
        // chrome.runtime.reload();
        // window.close();
        document.getElementById("definetime").style.display = "none";
        document.getElementById("define").style.display = "none";
        document.getElementById("first").style.display = "none";
        document.getElementById("second").style.display = "block";
        // document.getElementById("reset").style.display = "inline-block";
        // document.getElementById("fpassword").style.display = "inline-block";
        // document.getElementById("option").style.display = "inline-block";
        // document.getElementById("working").style.display = "block";
        // document.getElementById("greet").innerHTML = "Hello " + result.name + ", it's time to study.";
        // alert(rate);
    });
}

// // Changing up when to block websites
// let sT = document.getElementById('savetime');
// if (sT != null) {
//     sT.addEventListener("click", changeblock);
// }
// function changeblock() {
//     let rate = document.querySelector('input[name="rate"]:checked').value;
//     // console.log(rate);
//     // console.log("hi there");
//     chrome.storage.sync.set({ rate: rate }, function () {
//         // chrome.runtime.reload();
//         window.close();
//         // document.getElementById("definetime").style.display = "none";
//         // document.getElementById("define").style.display = "none";
//         // document.getElementById("first").style.display = "none";
//         // document.getElementById("second").style.display = "block";
//         // document.getElementById("reset").style.display = "inline-block";
//         // document.getElementById("fpassword").style.display = "inline-block";
//         // document.getElementById("option").style.display = "inline-block";
//         // document.getElementById("working").style.display = "block";
//         // document.getElementById("greet").innerHTML = "Hello " + result.name + ", it's time to study.";
//         // alert(rate);
//     });
// }

// Open Safe Folder
document.getElementById('openhistory').addEventListener("click", openfolder);

function openfolder() {
    // let rate = document.querySelector('input[name="rate"]:checked').value;
    // console.log(rate);
    // console.log("hi there");
    // chrome.storage.sync.set({ rate: rate }, function () {
    // var pass = document.getElementById('openpass').value;
    // console.log("0");
    // chrome.storage.sync.get(["password"], function (res) {
    // console.log("1");
    // if (res.password === undefined) {
    //     console.log("2");
    //     chrome.storage.sync.clear();
    //     window.close();
    // }
    // else if (res.password === pass) {
    // console.log("3");
    document.getElementById('openpass').value = "";
    document.getElementById('openpass').style.backgroundColor = "#1d2b3a";
    document.getElementById("first").style.display = "none";
    document.getElementById("second").style.display = "none";
    document.getElementById("third").style.display = "block";
    // } else {
    //     console.log("4");
    //     document.getElementById('openpass').style.backgroundColor = "#ff00004d";
    // }
    // console.log("5");
    // chrome.runtime.reload();
    // window.close();
    // document.getElementById("definetime").style.display = "none";
    // document.getElementById("define").style.display = "none";
    // document.getElementById("first").style.display = "none";
    // document.getElementById("second").style.display = "block";
    // document.getElementById("reset").style.display = "inline-block";
    // document.getElementById("fpassword").style.display = "inline-block";
    // document.getElementById("option").style.display = "inline-block";
    // document.getElementById("working").style.display = "block";
    // document.getElementById("greet").innerHTML = "Hello " + result.name + ", it's time to study.";
    // alert(rate);
    // });
    // })
}

// Appending or Adding History Elements to Option Page
chrome.storage.sync.get(["number"], function (res) {
    if (res.number === undefined || res.number === 0) { }
    else {
        chrome.storage.sync.get(["history"], function (result) {
            var div = document.getElementById('pp');
            let l = res.number;
            for (var i = 0; i < l; i++) {
                var a = document.createElement('a');
                var l1 = result.history[i].split("//")[1];
                var link = l1.split("/")[0];
                a.href = result.history[i];
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                a.innerText = (i + 1) + ". " + link + ".....";
                a.style.display = "block";
                a.style.color = "rgba(0, 223, 196, 0.6)";
                a.style.fontSize = "1em";
                a.style.marginBottom = "10px";
                a.style.textDecoration = "none";
                div.appendChild(a);
            }
        })
    }
})

// Clear History of Safe Folder
let cH = document.getElementById('clearhistory');
if (cH != null)
    cH.addEventListener("click", clearHistory);

function clearHistory() {
    chrome.storage.sync.set({ number: 0, history: [] }, function () { });
    window.close();
}

// Hasing the password before saving
async function hashText(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Calling the hash function and returning the Promise Result
async function run(text) {
    const hash = await hashText(text);
    return hash;
}