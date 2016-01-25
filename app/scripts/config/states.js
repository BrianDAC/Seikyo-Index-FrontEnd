'use strict';

angular.module('seikyo.index')

.config(function ($stateProvider, $locationProvider) {
    if (/\.com$/.test(location.hostname))
        $locationProvider.html5Mode(true);

    $stateProvider
        .state('anon', {
            abstract: true,
            template: '<div flex layout ui-view />',
            data: {
                access: '*'
            }
        })
        .state('anon.home', {
            url: '/',
            controller: function ($state) {
                $state.go('user.dashboard');
            }
        })

    $stateProvider
        .state('user', {
            abstract: true,
            templateUrl: 'views/user-display.html',
            controller: 'UserDisplayCtrl',
            data: {
                access: 'logged'
            }
        })
        .state('user.dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'MainCtrl'
        })
        .state('user.advertising', {
            url: '/advertising',
            templateUrl: 'views/advertising.html',
            controller: 'AdvertisingCtrl',
            resolve: {
                advertisings: function (SeikyoResource) {
                    return SeikyoResource.getAdvertisings().$promise
                }
            }
        })
        .state('user.article', {
            url: '/article',
            templateUrl: 'views/article.html',
            controller: 'ArticleCtrl',
            resolve: {
                articles: function (SeikyoResource) {
                    return SeikyoResource.getArticles().$promise
                }
            }
        })
        .state('user.basicTerm', {
            url: '/basicTerm',
            templateUrl: 'views/basicTerm.html',
            controller: 'BasicTermCtrl',
            resolve: {
                basicTerms: function (SeikyoResource) {
                    return SeikyoResource.getBasicTerms().$promise
                }
            }
        })
        .state('user.editorial', {
            url: '/editorial',
            templateUrl: 'views/editorial.html',
            controller: 'EditorialCtrl',
            resolve: {
                editorials: function (SeikyoResource) {
                    return SeikyoResource.getEditorial().$promise
                }
            }
        })
        .state('user.experience', {
            url: '/experience',
            templateUrl: 'views/experience.html',
            controller: 'ExperienceCtrl',
            resolve: {
                experiences: function (SeikyoResource) {
                    return SeikyoResource.getExperiences().$promise
                }
            }
        })
        .state('user.femenineDivision', {
            url: '/femenineDivision',
            templateUrl: 'views/femenineDivision.html',
            controller: 'FemenineDivisionCtrl',
            resolve: {
                femenineDivisions: function (SeikyoResource) {
                    return SeikyoResource.getFemenineDivision().$promise
                }
            }
        })
        .state('user.futureGroup', {
            url: '/futureGroup',
            templateUrl: 'views/futureGroup.html',
            controller: 'FutureGroupCtrl',
            resolve: {
                futureGroups: function (SeikyoResource) {
                    return SeikyoResource.getFutureGroup().$promise
                }
            }
        })
        .state('user.masculineDivision', {
            url: '/masculineDivision',
            templateUrl: 'views/masculineDivision.html',
            controller: 'MasculineDivisionCtrl',
            resolve: {
                masculineDivisions: function (SeikyoResource) {
                    return SeikyoResource.getMasculineDivision().$promise
                }
            }
        })
        .state('user.message', {
            url: '/message',
            templateUrl: 'views/message.html',
            controller: 'MessageCtrl',
            resolve: {
                messages: function (SeikyoResource) {
                    return SeikyoResource.getMessage().$promise
                }
            }
        })
        .state('user.monthlyPhrase', {
            url: '/monthlyPhrase',
            templateUrl: 'views/monthlyPhrase.html',
            controller: 'MonthlyPhraseCtrl',
            resolve: {
                monthlyPhrases: function (SeikyoResource) {
                    return SeikyoResource.getMonthlyPhrase().$promise
                }
            }
        })
        .state('user.orientation', {
            url: '/orientation',
            templateUrl: 'views/orientation.html',
            controller: 'OrientationCtrl',
            resolve: {
                orientations: function (SeikyoResource) {
                    return SeikyoResource.getOrientation().$promise
                }
            }
        })
        .state('user.review', {
            url: '/review',
            templateUrl: 'views/review.html',
            controller: 'ReviewCtrl',
            resolve: {
                reviews: function (SeikyoResource) {
                    return SeikyoResource.getReview().$promise
                }
            }
        })
        .state('user.sokaAdvance', {
            url: '/sokaAdvance',
            templateUrl: 'views/sokaAdvance.html',
            controller: 'SokaAdvanceCtrl',
            resolve: {
                sokaAdvances: function (SeikyoResource) {
                    return SeikyoResource.getSokaAdvance().$promise
                }
            }
        })
        .state('user.studentGroup', {
            url: '/studentGroup',
            templateUrl: 'views/studentGroup.html',
            controller: 'StudentGroupCtrl',
            resolve: {
                studentGroups: function (SeikyoResource) {
                    return SeikyoResource.getStudentGroup().$promise
                }
            }
        })
});
