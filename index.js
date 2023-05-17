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
setUp();
// Set up
function setUp() {
    chrome.storage.sync.get(["details"], function (result) {
        // console.log(result.details.name);
        if (result.details === undefined) {
            document.getElementById("timming").style.display = "none";
            document.getElementById("intro").style.display = "block";
            document.getElementById("heading").style.display = "block";
            // document.getElementById("optionbar").style.display = "none";
            document.getElementById("working").style.display = "none";
        } else {
            chrome.storage.sync.get(["rate"], function (res) {
                if (res.rate === undefined) {
                    document.getElementById("heading").style.display = "block";
                    // document.getElementById("optionbar").style.display = "none";
                    document.getElementById("timming").style.display = "block";
                    document.getElementById("intro").style.display = "none";
                    document.getElementById("working").style.display = "none";
                } else {
                    // document.getElementById("optionbar").style.display = "inline-block";
                    document.getElementById("intro").style.display = "none";
                    document.getElementById("timming").style.display = "none";
                    document.getElementById("reset").style.display = "inline-block";
                    document.getElementById("fpassword").style.display = "inline-block";
                    document.getElementById("option").style.display = "inline-block";
                    document.getElementById("heading").style.display = "block";
                    document.getElementById("working").style.display = "block";
                    // document.getElementById("greet").innerHTML = "Hello " + result.name + ", it's time to study.";
                    // alert("Wrong Answer");
                }
            });
            // document.getElementById("reset").style.display = "inline-block";
            // document.getElementById("fpassword").style.display = "inline-block";
            // document.getElementById("option").style.display = "inline-block";
            // document.getElementById("working").style.display = "block";
            // document.getElementById("greet").innerHTML = "Hello " + result.name + ", it's time to study.";
        }
        // console.log(result);
    });
}

// Taking name input 
// let submitName = document.getElementById('subName');
document.getElementById('nameInput').addEventListener("keyup", changeName);
document.getElementById('passInput').addEventListener("keyup", changeName);
document.getElementById('conPassInput').addEventListener("keyup", changeName);
document.getElementById('secque').addEventListener("keyup", changeName);
document.getElementById('ans').addEventListener("keyup", changeName);

let checkName = document.getElementById('nameInput');
checkName.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && track())
        saveName();
});

let pass = document.getElementById('passInput');
pass.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && track())
        saveName();
});

let conpass = document.getElementById('conPassInput');
conpass.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && track())
        saveName();
});

let ques = document.getElementById('secque');
ques.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && track())
        saveName();
});

let answ = document.getElementById('ans');
answ.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && track())
        saveName();
});

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
    //                 else
    //                     return false;
    //             else
    //                 return false;
    //         else
    //             return false;
    //     else
    //         return false;
    // else
    return false;
}

function changeName() {
    if (track()) {
        // var name = document.getElementById('nameInput').value;
        // var pass = document.getElementById('passInput').value;
        // var conpass = document.getElementById('conPassInput').value;
        // var ques = document.getElementById('secque').value;
        // var ans = document.getElementById('ans').value;
        // if (name.trim() === "")
        // document.getElementById("subName").style.display = "none";
        // else
        document.getElementById("subName").style.display = "block";

    }
    else
        document.getElementById("subName").style.display = "none";
}

document.getElementById('subName').addEventListener("click", saveName);

async function saveName() {
    var name = document.getElementById('nameInput').value;
    name = name.trim();
    var pass = document.getElementById('passInput').value;
    pass = pass.trim();
    let hashC = await run(pass);
    var ques = document.getElementById('secque').value;
    ques = ques.trim();
    var ans = document.getElementById('ans').value;
    ans = ans.trim();
    let hashA = await run(ans);
    const n = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    chrome.storage.sync.set({ details: { name: n, password: hashC, question: ques, answer: hashA } }, function () {
        console.log(hashC);
        document.getElementById("timming").style.display = "block";

        // document.getElementById("reset").style.display = "inline-block";
        // document.getElementById("fpassword").style.display = "inline-block";
        // document.getElementById("option").style.display = "inline-block";
        document.getElementById("intro").style.display = "none";
        // document.getElementById("working").style.display = "block";
        // document.getElementById("greet").innerHTML = "Hello " + name + ", it's time to study.";
        // chrome.tabs.create({ url: "options.html" });
    });
}

// Functions performing on swtiching alarm on and off
let time = 0;
// let input = document.getElementById('hours');

// input.addEventListener('keyup', (e) => {
//     if (e.key === 'Enter')
//         setReminder();
// });

function change(time) {
    // console.log(time);
    // chrome.storage.sync.get(["time"], function (result) {
    //     console.log(result.time);
    // })
    // console.log("this is time" + time);
    if (time == -1) {
        document.getElementById("sr").style.display = "none";
        document.getElementById("m45").style.display = "none";
        document.getElementById("m60").style.display = "none";
        document.getElementById("m90").style.display = "none";
        document.getElementById("m120").style.display = "none";
        document.getElementById("m150").style.display = "none";
        document.getElementById("pause").innerText = "Resume";
        const re = document.getElementById("remove");
        re.style.display = "block";
        const pa = document.getElementById("pause");
        pa.style.display = "block";
    } else {
        document.getElementById("sr").style.display = "block";
        document.getElementById("m45").style.display = "inline-block";
        document.getElementById("m60").style.display = "inline-block";
        document.getElementById("m90").style.display = "inline-block";
        document.getElementById("m120").style.display = "inline-block";
        document.getElementById("m150").style.display = "inline-block";
    }
    console.log(time);
    if (time > 0) {
        const re = document.getElementById("remove");
        re.style.display = "block";
        const pa = document.getElementById("pause");
        pa.style.display = "block";
        const sr = document.getElementById("sr");
        sr.innerHTML = "Add Time";
        // const ad = document.getElementById("add");
        // ad.style.display = "none";
        // const h = document.getElementById("hours");
        // h.style.display = "none";
        // console.log("Object going in backend");
        chrome.runtime.sendMessage({ time }, function (res) {
            console.log("Response sent: " + res);
            // console.log("Sent Response");
            // if (res) {
            //     time = 0;
            // chrome.storage.sync.set({ time: time }, function () {
            //     change(0);
            // });
            // console.log("w2");
            // console.log("TRUE RES");
            // } else {
            // console.log("FALSE RES");
            // }
            // time = 0;
            // chrome.storage.sync.set({ time: time }, function () {
            //     // console.log("w2");
            //     change(0);
            // });
        });
        // console.log("AFTER SENDING");
        // console.log("w0");
        // setTimeout(() => {
        //     // console.log(time + "waiting");
        //     // console.log("w1");
        //     time = 0;
        //     chrome.storage.sync.set({ time: time }, function () {
        //         // console.log("w2");
        //         change(0);
        //     // console.log("w3");
        // }, time * 60000);
        // console.log("w4");
    } else if (time == 0) {
        sr.innerHTML = "Set Time";
        // console.log("w5");
        // const ad = document.getElementById("add");
        // ad.style.display = "block";
        // const h = document.getElementById("hours");
        // h.style.display = "block";
        const re = document.getElementById("remove");
        re.style.display = "none";
        const pa = document.getElementById("pause");
        pa.style.display = "none";
    }
}

// document.getElementById('add').addEventListener("click", setReminder);
document.getElementById('m45').addEventListener("click", m45);
document.getElementById('m60').addEventListener("click", m60);
document.getElementById('m90').addEventListener("click", m90);
document.getElementById('m120').addEventListener("click", m120);
document.getElementById('m150').addEventListener("click", m150);

function m45() {
    setRem(45);
    // if (document.getElementById("sr").innerText === "Set Time") {
    //     setReminder(45);
    //     // console.log("it is set reminder");
    // } else {
    //     addReminder(45);
    // }
}

function m60() {
    setRem(60);
    // if (document.getElementById("sr").innerText === "Set Time") {
    //     setReminder(60);
    //     // console.log("it is set reminder");
    // } else {
    //     addReminder(60);
    // }
    // setReminder(60);
}

function m90() {
    setRem(90);
    // setRem(120);
    // if (document.getElementById("sr").innerText === "Set Time") {
    //     setReminder(90);
    //     // console.log("it is set reminder");
    // } else {
    //     addReminder(90);
    // }
    // setReminder(90);
}

function m120() {
    setRem(120);
    // if (document.getElementById("sr").innerText === "Set Time") {
    //     setReminder(120);
    //     // console.log("it is set reminder");
    // } else {
    //     addReminder(120);
    // }
    // setReminder(120);
}

function m150() {
    setRem(150);
    // setReminder(150);
}

function setRem(time) {
    if (document.getElementById("sr").innerText === "Set Time") {
        setReminder(time);
        // console.log("it is set reminder");
    } else {
        addReminder(time);
    }
}

function setReminder(t) {
    var d = new Date();
    // console.log(d.getTime());
    // console.log(d.getMilliseconds());
    // console.log(d.getSeconds());
    // console.log(d.getMinutes());
    // console.log(d.getHours());
    const now = d.getTime();
    // console.log("t2");
    // time = parseInt(document.getElementById('hours').value);
    // document.getElementById('hours').value = "";
    chrome.storage.sync.set({ time: t, at: now, number: 0, history: [] }, function () {
        change(t);
    });

    // if (isNaN(time)) {
    //     alert("Not a number.")
    //     // } else if (time > 240) {
    //     //     alert("Talk sense.")
    //     // }
    //     // else if (time < 25) {
    //     //     alert("Let it be. Dont sit for study.")
    // } else {
    //     chrome.storage.sync.set({ time: time, number: 0, history: [] }, function () {
    //         change(time);
    //     });
    //     // setTimeout(() => {
    //     //     const ad = document.getElementById("add");
    //     //     ad.style.display = "block";
    //     //     h.style.display = "block";
    //     //     const h = document.getElementById("hours");
    //     //     const re = document.getElementById("remove");
    //     //     re.style.display = "none";
    //     // }, 5000);
    // }
}

function addReminder(t) {
    chrome.storage.sync.get(["at"], function (result) {
        // console.log(result.at);
        var d = new Date();
        var now = (d.getTime() - result.at) / 60000;
        chrome.storage.sync.get(["time"], function (res) {
            var newT = res.time - Math.floor(now) + t;
            var time = 0;
            chrome.runtime.sendMessage({ time }, function (res) { })
            time = newT;
            chrome.runtime.sendMessage({ time }, function (res) { })
            chrome.storage.sync.set({ time: newT }, function () {
                // change(time);
            });
        })
        // console.log(now);
        // console.log(now / 1000);
        // console.log(now / 60000);
    })

}

document.getElementById('remove').addEventListener("click", removeReminder);

async function removeReminder() {
    await chrome.storage.sync.get(["details"], async function (result) {
        if (result.details === undefined) {
            // alert("Caught in some errors.");
            chrome.storage.sync.clear();
        }
        else {
            let pass = prompt('Enter Password');
            let hashC = await run(pass);
            if (hashC === result.details.password) {
                time = 0;
                chrome.storage.sync.set({ time: time }, function () {
                    change(time);
                });
                // document.getElementById('hours').value = "";
                chrome.runtime.sendMessage({ time }, function (res) {
                    // console.log(res);
                });
            }
            else {
                alert("Wrong Password.");
            }
        }
        // change(result.time);
    });

}

document.getElementById('pause').addEventListener("click", PRReminder);

function PRReminder() {
    if (document.getElementById("pause").innerText === "Pause") {
        document.getElementById("pause").innerText = "Resume";
        document.getElementById("sr").style.display = "none";
        document.getElementById("m45").style.display = "none";
        document.getElementById("m60").style.display = "none";
        document.getElementById("m90").style.display = "none";
        document.getElementById("m120").style.display = "none";
        document.getElementById("m150").style.display = "none";
        pauseReminder();
    } else {
        // console.log("object");
        // console.log(document.getElementById("pause").innerText);
        // console.log(document.getElementById("pause").innerHTML);
        // console.log(document.getElementById("pause").value);
        document.getElementById("sr").style.display = "block";
        document.getElementById("pause").innerText = "Pause";
        document.getElementById("m45").style.display = "inline-block";
        document.getElementById("m60").style.display = "inline-block";
        document.getElementById("m90").style.display = "inline-block";
        document.getElementById("m120").style.display = "inline-block";
        document.getElementById("m150").style.display = "inline-block";
        resumeReminder();
    }
}

function pauseReminder() {
    chrome.storage.sync.get(["at"], function (result) {
        // console.log(result.at);
        var d = new Date();
        var now = (d.getTime() - result.at) / 60000;
        var result = Math.floor(now);
        var r = parseInt(now);
        // console.log("Tanish " + Math.floor(now));
        // console.log("r  " + result + "  " + r);
        chrome.storage.sync.get(["time"], function (res) {
            // console.log("Neema " + res.time);
            var newT = res.time - Math.floor(now);
            var time = 0;
            // console.log("TN " + newT + "   " + temp);
            // console.log("not done");
            chrome.runtime.sendMessage({ time }, function (r) { })
            // console.log("object");
            // chrome.runtime.sendMessage({ newT }, function (res) { })
            chrome.storage.sync.set({ Ltime: newT, time: -1 }, function () {
                // console.log("done");
                // change(time);
            });
            // console.log("complete");
        })
    })
}

function resumeReminder() {
    chrome.storage.sync.get(["Ltime"], function (result) {
        var time = result.Ltime;
        chrome.runtime.sendMessage({ time }, function (res) { })
        var temp = 0;
        chrome.storage.sync.set({ Ltime: temp, time: time }, function () {
            change(time);
        });
    });
}

chrome.storage.sync.get(["time"], function (result) {
    if (result.time === undefined)
        change(0);
    else
        change(result.time);
});
// change(time);

// Resetting
document.getElementById('reset').addEventListener("click", resetting);

async function resetting() {
    await chrome.storage.sync.get(["details"], async function (result) {
        if (result.details === undefined) {
            chrome.storage.sync.clear();
            // alert("Something went wrong.");
            // chrome.storage.sync.clear();
            // // chrome.runtime.reload();
            // window.close();
        }
        else {
            let pass = prompt('Enter Password');
            let hashC = await run(pass);
            if (result.details.password === hashC) {
                chrome.storage.sync.clear();
                // chrome.runtime.reload();
                window.close();
            }
            else {
                alert("Wrong Password");
            }
        }
        // change(result.time);
    });
    // chrome.runtime.openOptionsPage();
}

// Forgot Password
document.getElementById('fpassword').addEventListener("click", passForgot);

async function passForgot() {
    await chrome.storage.sync.get(["details"], async function (result) {
        if (result.details === undefined);
        else {
            let ans = prompt("Question: " + result.details.question);
            let hashC = await run(ans);
            // chrome.storage.sync.get(["answer"], function (res) {
            if (result.details.answer === hashC) {
                chrome.storage.sync.clear();
                // chrome.runtime.reload();
                window.close();
            } else {
                alert("Wrong Answer");
            }
            // });
        }
    });
    // let bar = confirm('Confirm or deny');
    // console.log(foo, bar);
    // chrome.storage.sync.clear();
    // chrome.runtime.reload();
    // chrome.runtime.openOptionsPage();
}

// Option Page
document.getElementById('option').addEventListener("click", optionpage);

function optionpage() {
    // chrome.storage.sync.get(["password"], function (result) {
    //     if (result.password === undefined) {
    //         // alert("Something went wrong.");
    //         // chrome.storage.sync.clear();
    //         // // chrome.runtime.reload();
    //         // window.close();
    //     } else {
    //         let pass = prompt('Enter Password');
    //         if (result.password === pass) {
    chrome.runtime.openOptionsPage();
    window.close();
    // chrome.storage.sync.clear();
    // chrome.runtime.reload();
    //         }
    //         else {
    //             alert("Wrong Password");
    //         }
    //     }
    //     // change(result.time);
    // });
    // chrome.storage.sync.clear();
    // chrome.runtime.reload();
}

// Setting up when to block websites
document.getElementById('savetime').addEventListener("click", blocking);

function blocking() {
    // console.log("saving");
    let rate = document.querySelector('input[name="rate"]:checked').value;
    chrome.storage.sync.set({ rate: rate }, function () {
        chrome.runtime.reload();
        // document.getElementById("timming").style.display = "none";
        // document.getElementById("optionbar").style.display = "inline-block";
        // document.getElementById("reset").style.display = "inline-block";
        // document.getElementById("fpassword").style.display = "inline-block";
        // document.getElementById("option").style.display = "inline-block";
        // document.getElementById("working").style.display = "block";
        // document.getElementById("greet").innerHTML = "Hello " + result.name + ", it's time to study.";
        // window.close();
        // alert(rate);
    });
}

// Footer
//     -> ToDo List
document.getElementById('link0').addEventListener("click", toDo);

function toDo() {
    document.getElementById("working").style.display = "none";
    document.getElementById("heading").style.display = "none";
    document.getElementById("container").style.display = "none";
    document.getElementById("intro").style.display = "none";
    document.getElementById("timming").style.display = "none";
    document.getElementById("contactI").style.display = "none";
    document.getElementById("aboutI").style.display = "none";
    document.getElementById("settingsI").style.display = "none";
    document.getElementById("Info").style.display = "block";
    document.getElementById("toDoI").style.display = "block";
    document.getElementById("back").style.display = "inline-block";
}

//     -> About
document.getElementById('link1').addEventListener("click", about);

function about() {
    document.getElementById("working").style.display = "none";
    document.getElementById("heading").style.display = "none";
    document.getElementById("container").style.display = "none";
    document.getElementById("intro").style.display = "none";
    document.getElementById("timming").style.display = "none";
    document.getElementById("contactI").style.display = "none";
    document.getElementById("toDoI").style.display = "none";
    document.getElementById("settingsI").style.display = "none";
    document.getElementById("Info").style.display = "block";
    document.getElementById("aboutI").style.display = "block";
    document.getElementById("back").style.display = "inline-block";
}

//     -> Contact
document.getElementById('link2').addEventListener("click", contact);

function contact() {
    document.getElementById("working").style.display = "none";
    document.getElementById("heading").style.display = "none";
    document.getElementById("container").style.display = "none";
    document.getElementById("intro").style.display = "none";
    document.getElementById("timming").style.display = "none";
    document.getElementById("toDoI").style.display = "none";
    document.getElementById("aboutI").style.display = "none";
    document.getElementById("settingsI").style.display = "none";
    document.getElementById("Info").style.display = "block";
    document.getElementById("contactI").style.display = "block";
    document.getElementById("back").style.display = "inline-block";
}

//     -> Settings
document.getElementById('link3').addEventListener("click", settingsI);

function settingsI() {
    document.getElementById("working").style.display = "none";
    document.getElementById("heading").style.display = "none";
    document.getElementById("container").style.display = "none";
    document.getElementById("intro").style.display = "none";
    document.getElementById("timming").style.display = "none";
    document.getElementById("toDoI").style.display = "none";
    document.getElementById("aboutI").style.display = "none";
    document.getElementById("contactI").style.display = "none";
    document.getElementById("Info").style.display = "block";
    document.getElementById("settingsI").style.display = "block";
    document.getElementById("back").style.display = "inline-block";
}

//     -> Back Button
document.getElementById('back').addEventListener("click", back);

function back() {
    document.getElementById("aboutI").style.display = "none";
    document.getElementById("Info").style.display = "none";
    document.getElementById("contactI").style.display = "none";
    document.getElementById("settingsI").style.display = "none";
    document.getElementById("back").style.display = "none";
    setUp();
    // chrome.storage.sync.get(["details"], function (result) {
    //     if (result.details === undefined) {
    //         // document.getElementById("optionbar").style.display = "none";
    //         document.getElementById("timming").style.display = "none";
    //         document.getElementById("heading").style.display = "block";
    //         document.getElementById("working").style.display = "none";
    //         document.getElementById("intro").style.display = "block";
    //     } else {
    //         chrome.storage.sync.get(["rate"], function (res) {
    //             if (res.rate === undefined) {
    //                 // document.getElementById("optionbar").style.display = "none";
    //                 document.getElementById("heading").style.display = "block";
    //                 document.getElementById("timming").style.display = "block";
    //                 document.getElementById("intro").style.display = "none";
    //                 document.getElementById("working").style.display = "none";
    //             } else {
    //                 // document.getElementById("optionbar").style.display = "inline-block";
    //                 document.getElementById("heading").style.display = "block";
    //                 document.getElementById("intro").style.display = "none";
    //                 document.getElementById("timming").style.display = "none";
    //                 document.getElementById("reset").style.display = "inline-block";
    //                 document.getElementById("fpassword").style.display = "inline-block";
    //                 document.getElementById("option").style.display = "inline-block";
    //                 document.getElementById("working").style.display = "block";
    //                 // document.getElementById("greet").innerHTML = "Hello " + result.name + ", it's time to study.";
    //                 // alert("Wrong Answer");
    //             }
    //         });
    //         // document.getElementById("reset").style.display = "inline-block";
    //         // document.getElementById("fpassword").style.display = "inline-block";
    //         // document.getElementById("option").style.display = "inline-block";
    //         // document.getElementById("working").style.display = "block";
    //         // document.getElementById("greet").innerHTML = "Hello " + result.name + ", it's time to study.";
    //     }
    //     // console.log(result);
    // });
}

// To-Do List
window.addEventListener('load', () => {
    addTodos();
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    form.addEventListener('submit', (e) => {
        let list = [];
        const task = input.value;
        // console.log("222");

        storeToDos(task);
        e.preventDefault();

        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Completed';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        input.value = '';

        task_edit_el.addEventListener('click', (e) => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_delete_el.innerText = "Delete";
                removeToDos(task_input_el.value);
                // console.log(task_input_el.value);
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
                // console.log(task_input_el.value);
                task_delete_el.innerText = "Completed";
                storeToDos(task_input_el.value);
            }
        });

        task_delete_el.addEventListener('click', (e) => {
            if (task_delete_el.innerText.toLowerCase() == "completed") {
                alert("Hurray!! Good job done.🥳🎉🎊")
            }
            list_el.removeChild(task_el);
            // console.log(task_input_el.value);
            removeToDos(task_input_el.value);
        });
    });
});
// });

function storeToDos(task) {
    chrome.storage.sync.get(["todoN"], function (res) {
        let list = [];
        document.getElementById("taskList").style.display = "block";
        if (res.todoN === undefined || res.todoN === 0) {
            list[0] = task;
            // console.log("object");
            chrome.storage.sync.set({ todoN: 1, todos: list }, function () { });
        } else {
            var index = res.todoN;
            chrome.storage.sync.get(["todos"], function (result) {
                // console.log("111");
                list = result.todos;
                list[index] = task;
                chrome.storage.sync.set({ todoN: index + 1, todos: list }, function () { });
            });
        }
    });
}

function removeToDos(task) {
    chrome.storage.sync.get(["todoN"], function (res) {
        chrome.storage.sync.get(["todos"], function (result) {
            let list = result.todos;
            const i = list.indexOf(task);
            if (i > -1) { // only splice array when item is found
                list.splice(index, 1); // 2nd parameter means remove one item only
            }
            // array = [2, 9]
            // console.log(array);
            var index = res.todoN;
            if (index == 1)
                document.getElementById("taskList").style.display = "none";
            // console.log("111");
            // list = result.todos;
            // list[index] = task;
            chrome.storage.sync.set({ todoN: index - 1, todos: list }, function () { });
        });

    });
}

function addTodos() {
    chrome.storage.sync.get(["todoN"], function (res) {
        if (res.todoN === undefined || res.todoN === 0) {
            document.getElementById("taskList").style.display = "none";
        }
        else {
            chrome.storage.sync.get(["todos"], function (result) {
                const list_el = document.querySelector("#tasks");
                let list = result.todos;
                let index = res.todoN;
                for (let i = 0; i < index; i++) {
                    const task = list[i];
                    const task_el = document.createElement('div');
                    task_el.classList.add('task');

                    const task_content_el = document.createElement('div');
                    task_content_el.classList.add('content');

                    task_el.appendChild(task_content_el);

                    const task_input_el = document.createElement('input');
                    task_input_el.classList.add('text');
                    task_input_el.type = 'text';
                    task_input_el.value = task;
                    task_input_el.setAttribute('readonly', 'readonly');

                    task_content_el.appendChild(task_input_el);

                    const task_actions_el = document.createElement('div');
                    task_actions_el.classList.add('actions');

                    const task_edit_el = document.createElement('button');
                    task_edit_el.classList.add('edit');
                    task_edit_el.innerText = 'Edit';

                    const task_delete_el = document.createElement('button');
                    task_delete_el.classList.add('delete');
                    task_delete_el.innerText = 'Completed';

                    task_actions_el.appendChild(task_edit_el);
                    task_actions_el.appendChild(task_delete_el);

                    task_el.appendChild(task_actions_el);

                    list_el.appendChild(task_el);

                    task_edit_el.addEventListener('click', (e) => {
                        if (task_edit_el.innerText.toLowerCase() == "edit") {
                            task_edit_el.innerText = "Save";
                            task_input_el.removeAttribute("readonly");
                            task_input_el.focus();
                            task_delete_el.innerText = "Delete";
                            removeToDos(task_input_el.value);
                            // console.log(task_input_el.value);
                        } else {
                            task_edit_el.innerText = "Edit";
                            task_input_el.setAttribute("readonly", "readonly");
                            task_delete_el.innerText = "Completed";
                            // console.log(task_input_el.value);
                            storeToDos(task_input_el.value);
                        }
                    });

                    task_delete_el.addEventListener('click', (e) => {
                        list_el.removeChild(task_el);
                        // console.log(task_input_el.value);
                        removeToDos(task_input_el.value);
                    });
                }
            });
        }
    });
}

// Change Blocked Page Set up
chrome.storage.sync.get(["rate"], function (res) {
    if (res.rate === undefined) {
    } else {
        // chrome.storage.sync.get(["number"], function (result) {
        //     if (result.number === undefined || result.number === 0) {
        //     } else {
        //         document.getElementById("pf").style.display = "block";
        //         // document.getElementById("second").style.display = "none";
        //         // document.getElementById("third").style.display = "block";
        //     }
        // })
        // console.log(res.rate);   
        // console.log("this is the rate");
        if (res.rate === "never")
            document.getElementById("n1").checked = "true";
        else if (res.rate === "all")
            document.getElementById("a1").checked = "true";
        else if (res.rate === "study")
            document.getElementById("s1").checked = "true";
        else if (res.rate === "schedule")
            document.getElementById("sc1").checked = "true";
    }
});

// Changing when to block websites
document.getElementById('st').addEventListener("click", cb);

async function cb() {
    console.log("saving");
    // if (document.querySelector('input[name="crate"]:checked') == true) {
    console.log("saving1");
    let rate = document.querySelector('input[name="crate"]:checked').value;
    await chrome.storage.sync.get(["details"], async function (res) {
        console.log("saving2");
        if (res.details === undefined) { }
        else {
            console.log("saving3");
            let pass = prompt("Enter password");
            let hashC = await run(pass);
            if (res.details.password == hashC) {
                chrome.storage.sync.set({ rate: rate }, function () {
                    // chrome.runtime.reload();
                    back();
                    // document.getElementById("timming").style.display = "none";
                    // document.getElementById("optionbar").style.display = "inline-block";
                    // document.getElementById("reset").style.display = "inline-block";
                    // document.getElementById("fpassword").style.display = "inline-block";
                    // document.getElementById("option").style.display = "inline-block";
                    // document.getElementById("working").style.display = "block";
                    // document.getElementById("greet").innerHTML = "Hello " + result.name + ", it's time to study.";
                    // window.close();
                    // alert(rate);
                });
            }
        }
    });
    // console.log("object");
    // }
}

// Changing Theme
document.getElementById('toggle').addEventListener("click", changeMode);

function changeMode() {
    chrome.storage.sync.get(["theme"], function (res) {
        if (res.theme != undefined) {
            if (res.theme == "dark") {
                setLight();
                // r.style.setProperty('--white', 'black');
                // r.style.setProperty('--bdr', 'black');
                chrome.storage.sync.set({ theme: "light" }, function () { });
            } else {
                setBlack();
                // r.style.setProperty('--white', 'white');
                // r.style.setProperty('--bdr', 'rgba(255, 255, 255, 0.25)');
                chrome.storage.sync.set({ theme: "dark" }, function () { });
            }
        }
        else {
            // r.style.setProperty('--bg', '#f0ffff');
            setLight();
            chrome.storage.sync.set({ theme: "light" }, function () { });
        }
    });

    // console.log(rs);
    // Alert the value of the --blue variable
    // alert("The value of --blue is: " + rs.getPropertyValue('--blue'));
    // if(r)
    // chrome.storage.sync.set({ theme: "white" }, function () { });
    // var element = document.body;
    // element.classList.toggle("dark-mode");
}

function setBlack() {
    var r = document.querySelector(':root');
    r.style.setProperty('--bg', '#1d2b3a');
    r.style.setProperty('--white', 'white');
    r.style.setProperty('--txt', 'white');
    r.style.setProperty('--btn', 'rgba(255, 255, 255, 0.25)');
    r.style.setProperty('--bthover', '#00dfc4');
    r.style.setProperty('--nti', '#1d2b3a');
}

function setLight() {
    var r = document.querySelector(':root');
    r.style.setProperty('--bg', '#f0ffff');
    r.style.setProperty('--white', '#00dfc4');
    r.style.setProperty('--txt', 'black');
    r.style.setProperty('--btn', '#00dfc4');
    r.style.setProperty('--bthover', 'white');
    r.style.setProperty('--nti', 'rgba(0, 223, 196,0.4)');
    // r.style.setProperty('--bg', '#1d2b3a');
}

chrome.storage.sync.get(["theme"], function (res) {
    if (res.theme != undefined) {
        if (res.theme == "light") {
            document.getElementById('toggle').checked = true;
            setLight();
        }
    }
});

// User Identification
// chrome.identity.getProfileUserInfo({ 'accountStatus': 'ANY' }, function (info) {
//     let mailId = info.email;
//     if (mailId != "")
//         document.getElementById("uEmail").style.display = "none";
// });

// About Page Slider
const body = document.body;
const slds = document.querySelectorAll('.sld');
const lBtn = document.getElementById('larrow');
const rBtn = document.getElementById('rarrow');

let actvSld = 0;

rBtn.addEventListener('click', () => {
    actvSld++;
    if (actvSld > slds.length - 1)
        actvSld = 0;
    setActvSld();
})

lBtn.addEventListener('click', () => {
    actvSld--;
    if (actvSld < 0)
        actvSld = slds.length - 1;
    setActvSld();
})

function setActvSld() {
    const AboutHeading = document.getElementById('AbtHead');
    if (AboutHeading.innerText == "# About ACTIVE.LE")
        AboutHeading.innerText = ("# About Us");
    else
        AboutHeading.innerText = ("# About ACTIVE.LE");
    slds.forEach((sld) => sld.classList.remove('actv'));
    slds[actvSld].classList.add('actv');
}

// Contact Us Page Slider
const slides = document.querySelectorAll('.slide');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

let activeSlide = 0;

rightBtn.addEventListener('click', () => {
    activeSlide++;
    if (activeSlide > slides.length - 1)
        activeSlide = 0;
    setActiveSlide();
})

leftBtn.addEventListener('click', () => {
    activeSlide--;
    if (activeSlide < 0)
        activeSlide = slides.length - 1;
    setActiveSlide();
})

function setActiveSlide() {
    slides.forEach((slide) => slide.classList.remove('active'));
    slides[activeSlide].classList.add('active');
}

// Open Mail from contact us Page
document.getElementById('Mail').addEventListener('click', openMail);
function openMail() {
    chrome.tabs.create({ url: `mailto:tempc2g@gmail.com` });
}

// Open Call from contact us Page
document.getElementById('Call').addEventListener('click', openCall);
function openCall() {
    chrome.tabs.create({ url: `tel:+918435338383` });
}

// Open Maps from contact us Page
document.getElementById('Maps').addEventListener('click', openMaps);
function openMaps() {
    chrome.tabs.create({ url: `https://www.google.com/maps/place/Crimson+Boutique/@22.7153655,75.9046524,17z/data=!3m1!4b1!4m6!3m5!1s0x3962e3b90ee744c9:0xf038f5ee5e3a7123!8m2!3d22.7153655!4d75.9068411!16s%2Fg%2F11jp_p_plf` });
}

// Open Linkedin from contact us Page
document.getElementById('Link').addEventListener('click', openLinkedin);
function openLinkedin() {
    chrome.tabs.create({ url: `https://www.linkedin.com/in/tanish-neema/` });
}

// Open Github from contact us Page
document.getElementById('Git').addEventListener('click', openGithub);
function openGithub() {
    chrome.tabs.create({ url: `https://github.com/tanishneema` });
}

// Open Facebook from contact us Page
document.getElementById('Face').addEventListener('click', openFace);
function openFace() {
    chrome.tabs.create({ url: `https://www.facebook.com/tanish.neema.33` });
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