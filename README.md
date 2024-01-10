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
