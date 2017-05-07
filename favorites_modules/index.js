'use strict';
const EventEmitter = require('events').EventEmitter,
    express = require('express'),
    eventsConfig = require('./config').events,
    favorites = require('./data/jsonfavorites.json');
class Favorite extends EventEmitter {
    constructor(jsonfavorites) {
        super();
        this.json = null;
        this.data = jsonfavorites;

//json of all fav

        this.on(eventsConfig.GET_ALL, () => {
            if (this.data == null)
                this.data = favorites;
        });
//by user
        this.on(eventsConfig.GET_FAVORITES_OF_USER, (user) => {
            var i = 0;
            var newArr = [];
            console.log('fffff');
            for (i = 0; i < favorites.length; i++) {
                if (favorites[i].user === user) {
                    console.log(user);
                    newArr.push(favorites[i].Ufavorites);
                }
            }
            if (newArr == [])
                newArr = {'Error': 'Wrong month', 'GET_ALL': 'try to get them all : getAllFavorites'};

            console.log(newArr);
            this.json = newArr;
        });


        this.on(eventsConfig.GET_THE_BEST_OF_MONTH_BY_CATEGORY, (month, category) => {
            var bestInMonth = [];
            for (var i = 0; i < favorites.length; i++) {
                for (var j = 0; j < favorites[i].Ufavorites.length; j++) {
                    if (favorites[i].Ufavorites[j].Month == month && favorites[i].Ufavorites[j].Category == category)
                        bestInMonth.push(favorites[i].Ufavorites[j]);
                }
            }
            if (bestInMonth == [])
                this.json = {'Errorrrr': 'Not found any movie at this category'};
            this.json = bestInMonth;
        });
    }

    getAllFavorites() {
        this.emit(eventsConfig.GET_ALL);
        return favorites;
    }

    getFavoritesOfUser(user) {
        this.emit(eventsConfig.GET_FAVORITES_OF_USER, user);
        return this.json;
    }

    getFavoritesOfMonthByCategory(month, category) {
        this.emit(eventsConfig.GET_THE_BEST_OF_MONTH_BY_CATEGORY, month, category);
        console.log('the bests of  ' + month + ' by category' + category + ' is:' + this.json);
        return this.json;
    }
}
module.exports = Favorite;