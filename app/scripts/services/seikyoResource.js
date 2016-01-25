'use-strict';

angular.module('seikyo.index')

.factory('SeikyoResource', function ($resource, API) {
    return $resource(API.seikyos,{}, {
        getYear: {
            method: 'GET',
            url: API.seikyos,
            params: {
                year: '@year'
            },
            isArray: true
        },
        seikyo: {
            method: 'GET',
            url: API.seikyo,
            params: {
                seikyo: '@seikyo'
            }
        },
        getDivision: {
            method: 'GET',
            url: API.division,
            isArray: true
        },
        getAdvertisings: {
            method: 'GET',
            url: API.advertising,
            isArray: true
        },
        getArticles: {
            method: 'GET',
            url: API.article,
            isArray: true
        },
        getBasicTerms: {
            method: 'GET',
            url: API.basicTerm,
            isArray: true
        },
        getEditorial: {
            method: 'GET',
            url: API.editorial,
            isArray: true
        },
        getFemenineDivision: {
            method: 'GET',
            url: API.femenineDivision,
            isArray: true
        },
        getFutureGroup: {
            method: 'GET',
            url: API.futureGroup,
            isArray: true
        },
        getMasculineDivision: {
            method: 'GET',
            url: API.masculineDivision,
            isArray: true
        },
        getMessage: {
            method: 'GET',
            url: API.message,
            isArray: true
        },
        getMonthlyPhrase: {
            method: 'GET',
            url: API.monthlyPhrase,
            isArray: true
        },
        getOrientation: {
            method: 'GET',
            url: API.orientation,
            isArray: true
        },
        getReview: {
            method: 'GET',
            url: API.review,
            isArray: true
        },
        getSokaAdvance: {
            method: 'GET',
            url: API.sokaAdvance,
            isArray: true
        },
        getStudentGroup: {
            method: 'GET',
            url: API.studentGroup,
            isArray: true
        },
        getExperiences: {
            method: 'GET',
            url: API.experience,
            isArray: true
        }

    });
});
