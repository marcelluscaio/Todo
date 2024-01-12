# To Do List

> Readme written in English and in Portuguese

> Readme escrito em inglês e português

- [English](#english)
- [Português](#portugues)

## <a id="english">Table of Contents</a>

- [About the Project](#about)
- [Highlights](#highlights)
- [Access](#access)
- [Contributions](#contributions)
- [Future Improvements](#future)

## <a id="about">About the Project</a>

This project was developed as part of a technical assessment, with the requirement to create a To-Do list application using React. Opting for a full-stack approach, I chose Next.js as the frontend framework. To complement the stack, MongoDB was selected as the database, and Prisma served as the ORM. I used Context API for state management.

By using Next.js, I took advantage of built-in support for CSS modules and Sass, enabling a robust foundation for building a responsive and dynamic To-Do list application.

### Technologies Used:

- **Frontend:** React, Next.js, CSS Modules, Sass
- **Backend:** Node.js, Next.js
- **Database:** MongoDB
- **ORM:** Prisma

## <a id="added">Highlights</a>

### Custom Checkbox with animation

I created a custom checkbox using pseudo-elements. That allowed me to style the checkboxes as I wanted, as well as creating an animation for user interaction.

```scss
input[type="checkbox"] {
	display: grid;
	grid-template-rows: auto;
	grid-template-columns: auto;
	place-content: center;

	width: 1.5rem;
	height: 1.5rem;
	margin: 0;
	margin-right: 0.5rem;
	border: 0.125rem solid transparent;
	border-radius: 0.125rem;

	font: inherit;
	color: currentColor;

	appearance: none;

	&:disabled::before,
	&:disabled::after {
		opacity: 0.5;
	}
}

input[type="checkbox"]:focus-visible {
	outline: 2px solid var(--text);
	outline-offset: 4px;
}

input[type="checkbox"]::after {
	content: "";

	grid-row: 1/2;
	grid-column: 1/2;

	width: 1.5rem;
	height: 1.5rem;
	border-radius: 0.125rem;

	box-shadow: inset 1.5rem 1.5rem var(--text);

	transform: scale(1);
	transition: 250ms transform ease-in-out;
}

input[type="checkbox"]::before {
	content: "X";
	display: grid;
	place-content: center;

	grid-row: 1/2;
	grid-column: 1/2;
	place-self: center;

	width: 1.5rem;
	height: 1.5rem;
	border-radius: 0.125rem;
	border: 2px solid var(--text);

	box-shadow: inset 1.5rem 1.5rem var(--secondary);

	color: var(--primary);
	font-weight: 600;

	transform: scale(0);
	transition: 500ms transform ease-in-out 250ms;
}

input[type="checkbox"]:checked::before {
	transform: scale(1);
}

input[type="checkbox"]:checked::after {
	transform: scale(0);
}
```

### Use of CSS Grid

I used CSS Grid to create a responsive layout, while keeping it adaptable to different screen sizes and users' settings (like differente default font sizes).

To achieve the header with the title centered, while the button is aligned to the right, I used the following code:

```scss
.header {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	place-items: center;

	h1 {
		grid-column: 2/3;
	}

	button {
		grid-column: 3/4;
		justify-self: end;
	}
}
```

And to position the button on the right of the input, I used a div with display grid. I have seen this implementation using position absolute, but that would lead to a need of setting input's and button's size, so they would match. With CSS Grid they automatically adapt to the container size, and the container size adapts according to children size.

```scss
div {
	display: grid;
	grid-template-columns: 1fr auto;
}

input {
	grid-column: 1 / span 2;
	grid-row: 1/2;
}

button {
	grid-row: 1/2;
	grid-column: 2/3;
}
```

### Animation on button

When the button is focused, there is an animation to showthat to users. I created the animation using CSS Keyframes.

```scss
button {
	&:focus-visible {
		animation-name: shake;
		animation-duration: 2s;
		animation-iteration-count: infinite;
		animation-direction: normal;
		animation-timing-function: ease-in-out;
		outline: 2px solid var(--primary);
	}
}

@keyframes shake {
	0% {
		transform: translateY(0);
	}

	50% {
		transform: translateX(-20%);
	}
}
```

### Enabling and disabling elements

To improve user experience I created actions to enable and disable fields according to user interaction.

The task is edited when the user clicks on the task, or on the button edit. When that happens, the element is highlighted, showing it is apt for being edited, while all other buttons and checkboxes are disabled, making sure the user will not perform another action while editing a task.

When the task is marked as completed, the task is scored throught, while its edit button is disabled.

Part of the logic for that is here:

```tsx
<input disabled={isEditingItemId === null ? false : true} />
<input
  readOnly={isEditingItemId === task.id ? false : true}
  onClick={() => {
    isEditingItemId === null && !task.completed
      ? startEditingTask(task.id)
      : undefined;
  }}
  />

  <Button
    disabled={
      (isEditingItemId !== task.id && isEditingItemId !== null) ||
      task.completed
        ? true
        : false
    }
    onClick={() => {
      isEditingItemId !== task.id || isEditingItemId === null
        ? startEditingTask(task.id)
        : editTask(ref.current!, task.id);
    }}
  />
  <Button
    disabled={isEditingItemId === null ? false : true}
  />

```

### Full CRUD

Application can Create, Read, Update and Delete data from a database. To achieve that I used Next.js's API Routes.

### Responsiveness and accessibility

The application was tested on:

- Portrait and landscape orientation;
- 500% zoom;
- 48px as default font size;
- Keyboard navigation;
- Assistive technology (Screen reader NVDA);

I used WAI-Aria to make input elements accessible to assistive technologies. I also used contrast checkers to ensure color contrast is CAG compliant.

### Challenges

#### Using MongoDB on a production environment

To use MongoDB with a production environment it was necessary to set a different IP at the database settings.

#### Using Prisma on a production environment

To use Prisma with a production environment it was necessary to add Prisma's script to the application's build script.

#### Data caching

At some point I was having trouble with the tasks not being updated when the page refreshed. That was due to Next.js's caching system. I was able to solve that by using "export const revalidate = 0" on the GET route.

#### Button componente

When creating a button component, I had trouble typing its props. That happened because each button had different needs: some needed on click actions, others needed disabled attributes, and so on. Adding the type for each needed attribute would be a problem for the project's maintainability. What I did was using Typescript's Intersection Type with React's Component Props:

```tsx
type ButtonProps = {
	text: string;
} & ComponentProps<"button">;
```

That way the component could receive all of the native element's attributes.

## <a id="access">Access</a>

[Access the project right now by clicking here.](https://todo-one-delta-39.vercel.app/)

## <a id="contributions">Contributions</a>

Found a bug? Want to propose an improvement? Feel free to open a PR or issue.

## <a id="future">Future improvements</a>

### Tasks

- [x] Create form
- [x] Form adds task
- [x] Edit task
- [x] Delete task
- [x] Mark task as complete
- [x] Use context api to provide state
- [x] API Get Tasks
- [x] API Post Task
- [x] API Delete Task
- [x] API Edit Task
- [x] Style form
- [x] Style tasks
- [x] Readme

### Future

- [ ] Login (When the app opens, there will be one version without connection to the database, just a trial. After login, user's task are connected to DB)
