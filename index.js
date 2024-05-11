const taskForm = document.getElementById('task-form')
const confirmCloseDialog = document.getElementById('confirm-close-dialog')
const openTaskFormBtn = document.getElementById('open-task-form-btn')
const closeTaskFormBtn = document.getElementById('close-task-form-btn')
const addOrUpdateTaskBtn = document.getElementById('add-or-update-task-btn')
const cancelBtn = document.getElementById('cancel-btn')
const discardBtn = document.getElementById('discard-btn')
const tasksContainer = document.getElementById('tasks-container')
const titleInput = document.getElementById('title-input')
const dateInput = document.getElementById('date-input')
const descriptionInput = document.getElementById('description-input')

const taskData = JSON.parse(localStorage.getItem('data')) || []
let currentTask = {}

const addOrUpdateTask = () => {
	const dataArrIndex = taskData.findIndex(item => item.id === currentTask.id)
	const taskObj = {
		id: `${titleInput.value.toLowerCase().split(' ').join('-')}-${Date.now()}`,
		title: titleInput.value,
		date: dateInput.value,
		description: descriptionInput.value,
	}

	if (dataArrIndex === -1) {
		taskData.unshift(taskObj)
	} else {
		taskData[dataArrIndex] = taskObj
	}

	localStorage.setItem('data', JSON.stringify(taskData))
	updateTaskContainer()
	reset()
}

const updateTaskContainer = () => {
	tasksContainer.innerHTML = ''

	taskData.forEach(({ id, title, date, description }) => {
		tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button onclick="editTask(this)" type="button" class="btn">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
        </div>
      `
	})
}

const deleteTask = buttonEl => {
	const dataArrIndex = taskData.findIndex(
		item => item.id === buttonEl.parentElement.id
	)

	buttonEl.parentElement.remove()
	taskData.splice(dataArrIndex, 1)
	localStorage.setItem('data', JSON.stringify(taskData))
}

const editTask = buttonEl => {
	const dataArrIndex = taskData.findIndex(
		item => item.id === buttonEl.parentElement.id
	)

	currentTask = taskData[dataArrIndex]

	titleInput.value = currentTask.title
	dateInput.value = currentTask.date
	descriptionInput.value = currentTask.description

	addOrUpdateTaskBtn.innerText = 'Update Task'

	taskForm.classList.toggle('hidden')
}

const reset = () => {
	addOrUpdateTaskBtn.innerText = 'Add Task'
	titleInput.value = ''
	dateInput.value = ''
	descriptionInput.value = ''
	taskForm.classList.toggle('hidden')
	currentTask = {}
}

if (taskData.length) {
	updateTaskContainer()
}

openTaskFormBtn.addEventListener('click', () =>
	taskForm.classList.toggle('hidden')
)

closeTaskFormBtn.addEventListener('click', () => {
	const formInputsContainValues =
		titleInput.value || dateInput.value || descriptionInput.value
	const formInputValuesUpdated =
		titleInput.value !== currentTask.title ||
		dateInput.value !== currentTask.date ||
		descriptionInput.value !== currentTask.description

	if (formInputsContainValues && formInputValuesUpdated) {
		confirmCloseDialog.showModal()
	} else {
		reset()
	}
})

cancelBtn.addEventListener('click', () => confirmCloseDialog.close())

discardBtn.addEventListener('click', () => {
	confirmCloseDialog.close()
	reset()
})

taskForm.addEventListener('submit', e => {
	e.preventDefault()

	addOrUpdateTask()
})

function getAverage(scores) {
	const sum = scores.reduce((acc, curr) => acc + curr, 0)
	return sum / scores.length
}

console.log(getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]))
console.log(getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]))

function getGrade(score) {
	if (score < 60) {
		return 'F'
	} else if (score <= 69) {
		return 'D'
	} else if (score <= 79) {
		return 'C'
	} else if (score <= 89) {
		return 'B'
	} else if (score <= 99) {
		return 'A'
	} else {
		return 'A++'
	}
}

console.log(getGrade(96))
console.log(getGrade(82))
console.log(getGrade(56))

function hasPassingGrade(score) {
	const grade = getGrade(score)
	return grade === 'F' ? false : true
}

console.log(hasPassingGrade(100))
console.log(hasPassingGrade(53))
console.log(hasPassingGrade(87))

function studentMsg(totalScores, studentScore) {
	const average = getAverage(totalScores)
	const grade = getGrade(studentScore)
	return grade === 'F'
		? `Class average: ${average}. Your grade: ${grade}. You failed the course.`
		: `Class average: ${average}. Your grade: ${grade}. You passed the course.`
}
console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37))
