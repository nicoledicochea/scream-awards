const Movie = require("../models/Movie");

module.exports = {

  addFave: async (req, res, next) => {
    try {
      const movieTitle = req.body.movieTitle.toLowerCase();
      const urlMovie = movieTitle.split(' ').join('+');
      const fetch = await import('node-fetch');
      const response = await fetch.default(`https://www.omdbapi.com/?t=${urlMovie}&apikey=b93a8d4e`);
      const data = await response.json();
  
      const movie = await Movie.findOne({ movieTitle: movieTitle });
      let update;
      if (movie) {
        update = {
          $inc: { likes: 1 }
        };
      } else {
        update = {
          $set: { movieTitle: movieTitle,
                  likes: 1,
                  poster: data.Poster,
                  plot: data.Plot,
                  released: data.Released,
                  director: data.Director,
                  writer: data.Writer,
                  actors: data.Actors,
                  awards: data.Awards,
                  language: data.Language
          }
        };
      }
  
      const options = {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      };
  
      await Movie.findOneAndUpdate({ movieTitle: movieTitle }, update, options);
  
      console.log(movieTitle, 'Likes +1');
      if (movieTitle === 'scream' ||
        movieTitle === 'scream 2' ||
        movieTitle === 'scream 3' ||
        movieTitle === 'scream 4' ||
        movieTitle === 'scream 2022' ||
        movieTitle === 'scream 6') {
        res.redirect(`/movie`);
      } else {
        res.redirect(`/movie/wrong`);
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },  

  // addFave: async (req, res, next) => {
  //   try {
  //     const movieTitle = req.body.movieTitle.toLowerCase();
  //     // const title = movieTitle.split(' ')
  //     const urlMovie = movieTitle.split(' ').join('+');
  //     // const urlYear = Number(movieTitle.split(' ')[title.length - 1])
  //     const fetch = await import('node-fetch');
  //     const response = await fetch.default(`https://www.omdbapi.com/?t=${urlMovie}&apikey=b93a8d4e`)
     
      
  //     const data = await response.json();
  //     // console.log('data.Poster:', poster);
  
  //     const update = {
  //       $set: { poster: data.poster,
  //         poster: data.Poster,
  //         plot: data.Plot,
  //         released: data.Released,
  //         director: data.Director,
  //         writer: data.Writer,
  //         actors: data.Actors,
  //         awards: data.Awards,
  //         language: data.Language
  //        },
  //        $inc: { likes: 1 }
  //     };
  
  //     const options = {
  //       upsert: true,
  //       new: true,
  //       setDefaultsOnInsert: true
  //     };
  
  //     const movie = await Movie.findOneAndUpdate(
  //       { movieTitle: movieTitle },
  //       update,
  //       options
  //     );
 
  
  //     console.log(movieTitle, 'Likes +1');
  //     if (movieTitle === 'scream' ||
  //       movieTitle === 'scream 2' ||
  //       movieTitle === 'scream 3' ||
  //       movieTitle === 'scream 4' ||
  //       movieTitle === 'scream 5' ||
  //       movieTitle === 'scream 6') {
  //       res.redirect(`/movie`);
  //     } else {
  //       res.redirect(`/movie/wrong`);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     next(err);
  //   }
  // },

  // addFave: async (req, res) => {
  //   try {
  //       const movieTitle = req.body.movieTitle.toLowerCase()
  //       const urlMovie = movieTitle.split(' ').join('+')
  //       const fetch = await import('node-fetch');
  //       const response = await fetch.default(`https://www.omdbapi.com/?t=${urlMovie}&apikey=b93a8d4e`)
  //       const data = await response.json();
  //       res.json(data)
  //       console.log(data.poster)
  //         await Movie.findOneAndUpdate(
  //         { movieTitle: movieTitle },
  //         {
  //             $inc: { likes: 1 },
  //             $set: { poster: data.poster }
  //         },
  //         {
  //           upsert: true,
  //           setDefaultsOnInsert: true,
  //         }
  //     )
  //     console.log(movieTitle,"Likes +1");
  //     if(movieTitle === 'scream' ||
  //       movieTitle === 'scream 2' ||
  //       movieTitle === 'scream 3' ||
  //       movieTitle === 'scream 4' ||
  //       movieTitle === 'scream 5' ||
  //       movieTitle === 'scream 6') {
  //       res.redirect(`/movie`)
  //     } else {
  //       res.redirect(`/movie/wrong`)
  //     }
      
  // }  catch (err) {
  //     console.log(err);
  //   }
  // }, 

  // addFave: async (req, res) => {
  //     try {
        
  //       await Movie.create({
  //           movieTitle: req.body.movieTitle
  //         });
  //         console.log("Movie has been added!");
  //         res.redirect("/movie");
        
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }, 

    // addFave: async (req, res) => {
    //   try {
    //     if (await Movie.findOne({ movieTitle: req.params.movieTitle }) === null){
    //         await Movie.findOneAndUpdate(
    //         { _id: req.params.id },
    //         {
    //             $inc: { likes: 1 },
    //         }
    //     )
    //     console.log("Likes +1");
    //     res.redirect(`/movie`)
    // } else {
    //     await Model.create({
    //         movie: req.body.movie,
    //         likes: 0,
    //       });
    //       console.log("Movie has been added!");
    //       res.redirect("/movie");
    //     };
    //     ;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }, 
    getMovies: async (req, res) => {
      const movies = await Movie.find({}).sort({likes:-1})
        try {
          res.render("movie.ejs", { movies: movies });
        } catch (err) {
          console.log(err);
        }
    },
    getRanking: async (req, res) => {
      const movies = await Movie.find({}).sort({likes:-1})
        try {
          res.render("ranking.ejs", { movies: movies });
        } catch (err) {
          console.log(err);
        }
    },
    getWrong: async (req, res) => {
      const movies = await Movie.find({}).sort({likes:-1})
        try {
          res.render("wrong.ejs", { movies: movies });
        } catch (err) {
          console.log(err);
        }
    },
    updateVote: async (req, res) => {
      try {
        await Movie.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
          }
        );
        console.log("Vote count updated");
        
        if(req.params.id === '640538515c11fc54743726d9' ||
        req.params.id === '6405483d09717339507a39af' ||
        req.params.id === '6405484209717339507a39b2' ||
        req.params.id === '6405385b5c11fc54743726e2' ||
        req.params.id === '640550ce889a24327c66d5aa' ||
        req.params.id === '640556e01889ed3788635bf2' 
        ) {
          res.redirect(`/movie`)
        } else {
          res.redirect(`/movie/wrong`)
        }
      } catch (err) {
        console.log(err);
      }
    },

  };
  