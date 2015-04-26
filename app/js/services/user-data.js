'use strict';

angular
.module('app.services')
.factory('userData', function($http, Restangular){
	var user = {
		getInformation: function () {
			return Restangular.one('people/me')
				.get()
				.catch(function(res){
					var status = res.data.errors[0].status;
					if(status === '401') {
						var destinationUrl = 'https://api.tnyu.org/v2/auth/facebook?success=' + window.location;
						window.location = destinationUrl;
					}
				});
		},
		isLoggedIn: function (currentUser) {
			if(Object.keys(currentUser).length !== 0){
				return true;
			} else {
				return false;
			} 
		},
		onTeams: function(currentUser, callback){
			$http.get('https://api.tnyu.org/v1.0/teams').success(function(data) {
				var allTeamIds = [], allTeamObjects = [];
				for(var m in data['linked']['team-memberships']){
					if(data['linked']['team-memberships'][m]['links']['member']['id'] === currentUser['id']){
						allTeamIds.push(data['linked']['team-memberships'][m]['id']);
					}
				}
				for(var eachTeam in data['teams']){
					if('links' in data['teams'][eachTeam]){
						for(var eachMemberships in data['teams'][eachTeam]['links']['memberships']){
							for(var eachUserTeam in allTeamIds){
								if(data['teams'][eachTeam]['links']['memberships'][eachMemberships] === allTeamIds[eachUserTeam]){
									allTeamObjects.push(data['teams'][eachTeam]);
								}
							}
						}
					}
				}
				callback(allTeamObjects);
			});
		}
	};
	return user;
});
