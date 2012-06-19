icons = {}
glyphs = {}

sass_lines = File.open('../sass/font-awesome.sass').readlines
svg_lines = File.open('../font/fontawesome-webfont.svg').readlines

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

index = 0
while index < svg_lines.length
    line = svg_lines[index]
    d_index = line.index 'd="'
    if line.start_with? '<glyph unicode="&#x' and d_index != nil
        icon_code = line[19.. 22]
        start_index = d_index + 3
        icon_glyph = line[start_index .. line.length - 6]
        glyphs[icon_code] = icon_glyph
        #puts "#{icon_code}: '#{icon_glyph}'"
    end
    index += 1
end

write_svg = lambda { |requested_icon|
    requested_glyph = glyphs[icons[requested_icon]]
    if(requested_glyph == nil)
        puts "Unknown glyph: #{requested_icon}"
    else
        blank_svg_content = File.open('empty.svg').read
        output_svg = blank_svg_content.sub '###INSERTGLYPH###', requested_glyph
        File.open("output/#{requested_icon}.svg", 'w') {|out_svg| out_svg.write(output_svg) }
    end
}

for i in *.svg; do 
  NEWFILE=`echo $i | sed 's/.png$//'`
  inkscape $i --export-png=png/${NEWFILE}.png $i -w 16 -h 16; 
done

if ARGV.length > 0
    write_svg.call ARGV[0]
else
    viewer = File.open('output/index.html', 'w')
    viewer.write '<html><body>'
    icons.each_pair do |icon_name, icon_code|
         write_svg.call icon_name
         viewer.write "<p>#{icon_name}<br /><img src='#{icon_name}.svg' width='100' height='100'></p>"
    end
    viewer.write '</html></body>'
    viewer.close
end