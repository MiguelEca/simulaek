'use strict';
angular.module('app')
.controller('congruencial_mixto',function ($scope,$rootScope) {
	var self = $scope;
	self.calculos = [];
	self.periodo = 0;
	self.precision = 3;
	self.calcular = function () {
		self.calculos = [];
		let flag = true;
		let n=0,xn,axnMASc,xnMAS1 = self.object.x0,ri;
		while(flag){
			xn = xnMAS1;
			axnMASc = self.object.a * xn + self.object.c;
			xnMAS1 = axnMASc % self.object.m;
			if(n == 0){
				ri = null;
			}else{
				ri = (xn/self.object.m).toFixed(self.precision);
			}
			let nuevo = {
				n: n,
				xn: xn,
				axnMASc: axnMASc,
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
					self.periodo = parseInt(self.calculos.length - key);
					flag = false;
					self.cantidad_muestra = self.calculos.length;
				}
			});
		}
		return flag;
	};
	self.redondear = true;
	self.frecuencia = function () {
		$rootScope.redondear = self.redondear;
		$rootScope.lista_frecuencia = [];
		for (var i = 1; i <= self.cantidad_muestra; i++) {
			let item = {n: i,ri: self.calculos[i].ri};
			$rootScope.lista_frecuencia.push(item);
		}
		self.change(2);//Frecuencia
	};
});








