'use strict';
angular.module('app')
.controller('congruencial_multiplicativo',function ($scope) {
	var self = $scope;
	self.calculos = [];
	self.periodo = 0;
	self.calcular = function () {
		self.calculos = [];
		let flag = true;
		let n=0,xn,axn,xnMAS1 = self.object.x0,ri;
		while(flag){
			xn = xnMAS1;
			axn = self.object.a * xn;
			xnMAS1 = axn % self.object.m;
			if(n == 0){
				ri = null;
			}else{
				ri = (xn/self.object.m).toFixed(3);
			}
			let nuevo = {
				n: n,
				xn: xn,
				axn: axn,
				xnMAS1: xnMAS1,
				ri: ri
			};
			flag = Validar(ri);
			self.calculos.push(nuevo);
			n++;
		};
	};
	function Validar(numero) {
		let flag = true;
		if(self.calculos.length > 0){
			angular.forEach(self.calculos,function (value,key) {
				if(value.ri == numero){
					self.calculos[key].flag = true;
					self.periodo = parseInt(self.calculos.length + 1 - key);
					flag = false;
				}
			});
		}
		return flag;
	};
});