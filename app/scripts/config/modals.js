'use strict';

angular.module('seikyo.index')

.service('Modal', function (ModalTemplate, $timeout, $q, $state) {
    var template = new ModalTemplate({
        containerUrl: 'views/modal-template.html'
    });

    this.confirm = template.inherit({
        templateUrl: 'views/modals/confirm.html'
    });

    this.input = template.inherit({
        templateUrl: 'views/modals/input.html'
    });

    this.cropImage = new ModalTemplate({
        templateUrl: 'views/modals/crop-image.html',
        controllerAs: 'ctrl',
        controller: /*@ngInject*/ function ($scope, $modal, $timeout) {
            var vm = this;

            this.img = '';

            $scope.cropImage = function(){
                var binary = atob(vm.img.split(',')[1]);

                var array = [];
                for (var i = 0; i < binary.length; i++) {
                    array.push(binary.charCodeAt(i));
                }

                var form = new FormData();
                form.append('photo',  new Blob([new Uint8Array(array)], { type: vm.img.type }), vm.img.name);

                $scope.upload({
                    file: form,
                    image: vm.img
                });

                $modal.dismiss();
            };
        }
    });
});
