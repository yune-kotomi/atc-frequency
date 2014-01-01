module Device
  def self.ready?(&block)
    %x{
      $(document).on('deviceready', function(){
        #{block.call}
      });
    }
  end
end

module Geolocation
  def self.current_position
    %x{
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
          #{yield(`data`)}
        }, 
        function(e){
          #{current_position_error(`e.message`)}
        }
      );
    }
  end
  
  def self.current_position_error(message)
    raise CantGetCurrentPositionError.new
  end
  
  def self.distance(position1, position2)
    a = 6378137.000
  	b = 6356752.314245
  	e2= 0.00669437999019758
    
    latitude1 = position1['latitude'] * Math::PI / 180
    latitude2 = position2['latitude'] * Math::PI / 180
    
    longitude1 = position1['longitude'] * Math::PI / 180
    longitude2 = position2['longitude'] * Math::PI / 180
    
    latitude_average = (latitude1 + latitude2) / 2
    latitude_diff = latitude1 - latitude2
    longitude_diff = longitude1 - longitude2
    
    w = Math::sqrt(1.0 - e2 * (Math::sin(latitude_average) ** 2))
    m = b / (w ** 3)
    n = a / w
    
    Math::sqrt((latitude_diff * m) ** 2 + (longitude_diff * n * Math::cos(latitude_average)) ** 2)
  end
  
  class CantGetCurrentPositionError<RuntimeError;end
end

def redraw_main_list(data)
  Element.find('#list').append(Element.find('#airdrome').template(data))
  Element.find('#list>li>a').each do |li|
    li.on('click') do
      template = Element.find('#detail-template')
      container = Element.find('#detail')
      container.empty
      target = DATA.find{|target| target['name'] == li['data-target']}
      container.append(template.template(target))
      Element.find('#main-page').hide
      container.show
      
      container.find('header>a').on('click') do
        Element.find('#main-page').show
        container.hide
      end
    end
  end
end

Device.ready? do
  begin
    Geolocation.current_position do |position|
      candicates = DATA.select do |target|
        Geolocation.distance(position, target)/1000 < 30
      end
      redraw_main_list(candicates)
    end
  rescue => e
    Element.find('#hoge').text += e.inspect
  end
end

Document.ready? do
  #redraw_main_list(DATA)
end
