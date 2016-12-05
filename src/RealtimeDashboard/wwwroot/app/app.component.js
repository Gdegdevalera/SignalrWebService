System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.lineAxes = ['right', 'bottom'];
                    this.scatterAxes = ['left', 'right', 'top', 'bottom'];
                    var connection = $.hubConnection('http://sitepointsignal.cloudapp.net/');
                    var proxy = connection.createHubProxy('performanceHub');
                    var $scope = this;
                    $scope.currentRamNumber = 0;
                    $scope.realtimeLine = this.generateLineData();
                    $scope.realtimeBar = this.generateLineData();
                    $scope.realtimeArea = this.generateLineData();
                    $scope.options = { thickness: 10, mode: 'gauge', total: 100 };
                    $scope.data = [
                        { label: 'CPU', value: 78, color: '#d62728', suffix: '%' }
                    ];
                    $scope.ramGaugeoptions = { thickness: 10, mode: 'gauge', total: 100 };
                    $scope.ramGaugeData = [
                        { label: 'RAM', value: 68, color: '#1f77b4', suffix: '%' }
                    ];
                    $scope.currentRamNumber = 68;
                    proxy.on('broadcastPerformance', function (data) {
                        var timestamp = ((new Date()).getTime() / 1000) | 0;
                        if (!$scope.epochBar) {
                            $scope.epochBar = $('#epochBar').epoch({
                                type: 'time.bar',
                                data: $scope.generateLineData(),
                                axes: ['bottom']
                            });
                            $scope.epochArea = $('#epochArea').epoch({
                                type: 'time.area',
                                data: $scope.generateLineData(),
                                axes: ['left', 'right', 'bottom']
                            });
                            $scope.epochLine = $('#epochLine').epoch({
                                type: 'time.line',
                                data: $scope.generateLineData(),
                                axes: ['left', 'right', 'bottom']
                            });
                        }
                        var epochBarData = $scope.epochBar.data;
                        data.forEach(function (dataItem) {
                            switch (dataItem.categoryName) {
                                case 'Processor':
                                    $scope.cpuData = dataItem.value;
                                    epochBarData[0].values.push({ time: timestamp, y: dataItem.value });
                                    $scope.data = [
                                        { label: 'CPU', value: dataItem.value, color: '#d62728', suffix: '%' }
                                    ];
                                    break;
                                case 'Memory':
                                    $scope.memData = dataItem.value;
                                    epochBarData[1].values.push({ time: timestamp, y: dataItem.value });
                                    $scope.ramGaugeData = [
                                        { label: 'RAM', value: dataItem.value, color: '#1f77b4', suffix: '%' }
                                    ];
                                    $scope.currentRamNumber = dataItem.value;
                                    break;
                                case 'Network In':
                                    $scope.netInData = dataItem.value.toFixed(2);
                                    break;
                                case 'Network Out':
                                    $scope.netOutData = dataItem.value.toFixed(2);
                                    epochBarData[2].values.push({ time: timestamp, y: dataItem.value });
                                    break;
                                case 'Disk Read Bytes/Sec':
                                    $scope.diskReaddData = dataItem.value.toFixed(3);
                                    break;
                                case 'Disk Write Bytes/Sec':
                                    $scope.diskWriteData = dataItem.value.toFixed(3);
                                    break;
                                default:
                                    break;
                            }
                        });
                        $scope.epochBar.update(epochBarData);
                        $scope.epochArea.update(epochBarData);
                        $scope.epochLine.update(epochBarData);
                    });
                    connection.start().done(function () { });
                }
                AppComponent.prototype.generateLineData = function () {
                    var data1 = [{ label: 'Layer 1', values: [] }];
                    for (var i = 0; i <= 128; i++) {
                        var x = 20 * (i / 128) - 10, y = Math.cos(x) * x;
                        data1[0].values.push({ x: x, y: y });
                    }
                    var data2 = [
                        { label: 'Layer 1', values: [] },
                        { label: 'Layer 2', values: [] },
                        { label: 'Layer 3', values: [] }
                    ];
                    for (var i = 0; i < 256; i++) {
                        var x = 40 * (i / 256) - 20;
                        data2[0].values.push({ x: x, y: Math.sin(x) * (x / 4) });
                        data2[1].values.push({ x: x, y: Math.cos(x) * (x / Math.PI) });
                        data2[2].values.push({ x: x, y: Math.sin(x) * (x / 2) });
                    }
                    return data2;
                };
                AppComponent.prototype.generateLineData2 = function () {
                    var data1 = [{ label: 'Layer 1', values: [] }];
                    for (var i = 0; i <= 128; i++) {
                        var x = 20 * (i / 128) - 10, y = Math.cos(x) * x;
                        data1[0].values.push({ x: x, y: y });
                    }
                    var data2 = [
                        { label: 'Layer 1', values: [] },
                        { label: 'Layer 2', values: [] },
                        { label: 'Layer 3', values: [] }
                    ];
                    for (var i = 0; i < 256; i++) {
                        var x = 40 * (i / 256) - 20;
                        data2[0].values.push({ x: x, y: Math.cos(x) * (x / 4) });
                        data2[1].values.push({ x: x, y: Math.sin(x) * (x / Math.PI) });
                        data2[2].values.push({ x: x, y: Math.cos(x) * (x / 2) });
                    }
                    return data2;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'PerformanceData',
                        templateUrl: 'Templates/PerformanceData.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map