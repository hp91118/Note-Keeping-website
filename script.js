//local storage ....
const addbtn = document.getElementById("btn1");

const updatedata = () => {
  const textdata = document.querySelectorAll("textarea");
  const notes = [];
  console.log(textdata);

  textdata.forEach((note) => {
    return notes.push(note.value);
  });
  console.log(notes);
  localStorage.setItem("notes", JSON.stringify(notes));
};

const addnewnote = (text = '') => {
  const note = document.createElement("div");
  note.classList.add("note");
  const htmldata = `
        <div class="operation">
        <button class="edit"><i class="fa fa-edit"></i></button>
        <button class="delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
      </div>
      <div class="main ${text ? "" : "hidden"}"></div>

      <textarea class="txt ${text ? "hidden" : ""}"></textarea>
        `;
  note.insertAdjacentHTML("afterbegin", htmldata);
  const editbtn = note.querySelector(".edit");
  const delbtn = note.querySelector(".delete");
  const maindiv = note.querySelector(".main");
  const textarea = note.querySelector(".txt");

  delbtn.addEventListener("click", () => {
    note.remove();
    updatedata();
  });
  textarea.value = text;
  maindiv.innerHTML = text;
  textarea.addEventListener("change", (event) => {
    const value = event.target.value;
    console.log(value);
    maindiv.innerHTML = value;
    updatedata();
  });
  editbtn.addEventListener("click", () => {
    maindiv.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
  });

  document.body.append(note);
};

const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
  notes.forEach((note) => addnewnote(note));
}

addbtn.addEventListener("click", () => addnewnote());
