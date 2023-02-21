const Movie = require("../models/Movie");

module.exports = {

  addFave: async (req, res) => {
    try {
        const movieTitle = req.body.movieTitle.toLowerCase()
          await Movie.findOneAndUpdate(
          { movieTitle: movieTitle },
          {
              $inc: { likes: 1 },
          },
          {
            upsert: true,
            setDefaultsOnInsert: true,
          }
      )
      console.log("Likes +1");
      if(movieTitle === 'scream' ||
        movieTitle === 'scream 2' ||
        movieTitle === 'scream 3' ||
        movieTitle === 'scream 4' ||
        movieTitle === 'scream 5') {
        res.redirect(`/movie`)
      } else {
        res.redirect(`/movie/wrong`)
      }
      
  }  catch (err) {
      console.log(err);
    }
  }, 

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
        
        if(req.params.id === '63f3eca65eef6044c8dd79df') {
          res.redirect(`/movie`)
        } else {
          res.redirect(`/movie/wrong`)
        }
      } catch (err) {
        console.log(err);
      }
    },

  };
  