import {Component} from 'angular2/core';
declare var $: any;

@Component({
    selector: 'PerformanceData',
    templateUrl: 'Templates/PerformanceData.html'
})
export class AppComponent {
	public currentRamNumber; 
	public netInData;
	public netOutData;
	public diskWriteData;
	public diskReaddData;
	public cpuData;
	public data;
	public memData;
	public ramGaugeData;
	public realtimeLine;
	public realtimeBar;
	public realtimeArea;
	public options;
	public ramGaugeoptions;
	
	public lineAxes = ['right', 'bottom'];
	public scatterAxes = ['left', 'right', 'top', 'bottom'];

	public epochBar;
	public epochArea;
	public epochLine;

	constructor() {
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
                    //default code block
                }
            });

			$scope.epochBar.update(epochBarData);
			$scope.epochArea.update(epochBarData);
			$scope.epochLine.update(epochBarData);
		});

        connection.start().done(function () {});		
	}

	generateLineData() {
		var data1 = [{ label: 'Layer 1', values: [] }];
		for (var i = 0; i <= 128; i++) {
			var x = 20 * (i / 128) - 10,
				y = Math.cos(x) * x;
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
	}

	generateLineData2() {
		var data1 = [{ label: 'Layer 1', values: [] }];
		for (var i = 0; i <= 128; i++) {
			var x = 20 * (i / 128) - 10,
				y = Math.cos(x) * x;
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
	}
}