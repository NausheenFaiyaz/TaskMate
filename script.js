const wrapper = document.querySelector(".wrapper");
const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".back-btn");
const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskForm = document.querySelector(".add-task");
const blackBackdrop = document.querySelector(".black-backdrop");

const toggleScreen = () => wrapper.classList.toggle("show-category");

menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);

const toggleAddTaskForm = () => {
  addTaskForm.classList.toggle("active");
  blackBackdrop.classList.toggle("active");
  addTaskBtn.classList.toggle("active");
};

addTaskBtn.addEventListener("click", toggleAddTaskForm);
blackBackdrop.addEventListener("click", toggleAddTaskForm);

let categories = [
  {
    title: "Personal",
    img: "personal.png",
  },
  {
    title: "Coding",
    img: "coding.png",
  },
  {
    title: "Home",
    img: "home.png",
  },
  {
    title: "Movies Watchlist",
    img: "movie.png",
  },
  {
    title: "Fitness",
    img: "fitness.png",
  },
  {
    title: "Education",
    img: "education.png",
  },
  {
    title: "Work",
    img: "work.png",
  },
  {
    title: "Shopping",
    img: "shopping.png",
  },
  {
    title: "Health",
    img: "health.png",
  },
];

let tasks = [
  {
    id: 1,
    task: "Complete coding challange",
    category: "Coding",
    completed: false,
  },
  {
    id: 2,
    task: "take a 30min walk",
    category: "Fitness",
    completed: false,
  },
  {
    id: 3,
    task: "Watch an educational video",
    category: "Education",
    completed: false,
  },
  {
    id: 4,
    task: "Prepare presentation for meeting",
    category: "Education",
    completed: false,
  },
  {
    id: 5,
    task: "Go for a run",
    category: "Fitness",
    completed: false,
  },
  {
    id: 6,
    task: "Movie",
    category: "Personal",
    completed: false,
  },
];

let selectedCategory = categories[0];

const categoriesContainer = document.querySelector(".categories");
const categoryTitle = document.querySelector(".category-title");
const totalCategoryTasks = document.querySelector(".category-tasks");
const categoryImg = document.querySelector("#category-img");
const totalTasks = document.querySelector(".totalTasks");

const calculateTotal = () => {
  const categoryTasks = tasks.filter(
    (task) =>
      task.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );
  totalCategoryTasks.innerHTML = `${categoryTasks.length} Tasks`;
  totalTasks.innerHTML = tasks.length;
};

const renderCategories = () => {
  categoriesContainer.innerHTML = "";
  categories.forEach((category) => {
    const categoryTasks = tasks.filter(
      (task) => task.category.toLowerCase() === category.title.toLowerCase()
    );

    const div = document.createElement("div");
    div.classList.add("category");
    div.addEventListener("click", () => {
      wrapper.classList.add("show-category");
      selectedCategory = category;
      categoryTitle.innerHTML = category.title;
      categoryImg.src = `${category.img}`;
      calculateTotal();
      renderTasks();
    });

    div.innerHTML = ` <div class="left">
                <img src="${category.img}" alt="${category.title}" />
                <div class="content">
                  <h1>${category.title}</h1>
                  <p>${categoryTasks.length} Tasks</p>
                </div>
              </div>
              <div class="options">
                <div class="toggle-btn">
                  <i class="fa-solid fa-ellipsis-vertical"></i>
                </div>
              </div>`;
    categoriesContainer.appendChild(div);
  });
};

const tasksContainer = document.querySelector(".tasks");
const renderTasks = () => {
  tasksContainer.innerHTML = "";
  const categoryTasks = tasks.filter(
    (task) =>
      task.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );
  if (categoryTasks.length === 0) {
    tasksContainer.innerHTML = `<p class="no-task">No tasks for this category</p>`;
  } else {
    categoryTasks.forEach((task) => {
      const div = document.createElement("div");
      div.classList.add("task-wrapper");
      const label = document.createElement("label");
      label.classList.add("task");
      label.setAttribute("for", task.id);
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = task.id;
      checkbox.checked = task.completed;

      checkbox.addEventListener("change", () => {
        const index = tasks.findIndex((t) => t.id === task.id);
        tasks[index].completed = !tasks[index].completed;
        //save in local
        saveLocal();
      });

      div.innerHTML = `<div class="delete">
                <i class="fa-solid fa-trash-can"></i>
              </div>`;

      label.innerHTML = `<span class="checkmark">
                  <i class="fa-solid fa-check"></i>
                </span>
                <p>${task.task}</p>`;

      label.prepend(checkbox);
      div.prepend(label);
      tasksContainer.appendChild(div);

      //delete functionality
      const deleteBtn = div.querySelector(".delete");
      deleteBtn.addEventListener("click", () => {
        const index = tasks.findIndex((t) => t.id === task.id);

        //remove the ckicked task
        tasks.splice(index, 1);
        saveLocal();
        renderTasks();
      });
    });
    renderCategories();
    calculateTotal();
  }
};

//save and get tasks from local storage

const saveLocal = () => localStorage.setItem("tasks", JSON.stringify(tasks));
const getLocal = () => {
  const localTasks = JSON.parse(localStorage.getItem("tasks"));

  if (localTasks) {
    tasks = localTasks;
  }
};

//add functionality to add new tasks
const categorySelect = document.querySelector("#category-select");
const cancelBtn = document.querySelector(".cancel-btn");
const addBtn = document.querySelector(".add-btn");
const taskInput = document.querySelector("#task-input");

cancelBtn.addEventListener("click", toggleAddTaskForm);
addBtn.addEventListener("click", () => {
  const task = taskInput.value;
  const category = categorySelect.value;

  if (task === "") {
    alert("Please enter a task");
  } else {
    const newTask = {
      id: tasks.length + 1,
      task,
      category,
      completed: false,
    };
    tasks.push(newTask);
    taskInput.value = "";
    saveLocal();
    toggleAddTaskForm();
    renderTasks();
  }
});
categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category.title.toLowerCase();
  option.textContent = category.title;
  categorySelect.appendChild(option);
});

getLocal();
calculateTotal();
renderCategories();
renderTasks();
