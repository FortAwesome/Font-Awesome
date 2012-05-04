icons = {}

sass_file = File.open('../sass/font-awesome.sass')
lines = sass_file.readlines

index = 0
while(index < lines.length)
    line = lines[index]
    if line.start_with? '.icon'
        colon_index = line.index ':'
        icon_name = line[1 .. colon_index - 1]
        index += 1
        line = lines[index]
        icon_code = line[13 .. 16]
        puts "#{icon_name}: #{icon_code}"
    end
    index += 1
end