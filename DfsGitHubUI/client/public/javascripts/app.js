angular.module('nodeInvoice', [])

//INFO: as soon as mainController is initialized, then invoices and invoicesMetaData is called.
.controller('mainController', function($scope, $http) {

    $scope.formData = {};
    $scope.invoiceData = {};

    // Get all invoices
    $http.get('/api/v1/invoices')
        .success(function(data) {
            $scope.invoiceData = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });

    // Create a new invoice
    $scope.createInvoice = function(invoiceID) {
        $http.post('/api/v1/invoices', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.invoiceData = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };

    // Delete a invoice
    $scope.deleteInvoice = function(invoiceID) {
        $http.delete('/api/v1/invoices/' + invoiceID)
            .success(function(data) {
                $scope.invoiceData = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    // Get  invoices metadata
    //TODO: how is this getting called ?
    $scope.getInvoicesMetaData = function() {
    $http.get('/api/v1/invoicesMetaData')
        .success(function(data) {
            $scope.invoiceData = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
    };
});




