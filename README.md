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

![Picture of website's header](/public/header.png)

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

![Picture of input with button inside of it](/public/button.png)

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

I used WAI-Aria to make input elements accessible to assistive technologies. I also used contrast checkers to ensure color contrast is WCAG compliant.

### Challenges

#### Using MongoDB on a production environment

To use MongoDB with a production environment it was necessary to set a different IP at the database settings.

#### Using Prisma on a production environment

To use Prisma with a production environment it was necessary to add Prisma's script to the application's build script.

#### Data caching

At some point I was having trouble with the tasks not being updated when the page refreshed. That was due to Next.js's caching system. I was able to solve that by using "export const revalidate = 0" on the GET route.

#### Button component

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

## <a id="portugues">Índice</a>

- [Sobre o Projeto](#sobre)
- [Destaques](#destaques)
- [Acesso](#accesso)
- [Contribuições](#contribuicoes)
- [Melhorias Futuras](#futuro)

## <a id="sobre">Sobre o Projeto</a>

Este projeto foi desenvolvido como parte de uma avaliação técnica, com o requisito de criar uma aplicação de lista de tarefas usando React. Optando por uma abordagem full-stack, escolhi o Next.js como framework frontend. Para complementar, o MongoDB foi escolhido como banco de dados, e o Prisma atuou como ORM. Utilizei a Context API para gerenciamento de estado.

Ao usar o Next.js, aproveitei o suporte integrado a CSS Modules e Sass, possibilitando uma base sólida para a construção de uma aplicação de lista de tarefas responsiva e dinâmica.

### Tecnologias Utilizadas:

- **Frontend:** React, Next.js, CSS Modules, Sass
- **Backend:** Node.js, Next.js
- **Banco de Dados:** MongoDB
- **ORM:** Prisma

## <a id="destaques">Destaques</a>

### Checkbox Personalizado com Animação

Criei um checkbox personalizado usando pseudo-elementos. Isso me permitiu estilizar os checkboxes conforme desejado, além de criar uma animação para interação do usuário.

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

### Uso de CSS Grid

Utilizei CSS Grid para criar um layout responsivo, mantendo-o adaptável a diferentes tamanhos de tela e configurações do usuário (como tamanhos de fonte padrão diferentes).

Para centralizar o titulo, enquanto o botão está alinhado à direita, utilizei o seguinte código:

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

![Foto do header do site](/public/header.png)

E para posicionar o botão à direita do input, utilizei uma div com display grid. Já vi essa implementação usando position absolute, mas isso exigiria definir o tamanho do input e do botão para que encaixassem. Com o CSS Grid, eles se adaptam automaticamente ao tamanho do container, e o tamanho do container se ajusta de acordo com o tamanho dos filhos.

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

![Foto do input com o botão incrustado](/public/button.png)

### Animação no Botão

Quando o botão recebe foco, há uma animação para mostrar isso aos usuários. Criei a animação usando Keyframes do CSS.

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

### Habilitação e Desabilitação de Elementos

Para melhorar a experiência do usuário, criei ações para habilitar e desabilitar campos de acordo com a interação do usuário.

A tarefa é editada quando o usuário clica na tarefa ou no botão de edição. Quando isso acontece, o elemento é destacado, mostrando que está pronto para ser editado, enquanto todos os outros botões e caixas de seleção são desativados, garantindo que o usuário não execute outra ação enquanto estiver editando uma tarefa.

Quando a tarefa é marcada como concluída, a tarefa é marcada como concluída, enquanto o botão de edição é desativado.

Parte da lógica para isso está aqui:

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

### CRUD Completo

A aplicação pode criar, ler, atualizar e excluir dados de um banco de dados. Para isso, utilizei as Rotas de API do Next.js.

### Responsividade e Acessibilidade

A aplicação foi testada em:

- Orientação retrato e paisagem;
- Zoom de 500%;
- Tamanho de fonte padrão de 48px;
- Navegação por teclado;
- Tecnologia assistiva (Leitor de tela NVDA);

Utilizei o WAI-Aria para tornar os elementos de entrada acessíveis às tecnologias assistivas. Também utilizei verificadores de contraste para garantir que o contraste de cores esteja em conformidade com as diretrizes WCAG.

### Desafios

#### Uso do MongoDB em Ambiente de Produção

Para usar o MongoDB em um ambiente de produção, foi necessário definir um IP diferente nas configurações do banco de dados.

#### Uso do Prisma em Ambiente de Produção

Para usar o Prisma em um ambiente de produção, foi necessário adicionar o script do Prisma ao script de construção da aplicação.

#### Armazenamento de Dados em Cache

Em determinado momento, tive problemas com as tarefas não sendo atualizadas quando a página era atualizada. Isso ocorreu devido ao sistema de armazenamento em cache do Next.js. Consegui resolver isso usando "export const revalidate = 0" na rota GET.

#### Componente de Botão

Ao criar um componente de botão, tive dificuldades em tipar suas propriedades. Isso ocorreu porque cada botão tinha necessidades diferentes: alguns precisavam de ações de clique, outros precisavam de atributos desabilitados, e assim por diante. Adicionar o tipo para cada atributo necessário seria um problema para a manutenção do projeto. O que fiz foi usar o Intersection Type do TypeScript com as Component Props do React:

```tsx
type ButtonProps = {
	text: string;
} & ComponentProps<"button">;
```

Dessa forma, o componente pode receber todos os atributos nativos do elemento.

## <a id="acesse">Acesse</a>

[Acesse agora mesmo o projeto clicando aqui.](https://todo-one-delta-39.vercel.app/)

## <a id="contribucoes">Contribuições</a>

Encontrou algum bug? Quer propor alguma melhoria? Fique à vontade para abrir um PR ou issue.

## <a id="futuro">Melhorias Futuras</a>

### Tarefas

- [x] Criar formulário
- [x] Formulário adiciona tarefa
- [x] Editar tarefa
- [x] Excluir tarefa
- [x] Marcar tarefa como concluída
- [x] Utilizar Context API para fornecer estado
- [x] API para Obter Tarefas
- [x] API para Adicionar Tarefa
- [x] API para Excluir Tarefa
- [x] API para Editar Tarefa
- [x] Estilizar formulário
- [x] Estilizar tarefas
- [x] Readme

### Futuro

- [ ] Login (Quando o aplicativo abrir, haverá uma versão sem conexão com o banco de dados, apenas um teste. Após o login, as tarefas do usuário serão conectadas ao banco de dados)
