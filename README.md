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

<br>
<br>

## <a id="about">About the Project</a>

This project was developed as part of a technical assessment, with the requirement to create a To-Do list application using React. Opting for a full-stack approach, I chose Next.js as the frontend framework. To complement the stack, MongoDB was selected as the database, and Prisma served as the ORM. I used Context API for state management.

By using Next.js, I took advantage of built-in support for CSS modules and Sass, enabling a robust foundation for building a responsive and dynamic To-Do list application.

### Technologies Used:

- **Frontend:** React, Next.js, CSS Modules, Sass
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **ORM:** Prisma

<br>
<br>

## <a id="added">Highlights</a>

- Main features to pay attention to
  - Use of grid on header and form to add task
  - use of key frame animation on button
  - Responsiveness (tested on...)
  - Accessibility (tested with screen readers, keyboard navigation, zoom, default font-size of..., contrast checkers, )
  - Full CRUD using Next.js's API endpoints (User can create a task, they can delete it, and update it - either the name, or the completedness of the task). For a better user experience, I created a mechanism that disables buttons, when editing, or when the task is compelte.
  - Custom Checkbox
- Some challenges and how I overcame them

  - MongoDB on production environment
  - Prisma build step on a production environment
  - Next caching

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
