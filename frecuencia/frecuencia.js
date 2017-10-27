'use strict';
angular.module('app')
.controller('frecuencia',function ($scope,$rootScope) {
	var self = $scope;
	self.cuentas = [];
	self.ejecutado = false;
	self.lista_frecuencia = [];
	this.$onInit = function () {
		if($rootScope.lista_frecuencia != null){
			self.lista_frecuencia = $rootScope.lista_frecuencia;
			self.ejecutar();
		};
	};
	

	self.ejecutar = function () {
		ResolverTabla();
		CalcularTotales();
		/**
		 * Promedio
		 */
		CalcularPromedio();
		self.ejecutado = true;
	};


	function ResolverTabla() {
		/**
		 * Calcular Clases
		 */
		let valor_hallado = 1 + (3.32*Math.log10(self.lista_frecuencia.length));
		if($rootScope.redondear){
			self.numero_clases = parseInt(Math.round(valor_hallado));	
		}else{
			self.numero_clases = parseInt(valor_hallado);
		}
		
		/**
		 * Calcular Frecuencia Esperada
		 */
		self.frecuencia_esperada = (self.lista_frecuencia.length/self.numero_clases).toFixed(4);
		self.cuentas = [];
		let tramo = (1/self.numero_clases).toFixed(4);
		for (var i = 1; i <= self.numero_clases; i++) {
			let inicio = ( (i-1)*tramo ).toFixed(4);
			let fin = ( (i==self.numero_clases)?1:((i)*tramo) ).toFixed(4);
			let intervalo = inicio+' <= r <'+fin;
			let fo = ContarFo(inicio,fin);
			let cuadrado = CalculaCuadrado(fo,self.frecuencia_esperada);
			let cuenta = {
				clase: i,
				intervalo: intervalo,
				fo: fo,
				fe: self.frecuencia_esperada,
				cuadrado: cuadrado,
			};
			self.cuentas.push(cuenta);
		};
	};

	function ContarFo(inicio,fin) {
		let cuenta = 0;
		angular.forEach(self.lista_frecuencia,function(value) {
			if(value.ri >= inicio && value.ri < fin){
				cuenta++;
			}
		});
		return cuenta;
	};
	function CalculaCuadrado(fo,fe) {
		return Math.pow((fo-fe),2).toFixed(4);	
	};
	function CalcularTotales(){
		let totalFo = 0;
		let totalCuadrado = 0;
		angular.forEach(self.cuentas,function(value){
			totalFo = totalFo + value.fo;
			totalCuadrado = parseFloat(totalCuadrado) + parseFloat(value.cuadrado);
		});	
		self.totalFo = totalFo;
		self.totalCuadrado = totalCuadrado;
		/**
		 * Valor calculado
		 */
		self.valor_calculado = (self.totalCuadrado/self.frecuencia_esperada).toFixed(4);
	};
	function CalcularPromedio() {
		let promedio_aritmetico = 0;
		angular.forEach(self.lista_frecuencia,function (value) {
			promedio_aritmetico += parseFloat(value.ri);
		});
		self.promedio_aritmetico = (promedio_aritmetico/self.lista_frecuencia.length).toFixed(4);
		CalcularEstadisticoPromedio();
	};
	function CalcularEstadisticoPromedio() {
		let num = self.promedio_aritmetico - 0.5;
		let dem = Math.sqrt(1/(12*self.lista_frecuencia.length)).toFixed(4);
		self.valor_estadistico_promedios = (num/dem).toFixed(4);
	};

	self.nuevo = function () {
		let nuevo = {
			n: (self.lista_frecuencia.length + 1),
			ri: self.nuevo_numero
		};
		self.lista_frecuencia.push(nuevo);
		self.nuevo_numero = 0;
	};
	self.remove = function (item) {
		if(self.lista_frecuencia.length == 1){
			self.clear();
		}else{
			angular.forEach(self.lista_frecuencia,function(valor,index) {
				if(item.n == valor.n){
					self.lista_frecuencia.splice(index,1);
				}
			});
			let array_copy = [];	
			angular.forEach(self.lista_frecuencia,function(valor,index) {
				valor.n = index + 1;
				array_copy.push(valor);
			});
			self.lista_frecuencia = angular.copy(array_copy);
		}
		self.ejecutado = false;
	};
	self.clear = function () {
		self.lista_frecuencia = [];
		self.cuentas = [];
		self.ejecutado = false;	
	};
});