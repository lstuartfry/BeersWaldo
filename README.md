# BeerFinder

beerswaldo.herokuapp.com

Is there a beer you've been wanting to try, but have had a tough time finding where to try or purchase it?  BeersWaldo was created with this problem in mind.  Utilizing the Google Maps API, Twitter API and BreweryDB API, just type in the beer, brewery and location you want to search and BeersWaldo will find it!

## Overview

BeersWaldo is an easy to use app that takes any beer you want to try, along with the city you want to search in, and sends you all the recent tweets in the desired area regarding that beer.  Whether a restaurant or bar has just tapped a keg of the desired beer, or an individual beer enthusiast has just purchased it or tried it themselves, BeersWaldo will bring you the results!

If you don't get any results back, unfortunately BeersWaldo was not able to find any recent tweets about your beer.  You can switch over to the INFO tab to read more about the beer, and see if it's out of season.

## Motivation

I created this app because I wanted a quick, easy way to find out where I could get a taste of whatever beer I was in the mood for.  I didn't want to take the time to search through all the menus of bars and restaurants in my area, just hoping they had what I wanted.  BeersWaldo gives me a quick snapshot of where or if I can find the beer I'm looking for.

## Contribute

1. Register for API keys from Google Maps (https://developers.google.com/maps/), Twitter (https://apps.twitter.com/ => "create new app"), and BreweryDB(http://www.brewerydb.com/developers/apps => "create an account").
2. Fork and clone this repo.
3. In the root directory of the project, run "npm install."
4. Plug in your various API keys/tokens in the server.js file (the sampleKeys.js file will direct you where to plug in each key).
5. Type "npm start" to run the program (or "nodemon app.js if you wish to use nodemon).
6. Visit "localhost:3000" in your web browser.

## Features for Future Releases

* **User Reviews**: For the time being, BeersWaldo only returns Tweets and BreweryDB information about a specific beer.  I think it'd be great if I could return user reviews of the specified beer as well.  This could be a key, final step for someone trying to decide whether or not they want to head out in search for their beer.

* **More Data/Social Media**: Unfortunately, Twitter's API only returns tweets from the past 7-10 days.  This often results in very few or no results for the beer you searched for.  Granted, it's often true that you'll be unable to find a very specific beer you're looking for at your local bar or restuaurant, but BeersWaldo will work better when it gives the users more results!  Sites like Untappd, Taphunter and even Instagram will be great sites to grab data from in the future.

### Tools Used:
* [Angular](https://angularjs.org/)
* [Node](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
