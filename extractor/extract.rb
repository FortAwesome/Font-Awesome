icons = {}
glyphs = {}

sass_file = File.open('../sass/font-awesome.sass')
sass_lines = sass_file.readlines
sass_file.close

svg_file = File.open('../font/fontawesome-webfont.svg')
svg_lines = svg_file.readlines
svg_file.close

index = 0
while index < sass_lines.length
    line = sass_lines[index]
    if line.start_with? '.icon'
        colon_index = line.index ':'
        icon_name = line[1 .. colon_index - 1]
        index += 1
        line = sass_lines[index]
        icon_code = line[13 .. 16]
        icons[icon_name] = icon_code
        #puts "#{icon_name}: #{icon_code}"
    end
    index += 1
end
puts icons.length

index = 0
while index < svg_lines.length
    line = svg_lines[index]
    d_index = line.index 'd="'
    if line.start_with? '<glyph unicode="&#x' and d_index != nil
        icon_code = line[19.. 22]
        start_index = d_index + 3
        icon_glyph = line[start_index .. line.length - 4]
        glyphs[icon_code] = icon_glyph
        puts "#{icon_code}: "
    end
    index += 1
end

icons.each_pair do |icon_name, icon_code|
    puts "#{icon_name}: #{glyphs[icon_code]}"
end