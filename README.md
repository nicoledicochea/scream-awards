## The Scream Awards
### Ghostface: What's your favorite scary movie?
**Link to project:** [The Scream Awards](https://screamawards.cyclic.app/)

<p align="center">
<img alt="Screenshot of The Scream Awards Homepage" width="650" src="https://user-images.githubusercontent.com/111663583/221277080-8b161467-caae-4d5a-af2c-7c31bcc25794.gif"></img>
</p>

## About

I'm a Scream fanatic so this web application is unofficial promo for the 6th movie that premiered March 10th.

The app asks the question, *what's your favorite scary movie?* A user's answer determines whether Ghostface lets them live or die. Do *you* have what it takes to survive?

**Disclaimer:** I do not own the Scream franchise. I am simply a fan.

## More About the Film

If you aren't familiar with the series, see below for a quick synposis:

The "Scream" movie series, created by Wes Craven, is a modern classic in the horror genre. The first movie was released in 1996, and it quickly gained a cult following for its self-aware humor and meta-commentary on the horror genre. The franchise follows the character of Sidney Prescott, who becomes the target of a series of murders by a masked killer known as Ghostface. With its iconic mask and sharp wit, the "Scream" series has become a staple of horror movie culture and has influenced countless movies and TV shows in the years since its release.

## How It's Made

**Tech used:**  Node.JS, Express, MongoDB, HTML, CSS, JavaScript, EJS, Tailwind

### Open Source Tailwind Components:
- [Hyper UI](https://www.hyperui.dev/)
- [Flowrift](https://flowrift.com/c/cta)
- [Tailwind Awesome](https://www.tailwindawesome.com/?price=free&type=kit) - Multiple free kits

I used EJS templating to serve up HTML to the end user. EJS is great for embedding Javascript on the client side and allows for the use of variables and conditionals.

I created a Movie schema. This contained all the information that would go into a single movie document, including movieTitle (data type: string) and Likes (number).

There are five properties in the Movie controller. 

- addFave uses findOneAndUpdate. If a user inputs a movie that is already in the database, the like count will increase by 1. However, if a movie doesn't exist, 'upsert: true' dictates that the new movie will be added to the database with  movieTitle and likes = 1. Depending on the user input, the server will redirect to either '/movie' or 'movie/wrong'.
- getMovies and getRanking use find and sort to serve movie.ejs and ranking.ejs (respectively) with all movie documents sorted in descending order. getMovies differs as it contains additional text for users who chose the 'correct' film when voting. The only 'correct' answers are any of the Scream installements: 1 - 5. I will add the 6th one as an option once the film is released.
- getWrong serves up rendered wrong.ejs.
- updateVote uses findOneAndUpdate to increase a film's likes by 1.

As for the design, I stuck with dark colors to fit the theme of horror.

## Optimizations

I want to implement the Fetch API to receive data from [The Open Movie Database](http://www.omdbapi.com/). This way I can add images of movie posters to the Movie Ranking list.  

I need to figure out how to deal with incorrect user input. For example, if someone types 'Scraem 5' rather than 'Scream 5' that will mess with the count. The only way to fix that would be to manually enter the database, delete the misspelled document, and update the count for the correctly spelled film. There is also the issue of if someone were to type in 'Scream Five' or 'Scream V' rather than 'Scream 5'. I need to account for other spellings.

Currently, I link to YouTube videos. I *could* also embed them on the page, but I first want to see how that affects the design of the pages.

## Lessons Learned

I was having issues with deployment on Cyclic. I kept getting the following error: mongooseerror: the `uri` parameter to `openuri()` must be a string, got "undefined". make sure the first parameter to `mongoose.connect()` or `mongoose.createconnection()` is a string. However, the first parameter of mongoose.connect() *was* a string. After comparison to my other launched project, LumiLab, which is also deployed on Cyclic and did *not* give me that error, I was finally able to find the problem. I had an extra script in package.json 'build: node server.js' that must've been interfering with this, as deleting that caused the app to deploy.  

I used a conditonal on the server side to determine when a given page will display, as depending on a user's vote, they are served different pages.

## Examples:

Take a look at some of my recent work.

| [Saving People, Hunting Things, The API Business](https://github.com/nicoledicochea/savingPeople-huntingThings-theApiBusiness) | [LumiLab](https://github.com/nicoledicochea/lumi-lab) |
|--|--|
| <p align="center"><img alt="Screenshot of Saving People, Hunting Things, The API Business"  width="100%" src="https://user-images.githubusercontent.com/111663583/201507344-ad0ea063-1408-4794-ad52-dde4f7f3b189.gif"></img></p> |  <p align="center"><img alt="Screenshot of LumiLab"  width="100%" src="https://user-images.githubusercontent.com/111663583/218010069-7eb61449-b943-4c96-a258-589ba5f93c21.gif"></img></p> |
