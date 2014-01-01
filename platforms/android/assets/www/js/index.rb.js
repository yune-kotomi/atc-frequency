/* Generated by Opal 0.5.5 */
(function($opal) {
  var $a, $b, TMP_7, $c, TMP_10, self = $opal.top, $scope = $opal, nil = $opal.nil, $breaker = $opal.breaker, $slice = $opal.slice, $module = $opal.module, $klass = $opal.klass;
  $opal.add_stubs(['$call', '$current_position_error', '$raise', '$new', '$/', '$*', '$[]', '$+', '$-', '$sqrt', '$**', '$sin', '$cos', '$append', '$find', '$template', '$each', '$on', '$empty', '$==', '$hide', '$show', '$ready?', '$current_position', '$select', '$<', '$distance', '$redraw_main_list', '$text=', '$text', '$inspect']);
  (function($base) {
    var self = $module($base, 'Device');

    var def = self._proto, $scope = self._scope, TMP_1;
    $opal.defs(self, '$ready?', TMP_1 = function() {
      var self = this, $iter = TMP_1._p, block = $iter || nil;
      TMP_1._p = null;
      
      $(document).on('deviceready', function(){
        block.$call()
      });
    ;
    })
    
  })(self);
  (function($base) {
    var self = $module($base, 'Geolocation');

    var def = self._proto, $scope = self._scope, TMP_2;
    $opal.defs(self, '$current_position', TMP_2 = function() {
      var $a, self = this, $iter = TMP_2._p, $yield = $iter || nil;
      TMP_2._p = null;
      
      navigator.geolocation.getCurrentPosition(
        function(position){
          var data = Opal.hash(
            'latitude', position.coords.latitude,
            'longitude', position.coords.longitude,
            'altitude', position.coords.altitude,
            'accuracy', position.coords.accuracy,
            'altitude_accuracy', position.coords.altitudeAccuracy,
            'heading', position.coords.heading,
            'speed', position.coords.speed
          );
          ((($a = $opal.$yield1($yield, data)) === $breaker) ? $breaker.$v : $a)
        }, 
        function(e){
          self.$current_position_error(e.message)
        }
      );
    ;
    });

    $opal.defs(self, '$current_position_error', function(message) {
      var self = this;
      return self.$raise($scope.CantGetCurrentPositionError.$new());
    });

    $opal.defs(self, '$distance', function(position1, position2) {
      var self = this, a = nil, b = nil, e2 = nil, latitude1 = nil, latitude2 = nil, longitude1 = nil, longitude2 = nil, latitude_average = nil, latitude_diff = nil, longitude_diff = nil, w = nil, m = nil, n = nil;
      a = 6378137.0;
      b = 6356752.314245;
      e2 = 0.00669437999019758;
      latitude1 = position1['$[]']("latitude")['$*'](($scope.Math)._scope.PI)['$/'](180);
      latitude2 = position2['$[]']("latitude")['$*'](($scope.Math)._scope.PI)['$/'](180);
      longitude1 = position1['$[]']("longitude")['$*'](($scope.Math)._scope.PI)['$/'](180);
      longitude2 = position2['$[]']("longitude")['$*'](($scope.Math)._scope.PI)['$/'](180);
      latitude_average = (latitude1['$+'](latitude2))['$/'](2);
      latitude_diff = latitude1['$-'](latitude2);
      longitude_diff = longitude1['$-'](longitude2);
      w = $scope.Math.$sqrt((1.0)['$-'](e2['$*'](($scope.Math.$sin(latitude_average)['$**'](2)))));
      m = b['$/'](w['$**'](3));
      n = a['$/'](w);
      return $scope.Math.$sqrt((latitude_diff['$*'](m))['$**'](2)['$+']((longitude_diff['$*'](n)['$*']($scope.Math.$cos(latitude_average)))['$**'](2)));
    });

    (function($base, $super) {
      function $CantGetCurrentPositionError(){};
      var self = $CantGetCurrentPositionError = $klass($base, $super, 'CantGetCurrentPositionError', $CantGetCurrentPositionError);

      var def = $CantGetCurrentPositionError._proto, $scope = $CantGetCurrentPositionError._scope;
      return nil;
    })(self, $scope.RuntimeError);
    
  })(self);
  $opal.Object._proto.$redraw_main_list = function(data) {
    var $a, $b, TMP_3, self = this;
    $scope.Element.$find("#list").$append($scope.Element.$find("#airdrome").$template(data));
    return ($a = ($b = $scope.Element.$find("#list>li>a")).$each, $a._p = (TMP_3 = function(li){var self = TMP_3._s || this, $a, $b, TMP_4;if (li == null) li = nil;
    return ($a = ($b = li).$on, $a._p = (TMP_4 = function(){var self = TMP_4._s || this, $a, $b, TMP_5, $c, TMP_6, template = nil, container = nil, target = nil;
      template = $scope.Element.$find("#detail-template");
        container = $scope.Element.$find("#detail");
        container.$empty();
        target = ($a = ($b = $scope.DATA).$find, $a._p = (TMP_5 = function(target){var self = TMP_5._s || this;if (target == null) target = nil;
        return target['$[]']("name")['$=='](li['$[]']("data-target"))}, TMP_5._s = self, TMP_5), $a).call($b);
        container.$append(template.$template(target));
        $scope.Element.$find("#main-page").$hide();
        container.$show();
        return ($a = ($c = container.$find("header>a")).$on, $a._p = (TMP_6 = function(){var self = TMP_6._s || this;
        $scope.Element.$find("#main-page").$show();
          return container.$hide();}, TMP_6._s = self, TMP_6), $a).call($c, "click");}, TMP_4._s = self, TMP_4), $a).call($b, "click")}, TMP_3._s = self, TMP_3), $a).call($b);
  };
  ($a = ($b = $scope.Device)['$ready?'], $a._p = (TMP_7 = function(){var self = TMP_7._s || this, $a, $b, TMP_8, e = nil;
  try {
    return ($a = ($b = $scope.Geolocation).$current_position, $a._p = (TMP_8 = function(position){var self = TMP_8._s || this, $a, $b, TMP_9, candicates = nil;if (position == null) position = nil;
      candicates = ($a = ($b = $scope.DATA).$select, $a._p = (TMP_9 = function(target){var self = TMP_9._s || this;if (target == null) target = nil;
        return $scope.Geolocation.$distance(position, target)['$/'](1000)['$<'](30)}, TMP_9._s = self, TMP_9), $a).call($b);
        return self.$redraw_main_list(candicates);}, TMP_8._s = self, TMP_8), $a).call($b)
    } catch ($err) {if (true) {e = $err;
      return ($a = $scope.Element.$find("#hoge"), $a['$text=']($a.$text()['$+'](e.$inspect())))
      }else { throw $err; }
    }}, TMP_7._s = self, TMP_7), $a).call($b);
  return ($a = ($c = $scope.Document)['$ready?'], $a._p = (TMP_10 = function(){var self = TMP_10._s || this;
  return nil}, TMP_10._s = self, TMP_10), $a).call($c);
})(Opal);
