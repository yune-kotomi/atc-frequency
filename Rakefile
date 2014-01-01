require 'opal'
task :compile do
  Dir::glob('www/opal/*.rb').map do |file|
    basename = File.basename(file)
    open("www/js/#{basename}.js", 'w') do |f|
      f.puts Opal.compile(open(file).read)
    end
  end
end

task :run_device do
  system "cordova run android"
end

task :build_apk do
  system "cordova build android"
end

task :run => [:compile, :run_device]
task :build => [:compile, :build_apk]
