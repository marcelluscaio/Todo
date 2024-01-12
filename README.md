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

### Responsiveness and accessibility

The application was tested on:

- Portrait and landscape orientation;
- 500% zoom;
- 48px as default font size;
- Keyboard navigation;
- Assistive technology (Screen reader NVDA);

I used WAI-Aria to make input elements accessible to assistive technologies. I also used contrast checkers to ensure color contrast is CAG compliant.

- Full CRUD using Next.js's API endpoints (User can create a task, they can delete it, and update it - either the name, or the completedness of the task). For a better user experience, I created a mechanism that disables buttons, when editing, or when the task is compelte.

- Some challenges and how I overcame them

  - MongoDB on production environment
  - Prisma build step on a production environment
  - Next caching
  - Button component and typescript

(Use images here to exemplify)

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
- [ ] Readme

- V2
- [ ] Ver se consigo juntar as rotas das apis
- [ ] Quando abrir, ha uma versao sem conexao com banco de dados. Apos login, ha a versao com banco de dados
- [ ] Login
      https://javascript.plainenglish.io/authentication-patterns-with-nextauth-and-mongodb-in-next-js-13-2c1fa98d6b5e

  https://buttercms.com/blog/nextjs-authentication-tutorial/

  https://next-auth.js.org/providers/github
  https://next-auth.js.org/configuration/initialization#route-handlers-app
  https://next-auth.js.org/getting-started/example

Things I learned

- Mongo DB needs to have ip set to all
- To avoid caching you need to set the get api to export const revalidate = 0;
- For PRisma to work with Vercel we need to add the Prisma generate to the build script on package json

- How to set api endpoints with app router
  https://www.youtube.com/watch?v=vrR4MlB7nBI
  https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-segments

```

```
