'use strict';

angular.module('seikyo.index')

.service('API', function (BackendUrl) {

    var toUrl = this.toUrl = function (url) {
        return BackendUrl + url;
    };

    this.seikyos = toUrl('api/seikyos/:year/');
    this.seikyo = toUrl('api/seikyos/seikyo/:seikyo');
    this.division = toUrl('api/seikyos/get/division');
    this.advertising = toUrl('api/seikyos/advertisings');
    this.article = toUrl('api/seikyos/articles');
    this.basicTerm = toUrl('api/seikyos/basicTerms');
    this.editorial = toUrl('api/seikyos/editorials');
    this.experience = toUrl('api/seikyos/experiences');
    this.femenineDivision = toUrl('api/seikyos/femenineDivisions');
    this.futureGroup = toUrl('api/seikyos/futureGroups');
    this.masculineDivision = toUrl('api/seikyos/masculineDivisions');
    this.message = toUrl('api/seikyos/messages');
    this.monthlyPhrase = toUrl('api/seikyos/monthlyPhrases');
    this.orientation = toUrl('api/seikyos/orientations');
    this.review = toUrl('api/seikyos/reviews');
    this.sokaAdvance = toUrl('api/seikyos/sokaAdvances');
    this.studentGroup = toUrl('api/seikyos/studentGroups');


});
