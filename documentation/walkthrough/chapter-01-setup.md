# Chapter #1 - Setup

In this chapter I [create a new React App](https://legacy.reactjs.org/docs/create-a-new-react-app.html) and I create one repository in [my GitHub account](https://github.com/qbreis/).

## Create a new React App

I name my React App "Pop a Popup Balloon":

```bash
npm create react-app react-pop-a-popup-balloon
cd react-pop-a-popup-balloon
npm run start
```

## Setting up local Git Repo

>    Setup is one word when it is a noun (e.g., “it was a setup!”) or an adjective (e.g., “follow the setup instructions”). It is two words —set up— when it functions as a verb (e.g., “I'm going to set up the computer”).

Immediately, before creating my new repo in my GitHub account, I want to rename the master branch in my local Git repository for the most popular term main, in order to move to a more inclusive, open culture and removing language like "master/slave" from this place:

```bash
git branch -m master main
```

## Chapters

Following, I want to keep all the steps in the development process in separate chapter or branches described in same repo, so I create a new Git branch by running: `$ git checkout -b main-chapter-01`.

Now I create new `documentation/walkthrough/chapter-01-setup.md`, which I can check online: [Chapter #1 - Setup](https://github.com/qbreis/react-pop-a-popup-balloon/blob/main/documentation/walkthrough/chapter-01-setup.md).

And finally, I want to adapt README file, which I can as well check online: [README for the main repo](https://github.com/qbreis/react-pop-a-popup-balloon/blob/main/documentation/walkthrough/README.md) and a [MIT License](https://github.com/qbreis/react-pop-a-popup-balloon/blob/main/LICENSE) for this project.

Time to do first [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/):

```bash
git add .
git commit -m 'chore: Initial commit with package.json, chapter #1 - setup, readme and license documentation-related files'
```

## Cretae new Git repo on GitHub

I go to [my GitHub account](https://github.com/qbreis/) to create a new repository, I will name it just "react-pop-a-popup-balloon" and I can choose "public" or "private".

Description: "A basic React game to demonstrate simple gaming in React apps without implementing a game engine.".    

## Reference links

- [React Pop a Popup Balloon](https://github.com/qbreis/react-pop-a-popup-balloon/) - Link to this GitHub repo.
- [Chapter #1 - Setup](https://github.com/qbreis/react-pop-a-popup-balloon/blob/main/documentation/walkthrough/chapter-01-setup.md) - Link to this chapter.
- [React Pop a Popup Balloon Chapters](https://github.com/qbreis/react-pop-a-popup-balloon/tree/main/documentation/walkthrough) - Link to the Chapters.
- [Creating a balloon popping game with React](https://blog.logrocket.com/using-react-web-games/#creating-balloon-popping-game-react)
- [pop-a-balloon Repository](https://github.com/c99rahul/pop-a-balloon)

## External links

- [Create a new React App](https://legacy.reactjs.org/docs/create-a-new-react-app.html)
- [Git - Wikipedia](https://en.wikipedia.org/wiki/Git) - Maybe I want to read about Git.
- [GitHub - Wikipedia](https://en.wikipedia.org/wiki/GitHub) - Maybe I want to know more about the hosting service I am using.
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) - As a must.
- [Rename "master" branch to "main"](https://www.git-tower.com/learn/git/faq/git-rename-master-to-main) - Short article on renaming "master" in my own Git repositories to "main" (or any other term my team has chosen).
- [RenameGitBranch.md](https://gist.github.com/danieldogeanu/739f88ea5312aaa23180e162e3ae89ab) - Rename Git Branch By [danieldogeanu](https://gist.github.com/danieldogeanu).
- [Game Development With React](https://reactresources.com/topics/game-development)
- [Using React in web games](https://blog.logrocket.com/using-react-web-games/)
- [Tic-Tac-Toe in React](https://kyleshevlin.com/tic-tac-toe/)